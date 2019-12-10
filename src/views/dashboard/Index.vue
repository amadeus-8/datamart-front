<template>
  <v-app>
    <dashboard-core-app-bar v-model="expandOnHover" />

    <dashboard-core-drawer :expand-on-hover.sync="expandOnHover" />

    <dashboard-core-view />

    <dashboard-core-filter v-model="expandOnHover" />
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'DashboardIndex',
    beforeCreate () {
        if (!this.$store.getters['auth/authorized']) {
            this.$router.push({ name: 'Login' })
        }
    },
    components: {
      DashboardCoreAppBar: () => import('./components/core/AppBar'),
      DashboardCoreDrawer: () => import('./components/core/Drawer'),
      DashboardCoreFilter: () => import('./components/core/Filter'),
      DashboardCoreView: () => import('./components/core/View')
    },
    data: () => ({
      expandOnHover: false
    }),
    computed: {
      ...mapState('report', ['reportsloading'])
    }
  }
</script>
