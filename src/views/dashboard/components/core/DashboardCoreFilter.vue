<template>
  <div id="settings-wrapper">
    <v-card id="settings"
            class="py-2 px-4"
            color="rgba(0, 0, 0, .3)"
            dark
            flat
            link
            min-width="100"
            style="position: fixed; top: 170px; right: -35px; border-radius: 8px;">
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
          <filter-set :filters="filters" :values="values"></filter-set>

          <div class="mt-3 text-xs-center body-2 text-uppercase">
            <v-btn color="secondary"
                   medium
                   rounded
                   @click="sendFilters">Применить</v-btn>
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

  props: {
    filters: Object,
    values: Object,
    sendFilters: Function,
  },

  data: () => ({
    menu: false,

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
