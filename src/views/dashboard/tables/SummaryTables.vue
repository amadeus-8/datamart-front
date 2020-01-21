<template>
  <v-container id="extended-tables"
               fluid
               tag="section">
    <div class="mt-3 text-xs-center body-2 text-uppercase">
    <v-btn color="secondary"
           medium
           rounded
           :disabled="reportsloading"
           @click="sendFilters">Применить</v-btn>
    </div>

    <v-menu v-model="from_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="from_date"
                      label="Дата начала"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="from_date"
                     locale="ru-ru"
                     @input="from_menu = false"></v-date-picker>
    </v-menu>

    <v-menu v-model="to_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px">
      <template v-slot:activator="{ on }">
        <v-text-field v-model="to_date"
                      label="Дата окончания"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="to_date"
                     locale="ru-ru"
                     @input="to_menu = false"></v-date-picker>
    </v-menu>

    <v-flex xs12>
      <div class="text-xs-center body-2 text-uppercase sidebar-filter">Город</div>
      <v-select :items="[{name: 'Все', id: null}].concat(regions)"
                label="регион"
                item-text="name"
                item-value="id"
                v-model="region_id"
                solo></v-select>
    </v-flex>

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

    <base-material-card color="success"
                        icon="mdi-clipboard-text"
                        inline
                        title="Общий отчет"
                        class="px-5 py-3 mb-5">
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <!--th class="text-left">Город</th-->
            <th>ОГПО ВТС</th>
            <th>Кросс</th>
            <th>ВТС Сумма</th>
            <th>Средняя сумма</th>
            <th>Кросс сумма</th>
            <th>Общие потери</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in summary_table_result" :key="item.index">
            <!--td>{{ item.name }}</td-->
            <td>{{item.ogpo_vts_result}}</td>
            <td>{{ item.vts_cross_result }}</td>
            <td>{{item.vts_overall_sum}}</td>
            <td>{{item.avg_sum}}</td>
            <td>{{item.avg_cross_result}}</td>
            <td>{{item.overall_lost_count}}</td>
            <!--            <td>{{item.}}</td>-->
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!--      <v-data-table -->
      <!--                    class="elevation-1">-->
      <!--        <template slot="headerCell" slot-scope="">-->
      <!--          <v-tooltip bottom>-->
      <!--            <template v-slot:activator="{ on }">-->
      <!--            <span v-on="on">-->
      <!--&lt;!&ndash;              {{ header.text }}&ndash;&gt;-->
      <!--            </span>-->
      <!--            </template>-->
      <!--            <span>-->
      <!--&lt;!&ndash;            {{ header.text }}&ndash;&gt;-->
      <!--          </span>-->
      <!--          </v-tooltip>-->
      <!--        </template>-->
      <!--        <template v-slot:items="summary_table_result">-->
      <!--          <td>{{ summary_table_result.name }}</td>-->
      <!--          <td class="text-xs-right">{{ summary_table_result.ogpo_vts_result }}</td>-->
      <!--        </template>-->
      <!--      </v-data-table>-->
    </base-material-card>

    <base-material-card color="success"
                        icon="mdi-clipboard-text"
                        inline
                        title="Отчет по регионам"
                        class="px-5 py-3 mb-5">
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ summary_region_table_result.property }}</th>
            <th v-for="(item, key) in summary_region_table_result.labels">{{ item }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, key) in summary_region_table_result.data" >
            <td>{{ key }}</td>
            <td v-for="(items, keys) in item.sums" >{{ items }}</td>
            <!--td>{{ summary_region_table_result.sums[key] }}</td>
            <td>{{ summary_region_table_result.avgs[key] }}</td>
            <td>{{ summary_region_table_result.payout_sums[key] }}</td>
            <td>{{ summary_region_table_result.payout_counts[key] }}</td>
            <td>{{ summary_region_table_result.cross_cums[key] }}</td-->
            <!--td>{{ item }}</td>
            <td>{{item.ogpo_vts_result}}</td>
            <td>{{ item.vts_cross_result }}</td>
            <td>{{item.vts_overall_sum}}</td>
            <td>{{item.avg_sum}}</td>
            <td>{{item.avg_cross_result}}</td>
            <td>{{item.overall_lost_count}}</td>
            <            <td>{{item.}}</td>-->
            <!--td>1</td-->
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </base-material-card>

    <base-material-card color="success"
                        icon="mdi-clipboard-text"
                        inline
                        title="Отчет по возрасту"
                        class="px-5 py-3 mb-5">
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Возраст</th>
            <th>Количество</th>
            <th>Сумма</th>
            <th>ВТС Сумма</th>
            <th>Сумма выплат</th>
            <th>Количество выплат</th>
            <th>Кросс сумма</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, key) in summary_age_table_result.labels" >
            <td>{{ item }}</td>
            <td>{{ summary_age_table_result.counts[key] }}</td>
            <td>{{ summary_age_table_result.sums[key] }}</td>
            <td>{{ summary_age_table_result.avgs[key] }}</td>
            <td>{{ summary_age_table_result.payout_sums[key] }}</td>
            <td>{{ summary_age_table_result.payout_counts[key] }}</td>
            <td>{{ summary_age_table_result.cross_cums[key] }}</td>
            <!--td>{{ item }}</td>
            <td>{{item.ogpo_vts_result}}</td>
            <td>{{ item.vts_cross_result }}</td>
            <td>{{item.vts_overall_sum}}</td>
            <td>{{item.avg_sum}}</td>
            <td>{{item.avg_cross_result}}</td>
            <td>{{item.overall_lost_count}}</td>
            <            <td>{{item.}}</td>-->
            <!--td>1</td-->
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />

  </v-container>


