<template>
  <div id="settings-wrapper">
    <v-card id="settings"
            class="py-2 px-4"
            color="rgba(0, 0, 0, .3)"
            dark
            flat
            link
            min-width="100"
            style="position: fixed; top: 115px; right: -35px; border-radius: 8px;">
      <v-icon large>mdi-filter</v-icon>
    </v-card>

    <v-menu v-model="menu"
            :close-on-content-click="false"
            activator="#settings"
            bottom
            content-class="v-settings"
            left
            nudge-left="8"
            offset-x
            origin="top right"
            transition="scale-transition">
      <v-card class="text-center mb-0"
              width="600">
        <v-card-text>
<!--          <strong class="d-inline-block">ФИЛЬТРЫ</strong>-->

<!--          <v-menu v-model="from_menu"-->
<!--                  :close-on-content-click="false"-->
<!--                  :nudge-right="40"-->
<!--                  transition="scale-transition"-->
<!--                  offset-y-->
<!--                  min-width="290px">-->
<!--            <template v-slot:activator="{ on }">-->
<!--              <v-text-field v-model="filter.filter_set.from"-->
<!--                            label="From date"-->
<!--                            prepend-icon="mdi-calendar"-->
<!--                            readonly-->
<!--                            v-on="on"></v-text-field>-->
<!--            </template>-->
<!--            <v-date-picker v-model="filter.filter_set.from" @input="from_menu = false"></v-date-picker>-->
<!--          </v-menu>-->

<!--          <v-menu v-model="to_menu"-->
<!--                  :close-on-content-click="false"-->
<!--                  :nudge-right="40"-->
<!--                  transition="scale-transition"-->
<!--                  offset-y-->
<!--                  min-width="290px">-->
<!--            <template v-slot:activator="{ on }">-->
<!--              <v-text-field v-model="filter.filter_set.to"-->
<!--                            label="To date"-->
<!--                            prepend-icon="mdi-calendar"-->
<!--                            readonly-->
<!--                            v-on="on"></v-text-field>-->
<!--            </template>-->
<!--            <v-date-picker v-model="filter.filter_set.to" @input="to_menu = false"></v-date-picker>-->
<!--          </v-menu>-->

<!--          <v-divider class="mb-3"/>-->

          <filter-set :filter="filter"></filter-set>

          <div class="mt-3 text-xs-center body-2 text-uppercase">
            <v-btn color="secondary"
                   medium
                   rounded
                   :disabled="reportsloading"
                   @click="commitFilters()">Применить</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import FilterSet from './FilterSet.vue'
import {axiosInstance as axios} from "../../../../plugins/axios"

