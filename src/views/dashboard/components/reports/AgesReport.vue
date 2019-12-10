<template>
  <div>
    <div class="text-center py-2" v-show="ageCategoryReport.loading">
      Загрузка...
    </div>
    <div v-show="!ageCategoryReport.loading">
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
          v-for="(label, i) in ageCategoryReport.data.labels"
          :key="i"
        >
          <td v-text="label"></td>
          <td v-text="$humanizeNumber(ageCategoryReport.data.sums[i]) + ' тг'" />
          <td v-text="$humanizeNumber(ageCategoryReport.data.avgs[i]) + ' тг'" />
          <td v-text="ageCategoryReport.data.counts[i]" />
        </tr>
        </tbody>
      </v-simple-table>

      <base-material-chart-card
        v-if="view === 'bar_chart'"
        :data="barChartData"
        :options="ageCategoryReport.options[filter.value_view]"
        color="grey"
        type="Bar"
        class="px-4 py-3"
      >
        <h4 class="display-1 font-weight-light mt-2">
          {{ filter.value_view }} по возрастным категориям
        </h4>

        <div class="grey--text font-weight-light">
          {{ filters_label }}
        </div>
      </base-material-chart-card>

      <div v-if="view === 'pie'" id="pie">
        <chartist
          :data="pieChartData"
          :options="ageCategoryReport.options.pie"
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
            <div v-for="(label, key) in this.ageCategoryReport.data.labels" :key="key">
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
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: "AgeReport",
        data () {
            return {
              colors: ['info', 'red', 'warning', 'success', 'primary', 'secondary', 'yellow']
            }
        },
        props: {
          view: {
              type: String,
              default: 'table'
          }
        },
        computed: {
            ...mapState('report', ['ageCategoryReport']),
            ...mapState('filter', ['filter']),
            ...mapGetters('filter', ['filters_label']),
            barChartData () {
                return {
                   labels: this.ageCategoryReport.data.labels,
                   series: [this.ageCategoryReport.data[this.filter.value_view]]
                }
            },
            pieChartData () {
                const sum = this.ageCategoryReport.data[this.filter.value_view].reduce((a, b) => a + b, 0)
                return {
                    series: this.ageCategoryReport.data[this.filter.value_view].map((item, key) => new Object({
                        value: Math.round(item * 100 / sum),
                        className: this.colors[key]
                    })),
                }
            }
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

</style>
