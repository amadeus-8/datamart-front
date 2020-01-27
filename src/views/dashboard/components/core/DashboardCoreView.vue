<template>
  <v-content>
    <dashboard-core-drawer :filters="filters"></dashboard-core-drawer>
    <summary-tables :filters="filters"></summary-tables>
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
        region_id: null,
        age_category: null,
        gender: null,
        insurance_class: null,
        vehicle_year_category: null,
        referrer: null,
        department: null,
        sale_center: null,
        sale_channel: null,
        vehicle_model: null,
        vehicle_brand: null,
        client_status: null,
        filter_1: null,
        filter_2: null,
      },
    }),
  }
</script>
