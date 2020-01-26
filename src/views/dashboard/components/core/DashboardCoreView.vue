<template>
  <v-content>
    <dashboard-core-drawer :filters="filters"></dashboard-core-drawer>
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
      filters: {
        from_date: new Date('2019-01-01').toISOString().substr(0, 10),
        to_date: new Date('2019-01-30').toISOString().substr(0, 10),
      },
    }),
  }
</script>
