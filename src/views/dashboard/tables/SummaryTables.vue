<template>
  <v-container id="extended-tables"
               fluid
               tag="section">
    <dashboard-core-app-bar></dashboard-core-app-bar>
    <dashboard-core-filter :filters="filters"
                           :sendFilters="sendFilters"
                           :values="values"></dashboard-core-filter>

    <div class="d-flex row" v-if="series.length > 0">
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('line')">
        <base-material-card icon="mdi-earth"
                            title="Линейная диаграмма">
          <apexchart  width="500" type="line" :options="chartOptions" :series="lineChartData"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    v-model="lineChart"
                    @input="limiter('line')">
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item.text }}</span>
              </v-chip>
              <span v-if="index === 1"
                    class="grey--text caption">(+{{ lineChart.length - 1 }} другие)</span>
            </template>
          </v-select>
        </base-material-card>
      </div>
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('area')">
        <base-material-card icon="mdi-earth"
                            title="Секторная диаграмма">
          <apexchart  width="500" type="area" :options="chartOptions" :series="series.slice(0, 1)"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    @input="limiter"></v-select>
        </base-material-card>
      </div>
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('bar')">
        <base-material-card icon="mdi-earth"
                            title="Столбчатая диаграмма">
          <apexchart  width="500" type="bar" :options="chartOptions" :series="series.slice(0, 1)"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    @input="limiter"></v-select>
        </base-material-card>
      </div>
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('pie')">
        <base-material-card icon="mdi-earth"
                            title="Круговая диаграмма">
          <apexchart  width="500" type="pie" :options="chartOptions" :series="series.slice(0, 1)"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    @input="limiter"></v-select>
        </base-material-card>
      </div>
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('donut')">
        <base-material-card icon="mdi-earth"
                            title="Интерактивная кольцевая диаграмма">
          <apexchart  width="500" type="donut" :options="chartOptions" :series="series.slice(0, 1)"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    @input="limiter"></v-select>
        </base-material-card>
      </div>
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('scatter')">
        <base-material-card icon="mdi-earth"
                            title="Диаграмма рассеяния">
          <apexchart  width="500" type="scatter" :options="chartOptions" :series="series.slice(0, 1)"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    @input="limiter"></v-select>
        </base-material-card>
      </div>
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('bubble')">
        <base-material-card icon="mdi-earth"
                            title="Пузырьковая диаграмма">
          <apexchart  width="500" type="bubble" :options="chartOptions" :series="series.slice(0, 1)"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    @input="limiter"></v-select>
        </base-material-card>
      </div>
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('heatmap')">
        <base-material-card icon="mdi-earth"
                            title="Тепловая карта">
          <apexchart  width="500" type="heatmap" :options="chartOptions" :series="series.slice(0, 1)"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    @input="limiter"></v-select>
        </base-material-card>
      </div>
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('radialBar')">
        <base-material-card icon="mdi-earth"
                            title="Тепловая карта">
          <apexchart  width="500" type="radialBar" :options="chartOptions" :series="series.slice(0, 1)"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    @input="limiter"></v-select>
        </base-material-card>
      </div>
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.chart.includes('candlestick')">
        <base-material-card icon="mdi-earth"
                            title="Диаграмма подсвечника">
          <apexchart  width="500" type="candlestick" :options="chartOptions" :series="series.slice(0, 1)"></apexchart >
          <v-select :items="chart_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    multiple
                    solo
                    @input="limiter"></v-select>
        </base-material-card>
      </div>
    </div>




    <base-material-card color="success"
                        icon="mdi-clipboard-text"
                        inline
                        title="Отчет по регионам"
                        class="px-5 py-3"
                        v-show="values.view == 'pivot'"
                        v-if="Object.keys(pivot_table_result).length > 0">
      <div class="d-flex justify-end">
        <v-btn v-if="filters.values === 'ogpo_vts_result' ||
                     filters.values === 'ogpo_vts_count' ||
                     filters.values === 'vts_cross_result' ||
                     filters.values === 'avg_cross_result' ||
                     filters.values === 'vts_overall_sum' ||
                     filters.values === 'avg_sum'"
               small outlined tile
               :color="buttonOneIsPressed ? 'success' : 'warning'"
               @click="switchTableType('sum')">Сумма</v-btn>
        <v-btn v-if="filters.values === 'vts_cross_result' ||
                     filters.values === 'avg_cross_result' ||
                     filters.values === 'vts_overall_sum' ||
                     filters.values === 'avg_sum'"
               small outlined tile
               :color="buttonTwoIsPressed ? 'success' : 'warning'"
               @click="switchTableType('avg')">Среднее</v-btn>
        <v-btn v-if="filters.values === 'ogpo_vts_result' ||
                     filters.values === 'ogpo_vts_count'"
               small outlined tile
               :color="buttonThreeIsPressed ? 'success' : 'warning'"
               @click="switchTableType('amount')">Количество</v-btn>
      </div>
      <v-simple-table id="pivotTable">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">{{ pivot_table_result.property }}</th>
              <th v-for="(item) in pivot_table_result.labels" v-if="pivot_table_result.labels.length > 1">{{ item }}</th>
              <th v-else>
                <span v-if="filters.values === 'ogpo_vts_result' || filters.values === 'ogpo_vts_count'">Премия ОС ГПО ВТС</span>
                <span v-if="filters.values === 'vts_cross_result' || filters.values === 'avg_cross_result'">Премии др.продукты (Кросс + доброволки)</span>
                <span v-if="filters.values === 'vts_overall_sum' || filters.values === 'avg_sum'">Сумма премий ВТС</span>
                <span v-if="filters.values === 'medical_count'">Медицина (Все из узла ДМС)</span>
                <span v-if="filters.values === 'megapolis_count'">Мегаполис (Мегаполис, Мегаполис 100,  Страхование имущества)</span>
                <span v-if="filters.values === 'amortization_count'">Амортизация</span>
                <span v-if="filters.values === 'kasko_count'">Каско (Автокаско, Классик, Прогресс)</span>
                <span v-if="filters.values === 'kommesk_comfort_count'">Коммеск-Комфорт</span>
                <span v-if="filters.values === 'tour_count'">ВЗР (все из узла страхование путеш-в)</span>
                <span v-if="filters.values === 'overall_lost_count'">Кол-во Убытков общее</span>
                <span v-if="filters.values === 'vts_lost_count'">Кол-во Убытков по ОС ГПО ВТС</span>
                <span v-if="filters.values === 'declared_claims'">Заявленные Претензии(статус - Оформление)</span>
                <span v-if="filters.values === 'pending_claims'">Рассмотрение (Статусы - рассм-ся, на подписи)</span>
                <span v-if="filters.values === 'accepted_claims'">Статусы - Подписан, Урегулировано</span>
                <span v-if="filters.values === 'payout_reject_claims'">Статус - Отказ в возмещении</span>
                <span v-if="filters.values === 'client_reject_claims'">Статус - Отказ заявителя</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in pivot_table_result.data">
              <td>{{ key }}</td>
              <td v-for="items in item" >
                <span v-for="(i, k) in items" v-if="k == filters.values">
                  <span v-if="i == null"> 0 </span>
                  <span v-else>{{ i.toLocaleString() }}</span>
                </span>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="d-flex justify-end mt-2">
        <v-btn tile small color="success" @click="exportTableToExcel('pivotTable')">
          <v-icon small color="white" class="mr-1">mdi-arrow-down-bold-box-outline</v-icon>
          <span>Скачать</span>
        </v-btn>
      </div>
    </base-material-card>

    <base-material-card color="success"
                        icon="mdi-clipboard-text"
                        inline
                        title="Отчет по регионам"
                        class="px-5 py-3 mb-5"
                        v-show="values.view == 'comparative'"
                        v-if="Object.keys(comparative_table_result).length > 0">
      <div class="d-flex justify-end">
        <v-btn v-if="filters.values === 'ogpo_vts_result' ||
                     filters.values === 'ogpo_vts_count' ||
                     filters.values === 'vts_cross_result' ||
                     filters.values === 'avg_cross_result' ||
                     filters.values === 'vts_overall_sum' ||
                     filters.values === 'avg_sum'"
               small outlined tile
               :color="buttonOneIsPressed ? 'success' : 'warning'"
               @click="switchTableType('sum')">Сумма</v-btn>
        <v-btn v-if="filters.values === 'vts_cross_result' ||
                     filters.values === 'avg_cross_result' ||
                     filters.values === 'vts_overall_sum' ||
                     filters.values === 'avg_sum'"
               small outlined tile
               :color="buttonTwoIsPressed ? 'success' : 'warning'"
               @click="switchTableType('avg')">Среднее</v-btn>
        <v-btn v-if="filters.values === 'ogpo_vts_result' ||
                     filters.values === 'ogpo_vts_count'"
               small outlined tile
               :color="buttonThreeIsPressed ? 'success' : 'warning'"
               @click="switchTableType('amount')">Количество</v-btn>
      </div>
      <v-simple-table id="comparativeTable">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ comparative_table_result.property }}</th>
            <th v-for="(item) in comparative_table_result.labels">{{ item }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, key) in comparative_table_result.data">
            <td>{{ key }}</td>
            <td v-for="(item, index) in item[0]" v-if="index == filters.values">
              <span v-if="item == null">0</span>
              <span v-else>{{ item.toLocaleString() }}</span>
            </td>
            <td v-for="(item, index) in item[1]" v-if="index == filters.values">
              {{ item }}%
            </td>
            <td v-for="(item, index) in item[2]" v-if="index == filters.values">
              <span v-if="item == null">0</span>
              <span v-else>{{ item.toLocaleString() }}</span>
            </td>
            <td v-for="(item, index) in item[3]" v-if="index == filters.values">
              {{ item }}%
            </td>
            <td v-for="(item, index) in item[4]" v-if="index == filters.values">
              {{ item }}%
            </td>
          </tr>
          <tr>
            <td>Общий итог</td>
            <td v-for="(item,key) in comparative_table_result.bottomData[0]" v-if="key == filters.values">
              <span v-if="item == null">0</span>
              <span v-else>{{ item.toLocaleString() }}</span>
            </td>
            <td>
              100%
            </td>
            <td v-for="(item,key) in comparative_table_result.bottomData[1]" v-if="key == filters.values">
              <span v-if="item == null">0</span>
              <span v-else>{{ item.toLocaleString() }}</span>
            </td>
            <td>
              100%
            </td>
            <td v-for="(item,key) in comparative_table_result.bottomData[2]" v-if="key == filters.values">
              <span v-if="item == null">0</span>
              <span v-else>{{ item.toLocaleString() }}%</span>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="d-flex justify-end mt-2">
        <v-btn tile small color="success" @click="exportTableToExcel('comparativeTable')">
          <v-icon small color="white" class="mr-1">mdi-arrow-down-bold-box-outline</v-icon>
          <span>Скачать</span>
        </v-btn>
      </div>
    </base-material-card>

    <div class="py-3" />

    <dashboard-core-footer></dashboard-core-footer>
  </v-container>


