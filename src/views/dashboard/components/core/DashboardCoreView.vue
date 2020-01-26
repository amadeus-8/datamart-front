<template>
  <v-content>
    <dashboard-core-drawer></dashboard-core-drawer>
    <summary-tables></summary-tables>
  </v-content>
</template>

<script>

  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreDrawer: () => import('./DashboardCoreDrawer'),
      SummaryTables: () =>  import('../../tables/SummaryTables'),
    },

    data: () => ({

    }),
  }
</script>