export default {
  components: {
    FilterSet
  },
  data: () => ({
    menu: false,
    from_menu: false,
    to_menu: false,

    filter: {
      value_view: 'sums',
      filter_sets: [
        // {
        //   name: 'По умолчанию',
        //   from: new Date(),
        //   to: new Date(),
        //   period_category: 'last_week',
        //   city: null,
        //   referrer: null,
        //   gender: null
        // },
        {
          name: 'Новый',
          from: '',
          to: '',
          period_category: null,
          region_id: null,
          referrer: null,
          gender: null
        }
      ],
      // choosen_filter_set: 'default',
      filter_set: {
        name: 'Произвольный',
        from: new Date('2019-03-01').toISOString().substr(0, 10),
        to: new Date('2019-03-30').toISOString().substr(0, 10),
        region_id: null,
        referrer: null,
        gender: null,
        age_category: null,
        insurance_class: null,
        client_status: null,
        vehicle_year_category: null,
        vehicle_brand: null,
        vehicle_model: null,
        sale_center: null,
        sale_channel: null,
        department: null
      },
      filter_set_template: {
        name: '',
        from: new Date(),
        to: new Date(),
        period_category: 'last_week',
        region_id: null,
        referrer: null,
        gender: null,
        age_category: null,
        insurance_class: null,
        client_status: null
      },
      regions: [],
      age_categories: ['все', '20-25', '26-34', '35-44', '45-54', '55-64', 'младше 20', 'старше 64'],
      client_statuses: [
        {
          text: 'Новый',
          value: 'new'
        },
        {
          text: 'Действующий',
          value: 'active'
        },
        {
          text: 'Вернувшийся',
          value: 'returned'
        }
      ],
      kbms: ['все', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'ИП', 'М'],
      gifts: [],
      agents: [],
      referrers: [],
      departments: [],
      sale_centers: [],
      sale_channels: [],
      vehicle_brands: [],
      vehicle_models: [],
      vehicle_year_categories: []
    },

    generalReport: {
      count: 0,
      ogpo_vts_result: 0,
      vts_cross_result: 0,
      vts_overall_sum: 0,
      payout_sum: 0,
      avg_sum: 0,
      avg_cross_result: 0,
      overall_lost_count: 0,
      vts_lost_count: 0
    },

    reportsloading: true,

    ageCategoryReport: {
      views: ['table', 'bar_chart', 'pie'],
      view: 'table',
      loading: false,
      data: {
        labels: [],
        sums: [],
        avgs: [],
        counts: []
      },
      options: {
        sums: {
          axisX: {
            showGrid: false
          },
          low: 1000,
          high: 100000000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          },
          divisor: 10
        },
        avgs: {
          axisX: {
            showGrid: false
          },
          low: 1000,
          high: 100000000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          },
          divisor: 10
        },
        counts: {
          axisX: {
            showGrid: false
          },
          low: 10,
          high: 10000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        pie: {
          labelInterpolationFnc: (value) => `${value}%`
        }
      },
      responsiveOptions: [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0]
            }
          }
        }]
      ]
    },

    regionsReport: {
      views: ['table', 'chart'],
      view: 'table',
      loading: false,
      data: {
        labels: [],
        sums: [],
        avgs: [],
        counts: []
      },
      options: {
        sums: {
          axisX: {
            showGrid: false
          },
          low: 1000,
          high: 100000000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          },
          divisor: 10
        },
        avgs: {
          axisX: {
            showGrid: false
          },
          low: 1000,
          high: 100000000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          },
          divisor: 10
        },
        counts: {
          axisX: {
            showGrid: false
          },
          low: 10,
          high: 10000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0
          }
        },
        pie: {
          labelInterpolationFnc: (value) => `${value}%`
        }
      }
    },

  }),

  computed: {
  },
  methods: {
    commitFilters () {
      this.getGeneralReport(this.filter.filter_set)
      this.getAgeChartData(this.filter.filter_set)
      this.getRegionsReportData(this.filter.filter_set)
    },

    setLoading(value) {
      this.reportsloading = value;
    },

    getGeneralReport(data) {
      this.setLoading(true);
       axios.post('/get_general_report', data).then((response) => {
        this.setGeneralReport(response.data.general_report);
        this.setLoading(false);
      }).catch(() => {
        this.setLoading(false);
      })
    },
    setGeneralReport(response) {
      this.generalReport = response;
    },

    getAgeChartData(data) {
      axios.post('/get_age_chart_data', data).then((response) => {
        this.setAgeChartData(response.data);
      })
    },
    setAgeChartData(response) {
      this.ageCategoryReport.data = response;
    },

    getRegionsReportData(data) {
      axios.post('/get_regions_report_data', data).then((response) => {
        this.setRegionsReportData(response.data);
      })
    },
    setRegionsReportData(response) {
      this.regionsReport.data = response;
    },

    getRegions() {
      axios.get('/get_regions').then((response) => {
        this.setRegions(response.data);
      });
    },
    setRegions(response) {
      this.filter.regions = response;
    },

    getVehicleFilters() {
      axios.get('/get_vehicle_filters').then((response) => {
        this.setVehicleYearCategories(response.data.year_categories);
        this.setVehicleBrands(response.data.brands);
        this.setVehicleModels(response.data.models);
      })
    },
    setVehicleYearCategories(response) {
      this.filter.vehicle_year_categories = response;
    },
    setVehicleBrands(response) {
      this.filter.vehicle_brands = response;
    },
    setVehicleModels(response) {
      this.filter.vehicle_models = response;
    },

    getSellerFilters() {
      axios.get('/get_seller_filters').then((response) => {
        this.setAgents(response.data.agents);
        this.setReferrers(response.data.referrers);
        this.setDepartments(response.data.departments);
        this.setSaleChannels(response.data.sale_channels);
        this.setSaleCenters(response.data.sale_centers);
      });
    },
    setAgents(response) {
      this.filter.agents = response;
    },
    setReferrers(response) {
      this.filter.referrers = response;
    },
    setDepartments(response) {
      this.filter.departments = response;
    },
    setSaleChannels(response) {
      this.filter.sale_channels = response;
    },
    setSaleCenters(response) {
      this.filter.sale_centers = response;
    },
  },
  created() {
      this.getRegions();
      this.getVehicleFilters();
      this.getSellerFilters();
      this.commitFilters();
  }
}
</script>

<style lang="sass">
  .v-settings
    .v-item-group > *
      cursor: pointer

    &__item
      border-width: 3px
      border-style: solid
      border-color: transparent !important

      &--active
        border-color: #00cae3 !important
</style>
