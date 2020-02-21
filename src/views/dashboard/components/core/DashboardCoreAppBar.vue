<template>
<!--  <v-app-bar color="transparent"-->
<!--             flat-->
<!--             height="70"-->
<!--             style="width: auto;">-->
<!--    <v-toolbar-title class="hidden-sm-and-down" v-text="'Витрина данных'" />-->
<!--    <v-spacer />-->
<!--  </v-app-bar>-->
</template>

<script>
  export default {
    name: 'DashboardCoreAppBar',

    methods: {
      logout() {
        this.$store.dispatch('auth/logout').then((response) => {
          if(response) this.$router.push({ name: 'Login' });
        });
      }
    }
  }
</script>
