<template>
  <v-content>
    <dashboard-core-drawer :filters="filters" :values="values"></dashboard-core-drawer>
    <summary-tables :filters="filters" :values="values"></summary-tables>
    <div class="text-center">
      <v-overlay :z-index="10000" v-show="values.isLoading">
        <v-progress-circular indeterminate size="80"></v-progress-circular>
      </v-overlay>
    </div>
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
        vehicle_type: null,
        referrer_id: null,
        department_id: null,
        sale_center_id: null,
        sale_channel_id: null,
        vehicle_model: null,
        vehicle_brand: null,
        status_id: null,
        columns: null,
        rows: null,
        values: 'vts_overall_sum',
      },

      values: {
        type: null,
        view: null,
        chart: [],
        isLoading: false,
      }
    }),
  }
</script>
