<template>
  <v-container id="extended-tables"
               fluid
               tag="section">
    <dashboard-core-app-bar :values="values"></dashboard-core-app-bar>
    <dashboard-core-filter :filters="filters" :sendFilters="sendFilters"></dashboard-core-filter>
    <div class="mt-3 text-xs-center body-2 text-uppercase">
<!--    <v-btn color="secondary"-->
<!--           medium-->
<!--           rounded-->
<!--           :disabled="reportsloading"-->
<!--           @click="sendFilters">Применить</v-btn>-->
    </div>

<!--    <v-flex xs12>-->
<!--      <div class="text-xs-center body-2 text-uppercase sidebar-filter">Город</div>-->
<!--      <v-select :items="[{name: 'Все', id: null}].concat(regions)"-->
<!--                label="регион"-->
<!--                item-text="name"-->
<!--                item-value="id"-->
<!--                v-model="region_id"-->
<!--                solo></v-select>-->
<!--    </v-flex>-->

    <!--div class="mt-2 text-xs-center body-2 text-uppercase sidebar-filter">Пол</div>
    <v-radio-group v-model="gender" row>
      <v-radio label="М" value="М"></v-radio>
      <v-radio label="Ж" value="Ж"></v-radio>
      <v-radio label="Все" :value="null"></v-radio>
    </v-radio-group>

    <v-select :items="filter.age_categories"
              label="Возраст"
              v-model="age_category">
    </v-select>

    <v-select :items="filter.kbms"
              label="Кбм"
              v-model="insurance_class">
    </v-select-->

