<template>
  <div>
    <div class="text-center py-2" v-show="regionsReport.loading">
      Загрузка...
    </div>
    <div v-show="!regionsReport.loading">
      <v-simple-table
        class="ml-2"
        v-if="view === 'table'"
      >
        <thead>
        <tr>
          <th>Категория</th>
          <th>Сумма</th>
          <th>Среднее</th>
          <th>Количство</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(label, i) in regionsReport.data.labels"
          :key="i"
        >
          <td v-text="label"></td>
          <td v-text="$humanizeNumber(regionsReport.data.sums[i]) + ' тг'" />
          <td v-text="$humanizeNumber(regionsReport.data.avgs[i]) + ' тг'" />
          <td v-text="regionsReport.data.counts[i]" />
        </tr>
        </tbody>
      </v-simple-table>

      <base-material-chart-card
        v-if="view === 'bar_chart'"
        :data="barChartData"
        :options="regionsReport.options[filter.value_view]"
        color="grey"
        type="Bar"
        class="px-4 py-3"
      >
        <h4 class="display-1 font-weight-light mt-2">
          {{ filter.value_view }} по возрастным категориям
        </h4>

      </base-material-chart-card>

      <div v-if="view === 'pie'" id="pie">
        <chartist
          :data="pieChartData"
          :options="regionsReport.options.pie"
          type="Pie"
          style="max-height: 250px;"
        />

        <v-divider class="ma-3" />

        <div class="px-3">
          <div class="body-2 text-uppercase grey--text font-weight-bold mb-3">
            Legend
          </div>

          <v-row
            align="center"
            class="ma-0"
          >
            <div v-for="(label, key) in this.regionsReport.data.labels" :key="key">
              <v-avatar
                class="mr-1"
                :color="colors[key]"
                size="12"
              />
              <span class="mr-3 font-weight-light">{{ label }}</span>
            </div>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "RegionsReport",
        props: {
            view: {
                type: String,
                default: 'table'
            }
        },
        data () {
          return {
              colors: ['info', 'red', 'warning', 'success', 'primary', 'secondary', 'yellow', 'grey', 'blue']
          }
        },
        computed: {
            ...mapState('report', ['regionsReport']),
            ...mapState('filter', ['filter']),
            barChartData () {
                return {
                    labels: this.regionsReport.data.labels,
                    series: [this.regionsReport.data[this.filter.value_view]]
                }
            },
            pieChartData () {
                const sum = this.regionsReport.data[this.filter.value_view].reduce((a, b) => a + b, 0)
                return {
                    series: this.regionsReport.data[this.filter.value_view].map((item, key) => new Object({
                        value: Math.round(item * 100 / sum),
                        className: this.colors[key]
                    })),
                }
            }
        },
        methods: {
            ...mapActions('report', ['getRegionsReportData'])
        },
        created() {
            this.getRegionsReportData(this.filter.filter_set)
        }
    }
</script>

<style lang="sass">
  #pie
    .ct-series-a .ct-slice-pie
      fill: #00cae3 !important

    .ct-series-b .ct-slice-pie
      fill: #f44336 !important

    g.info .ct-slice-pie
      stroke: #00cae3
      fill: #00cae3

    g.red .ct-slice-pie
      stroke: #F44336
      fill: #F44336

    g.warning .ct-slice-pie
      stroke: #fb8c00
      fill: #fb8c00

    g.success .ct-slice-pie
      stroke: #4caf50
      fill: #4caf50

    g.primary .ct-slice-pie
      stroke: #e91e63
      fill: #e91e63

    g.secondary .ct-slice-pie
      stroke: #9c27b0
      fill: #9c27b0

    g.yellow .ct-slice-pie
      stroke: #ffeb3b
      fill: #ffeb3b
    g.grey .ct-slice-pie
      stroke: grey
      fill: grey
    g.blue .ct-slice-pie
      stroke: blue
      fill: blue

</style>
