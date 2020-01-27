<template>
  <v-app-bar color="transparent"
             flat
             height="70"
             style="width: auto;">
    <v-toolbar-title class="hidden-sm-and-down" v-text="'Витрина данных'" />

    <v-list color="transparent" class="ml-3 mt-3">
      <v-select :items="[{text: 'Не выбрано', value: null}].concat(views)"
                label="Вид"
                item-text="text"
                item-value="value"
                solo
                v-model="values.view"></v-select>
    </v-list>

    <v-spacer />

    <v-radio-group v-model="values.type" row class="pt-4">
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
      values: Object,
    },

    data: () => ({
      views: [
        {
          text: "Сводная таблица",
          value: "pivot"
        },
        {
          text: "Сравнительная таблица",
          value: "comparative"
        },
      ],
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
