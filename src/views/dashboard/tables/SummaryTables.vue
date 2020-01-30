<template>
  <v-container id="extended-tables"
               fluid
               tag="section">
    <dashboard-core-app-bar></dashboard-core-app-bar>
    <dashboard-core-filter :filters="filters"
                           :sendFilters="sendFilters"
                           :values="values"></dashboard-core-filter>

<!--    <base-material-card title="Отчет по регионам"-->
<!--                        color="success"-->
<!--                        icon="mdi-clipboard-text"-->
<!--                        inline-->
<!--                        class="px-5 py-3 mb-5">-->
<!--      <div style="position: absolute; top: 20px; right: 20px">-->
<!--        <strong class="h5 font-weight-light">-->
<!--&lt;!&ndash;          <v-btn small>Сумма</v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;          <v-btn small>Среднее</v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;          <v-btn small>Количество</v-btn>&ndash;&gt;-->
<!--        </strong>-->
<!--      </div>-->
<!--      <div>-->
<!--        <v-simple-table >-->
<!--          <template v-slot:default>-->
<!--            <thead>-->
<!--              <tr>-->
<!--                <th >11</th>-->
<!--                <th >11</th>-->
<!--                <th >11</th>-->
<!--                <th >11</th>-->
<!--              </tr>-->
<!--            </thead>-->
<!--            <tbody>-->
<!--              <tr>-->
<!--                <td>1</td>-->
<!--                <td>123</td>-->
<!--                <td >123</td>-->
<!--                <td>123</td>-->
<!--              </tr>-->
<!--            </tbody>-->
<!--          </template>-->
<!--        </v-simple-table>-->
<!--      </div>-->

<!--    </base-material-card>-->

<!--    <div>-->
<!--      <apexchart  width="500" type="line" :options="chartOptions" :series="series"></apexchart >-->
<!--    </div>-->


    <base-material-card color="success"
                        icon="mdi-clipboard-text"
                        inline
                        title="Отчет по регионам"
                        class="px-5 py-3 mb-5"
                        v-show="values.view == 'pivot'"
                        v-if="Object.keys(pivot_table_result).length > 0">
      <v-simple-table id="pivotTable">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ pivot_table_result.property }}</th>
            <th v-for="(item) in pivot_table_result.labels">{{ item }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, key) in pivot_table_result.data">
            <td>{{ key }}</td>
            <td v-for="items in item" >{{ items }}</td>
            <!--td v-for="items in item.ogpo_vts_result" >{{ items }}</td>
            <td v-for="items in item.vts_cross_result" >{{ items }}</td-->
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
                        v-if="Object.keys(comparative_table_result).length>0">
      <v-simple-table>
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
            <td v-for="items in item.sum" v-if="values.type == 'sums' || values.type == null">{{ items }}</td>
            <td v-for="items in item.count" v-if="values.type == 'counts'">{{ items }}</td>
            <td v-for="items in item.avg" v-if="values.type == 'avgs'">{{ items }}</td>
            <td>1.5%</td>
            <td v-for="items in item.sumsprev" v-if="values.type == 'sums' || values.type == null">{{ items }}</td>
            <td v-for="items in item.countprev" v-if="values.type == 'counts'">{{ items }}</td>
            <td v-for="items in item.avgprev" v-if="values.type == 'avgs'">{{ items }}</td>
            <td>3.5%</td>
            <td>114%</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
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

        chartOptions: {
          chart: {
            id: 'vuechart-example'
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [
          {
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91]
          },
          {
            name: 'series-2',
            data: [44, 11, 32, 42, 11, 53, 33, 77]
          }
        ]
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
        }

      },
    }
</script>

<style scoped>

</style>