<!--    <base-material-card color="success"-->
<!--                        icon="mdi-clipboard-text"-->
<!--                        inline-->
<!--                        title="Общий отчет"-->
<!--                        class="px-5 py-3 mb-5">-->
<!--      <v-simple-table>-->
<!--        <template v-slot:default>-->
<!--          <thead>-->
<!--          <tr>-->
<!--            &lt;!&ndash;th class="text-left">Город</th&ndash;&gt;-->
<!--            <th>ОГПО ВТС</th>-->
<!--            <th>Кросс</th>-->
<!--            <th>ВТС Сумма</th>-->
<!--            <th>Средняя сумма</th>-->
<!--            <th>Кросс сумма</th>-->
<!--            <th>Общие потери</th>-->
<!--          </tr>-->
<!--          </thead>-->
<!--          <tbody>-->
<!--          <tr v-for="item in pivot_table_result" :key="item.index">-->
<!--            &lt;!&ndash;td>{{ item.name }}</td&ndash;&gt;-->
<!--            <td>{{item.ogpo_vts_result}}</td>-->
<!--            <td>{{ item.vts_cross_result }}</td>-->
<!--            <td>{{item.vts_overall_sum}}</td>-->
<!--            <td>{{item.avg_sum}}</td>-->
<!--            <td>{{item.avg_cross_result}}</td>-->
<!--            <td>{{item.overall_lost_count}}</td>-->
<!--            &lt;!&ndash;            <td>{{item.}}</td>&ndash;&gt;-->
<!--          </tr>-->
<!--          </tbody>-->
<!--        </template>-->
<!--      </v-simple-table>-->
<!--      &lt;!&ndash;      <v-data-table &ndash;&gt;-->
<!--      &lt;!&ndash;                    class="elevation-1">&ndash;&gt;-->
<!--      &lt;!&ndash;        <template slot="headerCell" slot-scope="">&ndash;&gt;-->
<!--      &lt;!&ndash;          <v-tooltip bottom>&ndash;&gt;-->
<!--      &lt;!&ndash;            <template v-slot:activator="{ on }">&ndash;&gt;-->
<!--      &lt;!&ndash;            <span v-on="on">&ndash;&gt;-->
<!--      &lt;!&ndash;&lt;!&ndash;              {{ header.text }}&ndash;&gt;&ndash;&gt;-->
<!--      &lt;!&ndash;            </span>&ndash;&gt;-->
<!--      &lt;!&ndash;            </template>&ndash;&gt;-->
<!--      &lt;!&ndash;            <span>&ndash;&gt;-->
<!--      &lt;!&ndash;&lt;!&ndash;            {{ header.text }}&ndash;&gt;&ndash;&gt;-->
<!--      &lt;!&ndash;          </span>&ndash;&gt;-->
<!--      &lt;!&ndash;          </v-tooltip>&ndash;&gt;-->
<!--      &lt;!&ndash;        </template>&ndash;&gt;-->
<!--      &lt;!&ndash;        <template v-slot:items="pivot_table_result">&ndash;&gt;-->
<!--      &lt;!&ndash;          <td>{{ pivot_table_result.name }}</td>&ndash;&gt;-->
<!--      &lt;!&ndash;          <td class="text-xs-right">{{ pivot_table_result.ogpo_vts_result }}</td>&ndash;&gt;-->
<!--      &lt;!&ndash;        </template>&ndash;&gt;-->
<!--      &lt;!&ndash;      </v-data-table>&ndash;&gt;-->
<!--    </base-material-card>-->

    <base-material-card color="success"
                        icon="mdi-clipboard-text"
                        inline
                        title="Отчет по регионам"
                        class="px-5 py-3 mb-5"
                        v-show="values.view == 'pivot' || values.view == null"
                        v-if="Object.keys(pivot_table_result).length>0">
      <v-simple-table>
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
            <td v-for="items in item.sum" v-if="values.type == 'sums' || values.type == null">{{ items }}</td>
            <td v-for="items in item.count" v-if="values.type == 'counts'">{{ items }}</td>
            <td v-for="items in item.avg" v-if="values.type == 'avgs'">{{ items }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
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

<!--    <base-material-card color="success"-->
<!--                        icon="mdi-clipboard-text"-->
<!--                        inline-->
<!--                        title="Отчет по возрасту"-->
<!--                        class="px-5 py-3 mb-5">-->
<!--      <v-simple-table>-->
<!--        <template v-slot:default>-->
<!--          <thead>-->
<!--          <tr>-->
<!--            <th class="text-left">Возраст</th>-->
<!--            <th>Количество</th>-->
<!--            <th>Сумма</th>-->
<!--            <th>ВТС Сумма</th>-->
<!--            <th>Сумма выплат</th>-->
<!--            <th>Количество выплат</th>-->
<!--            <th>Кросс сумма</th>-->
<!--          </tr>-->
<!--          </thead>-->
<!--          <tbody>-->
<!--          <tr v-for="(item, key) in summary_age_table_result.labels" >-->
<!--            <td>{{ item }}</td>-->
<!--            <td>{{ summary_age_table_result.counts[key] }}</td>-->
<!--            <td>{{ summary_age_table_result.sums[key] }}</td>-->
<!--            <td>{{ summary_age_table_result.avgs[key] }}</td>-->
<!--            <td>{{ summary_age_table_result.payout_sums[key] }}</td>-->
<!--            <td>{{ summary_age_table_result.payout_counts[key] }}</td>-->
<!--            <td>{{ summary_age_table_result.cross_cums[key] }}</td>-->
<!--            &lt;!&ndash;td>{{ item }}</td>-->
<!--            <td>{{item.ogpo_vts_result}}</td>-->
<!--            <td>{{ item.vts_cross_result }}</td>-->
<!--            <td>{{item.vts_overall_sum}}</td>-->
<!--            <td>{{item.avg_sum}}</td>-->
<!--            <td>{{item.avg_cross_result}}</td>-->
<!--            <td>{{item.overall_lost_count}}</td>-->
<!--            <            <td>{{item.}}</td>&ndash;&gt;-->
<!--            &lt;!&ndash;td>1</td&ndash;&gt;-->
<!--          </tr>-->
<!--          </tbody>-->
<!--        </template>-->
<!--      </v-simple-table>-->
<!--    </base-material-card>-->

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
      },

      components: {
        DashboardCoreAppBar: () => import('../components/core/DashboardCoreAppBar'),
        DashboardCoreFooter: () => import('../components/core/DashboardCoreFooter'),
        DashboardCoreFilter: () => import('../components/core/DashboardCoreFilter')
      },

      data: () => ({
        values: {
          type: null,
          view: null,
        },

        comparative_table_result: [],
        pivot_table_result: [],

        filter: {
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
        },

      }),

      methods: {
        sendFilters() {
          switch(this.values.view) {
            case "comparative":
              axios.post('/get_comparative_report', this.filters).then(response => {
                this.setComparativeTableData(response.data);
              }).catch(error => {
                alert(error);
              });
              break;

            case "pivot":
              axios.post('/get_pivot_report', this.filters).then(response => {
                this.setPivotTableData(response.data);
              }).catch(error => {
                alert(error);
              });
              break;

            default:
              break;
          }
        },

        setComparativeTableData(response) {
          this.comparative_table_result = response;
        },
        setPivotTableData(response) {
          this.pivot_table_result = response;
        }
      },
    }
</script>

<style scoped>

</style>
