<template>
  <v-app>
    <dashboard-core-app-bar v-model="expandOnHover" />

    <dashboard-core-drawer :expand-on-hover.sync="expandOnHover" />

    <dashboard-core-view />

    <dashboard-core-filter v-model="expandOnHover" />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',
    beforeCreate () {
        if (!this.$store.getters['auth/authorized']) {
            this.$router.push({ name: 'Login' })
        }
    },
    components: {
      DashboardCoreAppBar: () => import('./components/core/DashboardCoreAppBar'),
      DashboardCoreDrawer: () => import('./components/core/DashboardCoreDrawer'),
      DashboardCoreFilter: () => import('./components/core/DashboardCoreFilter'),
      DashboardCoreView: () => import('./components/core/DashboardCoreView')
    },
    data: () => ({
      expandOnHover: false
    }),
    computed: {
      // ...mapState('report', ['reportsloading'])
    }
  }
</script>
