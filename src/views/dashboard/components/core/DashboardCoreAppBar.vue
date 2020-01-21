<template>
  <v-app-bar absolute
             app
             color="transparent"
             flat
             height="75"
             style="width: auto;">
    <v-btn fab
           small
           @click="$vuetify.breakpoint.smAndDown ? true : $emit('input', !value)">
      <v-icon v-if="value">mdi-view-quilt</v-icon>
      <v-icon v-else>mdi-dots-vertical</v-icon>
    </v-btn>

    <v-toolbar-title class="hidden-sm-and-down" v-text="'Витрина данных'" />

    <v-spacer />

    <v-radio-group v-model="value_view" row class="pt-4">
      <v-radio label="Сумма" value="sums"></v-radio>
      <v-radio label="Среднее" value="avgs"></v-radio>
      <v-radio label="Количество" value="counts"></v-radio>
    </v-radio-group>

  </v-app-bar>
</template>

<script>
  export default {
    name: 'DashboardCoreAppBar',

    props: {
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      value_view: null,
    }),

    methods: {
      logout() {
        this.$store.dispatch('auth/logout').then((response) => {
          if(response) this.$router.push({ name: 'Login' });
        });
      }
    }
  }
</script>