</template>

<script>
    import {axiosInstance as axios} from "../../../plugins/axios";
    // import FilterSet from '../components/core/FilterSet.vue'

    export default {
      name: "SummaryTables",

      // components: {
      //   FilterSet
      // },

      data: () => ({

        summary_table_result: [],
        summary_region_table_result: [],
        summary_age_table_result: [],
        vts_overall:0,


        regions: [],
        region_id: null,
        from_date: new Date('2019-03-01').toISOString().substr(0, 10),
        to_date: new Date('2019-03-30').toISOString().substr(0, 10),

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
        department: null,

        from_menu: false,
        to_menu: false,
        reportsloading: false,

        filter: {
          value_view: 'sums',

          age_categories: ['все', 'младше 20', '20-25', '26-34', '35-44', '45-54', '55-64', 'старше 64'],
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
          kbms: ['все', 'М', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'ИП'],
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

        headers: [
          {
            text: 'Test 1',
            value: 'test 1'
          },
          {
            text: 'Test 2',
            value: 'test 2'
          },
          {
            text: 'Test 3',
            value: 'test 3'
          }
        ],

      }),

      methods: {
        setReportsloading(value) {
          this.reportsloading = value;
        },

        sendFilters() {
          this.getRegionsReportData();
          // // this.setReportsloading(true);
          // axios.post('/create_summary_table',{
          //   region_id: this.region_id,
          //   from_date: this.from_date,
          //   to_date: this.to_date,
          //   gender: this.gender,
          //   age_category: this.age_category,
          //   insurance_class: this.insurance_class,
          // }).then(response => {
          //   this.setFilters(response.data);
          //   this.getRegionsReportData();
          //   this.getAgeReportData();
          //   // this.setReportsloading(false);
          // });
        },
        setFilters(response) {
          this.summary_table_result = response;
        },

        getRegionsReportData(){
          axios.post('/get_regions_report_data', {
            region_id: this.region_id,
            from: this.from_date,
            to: this.to_date,
            gender: this.gender,
            age_category: this.age_category,
            insurance_class: this.insurance_class,
          }).then((response) => {
            this.setRegionsReportData(response.data);
          })
        },

        setRegionsReportData(response) {
          this.summary_region_table_result = response;
        },

        getAgeReportData(){
          axios.post('/get_age_chart_data', {
            region_id: this.region_id,
            from: this.from_date,
            to: this.to_date,
            gender: this.gender,
            age_category: this.age_category,
            insurance_class: this.insurance_class,
          }).then((response) => {
            this.setAgeReportData(response.data);
          })
        },

        setAgeReportData(response) {
          this.summary_age_table_result = response;
        },

        getRegions() {
          axios.get('/get_regions').then((response) => {
            this.setRegions(response.data);
          });
        },
        setRegions(response) {
          this.regions = response;
        },
      },

      mounted() {
        this.getRegions();
      }
    }
</script>

<style scoped>

</style>