</template>

<script>
    import {axiosInstance as axios} from "../../../plugins/axios";

    export default {
      name: "SummaryTables",

      props: {
        filters: Object,
        values: Object,
      },

      components: {
        DashboardCoreAppBar: () => import('../components/core/DashboardCoreAppBar'),
        DashboardCoreFooter: () => import('../components/core/DashboardCoreFooter'),
        DashboardCoreFilter: () => import('../components/core/DashboardCoreFilter')
      },

      data: () => ({
        comparative_table_result: [],
        pivot_table_result: [],

        buttonOneIsPressed: true,
        buttonTwoIsPressed: false,
        buttonThreeIsPressed: false,
        showButtonOne: true,
        showButtonTwo: true,
        showButtonThree: true,

        chartOptions: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: []
          }
        },
        series: [],

        temp: [],

        chart_values: [
          {
            text: 'Премия ОС ГПО ВТС',
            value: 'ogpo_vts_result',
          },
          {
            text: 'Медицина (Все из узла ДМС)',
            value: 'medical_count',
          },
          {
            text: 'Мегаполис (Мегаполис, Мегаполис 100,  Страхование имущества)',
            value: 'megapolis_count',
          },
          {
            text: 'Амортизация',
            value: 'amortization_count',
          },
          {
            text: 'Каско (Автокаско, Классик, Прогресс)',
            value: 'kasko_count',
          },
          {
            text: 'Коммеск-Комфорт',
            value: 'kommesk_comfort_count',
          },
          {
            text: 'ВЗР (все из узла страхование путеш-в)',
            value: 'tour_count',
          },
          {
            text: 'ГПО ВТС',
            value: 'ogpo_vts_count',
          },
          {
            text: 'Премии др.продукты (Кросс + доброволки)',
            value: 'vts_cross_result',
          },
          {
            text: 'Сумма премий ВТС',
            value: 'vts_overall_sum',
          },
          {
            text: 'Ср. чек общий (ГПО ВТС, кросс, доброволки)',
            value: 'avg_sum',
          },
          {
            text: 'Ср.чек кросс и доброволки',
            value: 'avg_cross_result',
          },
          {
            text: 'Кол-во Убытков общее',
            value: 'overall_lost_count',
          },
          {
            text: 'Кол-во Убытков по ОС ГПО ВТС',
            value: 'vts_lost_count',
          },
          {
            text: 'Заявленные Претензии(статус - Оформление)',
            value: 'declared_claims',
          },
          {
            text: 'Рассмотрение (Статусы - рассм-ся, на подписи)',
            value: 'pending_claims',
          },
          {
            text: 'Статусы - Подписан, Урегулировано',
            value: 'accepted_claims',
          },
          {
            text: 'Статус - Отказ в возмещении',
            value: 'payout_reject_claims',
          },
          {
            text: 'Статус - Отказ заявителя',
            value: 'client_reject_claims',
          },
        ],

        lineChart: [],
        lineChartData: [],



      }),

      methods: {
        setIsLoading(value) {
          this.values.isLoading = value;
        },

        sendFilters() {
          switch (this.values.view) {
            case "comparative":
              this.setIsLoading(true);
              axios.post('/get_comparative_report', this.filters).then(response => {
                this.setComparativeTableData(response.data);
              }).catch(error => {
                alert(error);
                this.setIsLoading(false);
              });
              break;

            case "pivot":
              this.setIsLoading(true);
              axios.post('/get_pivot_report', this.filters).then(response => {
                this.setPivotTableData(response.data);
              }).catch(error => {
                alert(error);
                this.setIsLoading(false);
              });
              break;

            default:
              this.setIsLoading(false);
              alert("Выберите вид");
              break;
          }
        },

        setComparativeTableData(response) {
          this.comparative_table_result = response;
          this.setIsLoading(false);
        },
        setPivotTableData(response) {
          this.pivot_table_result = response;
          this.createChartOptions(this.pivot_table_result.data);
          this.setIsLoading(false);
        },

        exportTableToExcel(tableID, filename = '') {
          var downloadLink;
          var dataType = 'application/vnd.ms-excel';
          var tableSelect = document.getElementById(tableID);
          var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

          // Specify file name
          filename = filename ? filename + '.xls' : 'excel_data.xls';

          // Create download link element
          downloadLink = document.createElement("a");

          document.body.appendChild(downloadLink);

          if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', tableHTML], {
              type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
          }
          else {
            // Create a link to the file
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
          }
        },

        switchTableType(type) {
          switch (type) {
            case 'sum':
                  this.buttonOneIsPressed = true;
                  this.buttonTwoIsPressed = false;
                  this.buttonThreeIsPressed = false;
                  if(this.filters.values === "ogpo_vts_result" || this.filters.values === 'ogpo_vts_count') {
                    this.filters.values = "ogpo_vts_result";
                  }
                  else if(this.filters.values === 'vts_cross_result' || this.filters.values === 'avg_cross_result') {
                    this.filters.values = 'vts_cross_result'
                  }
                  else if(this.filters.values === 'vts_overall_sum' || this.filters.values === 'avg_sum') {
                    this.filters.values = 'vts_overall_sum'
                  }
                  break;
            case 'avg':
                  this.buttonOneIsPressed = false;
                  this.buttonTwoIsPressed = true;
                  this.buttonThreeIsPressed = false;
                  if(this.filters.values === 'vts_cross_result' || this.filters.values === 'avg_cross_result') {
                    this.filters.values = 'avg_cross_result';
                  }
                  else if(this.filters.values === 'avg_sum' || this.filters.values === 'vts_overall_sum') {
                    this.filters.values = 'avg_sum';
                  }
                  break;
            case 'amount':
                  this.buttonOneIsPressed = false;
                  this.buttonTwoIsPressed = false;
                  this.buttonThreeIsPressed = true;
                  if(this.filters.values === "ogpo_vts_result" || this.filters.values === 'ogpo_vts_count') {
                    this.filters.values = 'ogpo_vts_count';
                  }
                  break;
            default:
                  break;
          }
        },

        createChartOptions: function (data) {
          this.chartOptions.xaxis.categories = [];
          this.series = [];
          var vm = this;

          for(let key in data) {
            this.chartOptions.xaxis.categories.push(key);
          }

          for(let index = 0; index < Object.keys(data).length; index++) {
            for(let key in data) {
              let simpleData = data[key][0];
              let name = Object.keys(simpleData)[index];
              simpleData = Object.values(simpleData)[index];
              vm.temp.push(simpleData);
              if(vm.temp.length === Object.keys(data).length) {
                vm.series.push({
                  name: this.getLabels(name),
                  data: vm.temp,
                  value: name,
                });
                vm.temp = [];
              }
            }
          }
        },
        getLabels(label) {
          let labels = {
            'vts_overall_sum': 'Сумма премий ВТС',
            'ogpo_vts_result': 'Премия ОС ГПО ВТС',
            'vts_cross_result': 'Премии др.продукты (Кросс + доброволки)',
            'avg_sum': 'Ср. чек общий (ГПО ВТС, кросс, доброволки)',
            'avg_cross_result': 'Ср.чек кросс и доброволки',
            'overall_lost_count': 'Кол-во Убытков общее',
            'vts_lost_count': 'Кол-во Убытков по ОС ГПО ВТС',
            'declared_claims': 'Заявленные Претензии(статус - Оформление)',
            'pending_claims': 'Рассмотрение (Статусы - рассм-ся, на подписи)',
            'accepted_claims': 'Статусы - Подписан, Урегулировано',
            'payout_reject_claims': 'Статус - Отказ в возмещении',
            'client_reject_claims': 'Статус - Отказ заявителя',
            'payout_sum': 'Сумма выплаты',
            'ogpo_vts_count': 'ГПО ВТС',
            'medical_count': 'Медицина (Все из узла ДМС)',
            'megapolis_count': 'Мегаполис (Мегаполис, Мегаполис 100,  Страхование имущества)',
            'amortization_count': 'Амортизация',
            'kasko_count': 'Каско (Автокаско, Классик, Прогресс)',
            'kommesk_comfort_count': 'Коммеск-Комфортf',
            'tour_count': 'ВЗР (все из узла страхование путеш-в)',
          };
          for(let name in labels) {
            if(name === label) return labels[name];
          }
        },

        limiter(type) {
            switch (type) {
              case 'line':
                if(this.lineChart.length > 3) this.lineChart.pop();
                else {
                  for(let key in this.series) {
                    if(this.lineChart.includes(this.series[key].value)) {
                      this.lineChartData.push(this.series[key]);
                    }
                  }
                }
            }

        }
      },
      watch: {

      },
    }
</script>

<style scoped>

</style>
