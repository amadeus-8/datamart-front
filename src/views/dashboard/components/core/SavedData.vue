<template>
  <div id="savedData" v-if="this.block.savedData">
    <v-row>
      <v-col cols="12" sm="6" md="8">
        <h1 class="mt-2">Сохраненные данные</h1>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-flex xs12 style="background:none">
          <v-select :items="savedData.countOnPageItems"
                    label="Количество записей"
                    item-text="name"
                    item-value="value"
                    v-model="savedData.countOnPage"
                    solo
                    @change="getSavedData()"
          ></v-select>
        </v-flex>
      </v-col>
    </v-row>
    <base-material-card color="success"
                        icon="mdi-clipboard-text"
                        inline
                        title="Сводная таблица"
                        class="px-5 py-3"
                        v-if="values.view_type.includes('pivot') || values.view_type.length == 0"
                        v-for="(pivot_table_result,key) in savedData.pivot_table_result">


      <v-flex xs12>
        <v-select :items="computedValues.filter_values"
                  label="Значения"
                  item-text="text"
                  item-value="value"
                  v-model="filters.values"></v-select>
      </v-flex>

      <v-menu :close-on-content-click="false"
              :nudge-right="40"
              style="background-color: #FFFFFF"
              transition="scale-transition"
              offset-y>
        <dashboard-table-filter :filters="filters"
                                :values="values"
                                :sendTableFilters="sendTableFilters"
                                :type="'pivot'"
                                :computedValues="computedValues"></dashboard-table-filter>
        <template v-slot:activator="{ on }">
          <div class="d-flex justify-space-between">

            <div class="d-flex">
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
          </div>
        </template>
      </v-menu>

      <div v-if="Object.keys(savedData.pivot_table_result).length > 0">
        <v-simple-table :id="'pivotTable-'+key">
          <template v-slot:default>
            <thead>
            <tr v-if="pivot_table_result.labels.length > 0">
              <th class="text-left sortable">
                <div @click="sortTable('key',key,'pivot',null,'savedData')">
                  {{ pivot_table_result.property }}
                  <span class="sortView" v-if="sortType == 'desc'">&nbsp;&uarr;</span>
                  <span class="sortView" v-else>&nbsp;&darr;</span>
                </div>
              </th>
              <th class="sortable" v-for="(item) in pivot_table_result.labels" @click="sortTable( 'item',key,'pivot',item,'savedData')">
                <div>
                  {{ item }}
                  <span class="sortView" v-if="sortType == 'desc'">&nbsp;&uarr;</span>
                  <span class="sortView" v-else>&nbsp;&darr;</span>
                </div>
              </th>
            </tr>
            <tr v-else>
              <th class="text-left sortable">
                <div @click="sortTable('key',key,'pivot',null,'savedData')">
                  {{ pivot_table_result.property }}
                  <span class="sortView" v-if="sortType == 'desc'">&nbsp;&uarr;</span>
                  <span class="sortView" v-else>&nbsp;&darr;</span>
                </div>
              </th>
              <th class="sortable" @click="sortTable( 'item',key,'pivot',0,'savedData')">
                <span v-if="filters.values === 'ogpo_vts_result' || filters.values === 'ogpo_vts_count'">Премия ОС ГПО ВТС</span>
                <span v-if="filters.values === 'vts_cross_result' || filters.values === 'avg_cross_result'">Премии др.продукты (Кросс + доброволки)</span>
                <span v-if="filters.values === 'vts_overall_sum' || filters.values === 'avg_sum'">Сумма премий ВТС</span>
                <span v-if="filters.values === 'payout_sum'">Сумма выплаты</span>
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
                <span class="sortView" v-if="sortType == 'desc'">&nbsp;&uarr;</span>
                <span class="sortView" v-else>&nbsp;&darr;</span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, key) in pivot_table_result.data">
              <td>{{ key }}</td>
              <td v-for="items in item" >
                          <span v-for="(i, k) in items" v-if="k == filters.values">
                            <span v-if="i == null"> 0 </span>
                            <span v-else>{{ toDivide(i) }}</span>
                          </span>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="d-flex justify-end mt-2">
          <v-btn tile small color="success" class="mr-0" @click="exportTableToExcel('pivotTable-'+key)">
            <v-icon small color="white" class="mr-1">mdi-arrow-down-bold-box-outline</v-icon>
            <span>Скачать</span>
          </v-btn>
        </div>
      </div>
    </base-material-card>

    <base-material-card color="success"
                        icon="mdi-clipboard-text"
                        inline
                        title="Сравнительная таблица"
                        class="px-5 py-3 mb-5"
                        v-if="values.view_type.includes('comparative')"
                        v-for="(comparative_table_result,key) in savedData.comparative_table_result">
      <v-flex xs12>
        <v-select :items="computedValues.filter_values"
                  label="Значения"
                  item-text="text"
                  item-value="value"
                  v-model="filters.values"></v-select>
      </v-flex>
      <v-menu :close-on-content-click="false"
              :nudge-right="40"
              style="background-color: #FFFFFF"
              transition="scale-transition"
              offset-y>
        <dashboard-table-filter :filters="filters"
                                :values="values"
                                :sendTableFilters="sendTableFilters"
                                :type="'comparative'"
                                :computedValues="computedValues"></dashboard-table-filter>
        <template v-slot:activator="{ on }">
          <div class="d-flex justify-space-between">
            <div class="d-flex">
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
          </div>
        </template>
      </v-menu>

      <div  v-if="Object.keys(savedData.comparative_table_result).length > 0">
        <v-simple-table :id="'comparativeTable-'+key">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left sortable">
                <div @click="sortTable('key',key,'comparative',null,'savedData')">
                  {{ comparative_table_result.property }}
                  <span class="sortView" v-if="sortType == 'desc'">&nbsp;&uarr;</span>
                  <span class="sortView" v-else>&nbsp;&darr;</span>
                </div>
              </th>
              <th  class="sortable" v-for="(item,index) in comparative_table_result.labels" @click="sortTable( 'item',key,'comparative',index,'savedData')">
                {{ item }}
                <span class="sortView" v-if="sortType == 'desc'">&nbsp;&uarr;</span>
                <span class="sortView" v-else>&nbsp;&darr;</span>
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, key) in comparative_table_result.data">
              <td>{{ key }}</td>
              <td v-for="(item, index) in item[0]" v-if="index == filters.values">
                <span v-if="item == null">0</span>
                <span v-else>{{ toDivide(item) }}</span>
              </td>
              <td v-for="(item, index) in item[1]" v-if="index == filters.values">
                {{ item }}%
              </td>
              <td v-for="(item, index) in item[2]" v-if="index == filters.values">
                <span v-if="item == null">0</span>
                <span v-else>{{ toDivide(item) }}</span>
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
                <span v-else>{{ toDivide(item) }}</span>
              </td>
              <td>
                100%
              </td>
              <td v-for="(item,key) in comparative_table_result.bottomData[1]" v-if="key == filters.values">
                <span v-if="item == null">0</span>
                <span v-else>{{ toDivide(item) }}</span>
              </td>
              <td>
                100%
              </td>
              <td v-for="(item,key) in comparative_table_result.bottomData[2]" v-if="key == filters.values">
                <span v-if="item == null">0</span>
                <span v-else>{{ toDivide(item) }}%</span>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="d-flex justify-end mt-2">
          <v-btn tile small color="success" class="mr-0" @click="exportTableToExcel('comparativeTable-'+key)">
            <v-icon small color="white" class="mr-1">mdi-arrow-down-bold-box-outline</v-icon>
            <span>Скачать</span>
          </v-btn>
        </div>
      </div>
    </base-material-card>
    <div class="d-flex row">
      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('line') && Object.keys(savedData.lineChartData).length > 0"  v-for="item,key in savedData.lineChartData">
        <div>
          <base-material-card icon="mdi-earth" title="Линейная диаграмма">
            <div class="mt-3 mb-3 font-weight-bold">Показаны значения - {{ item[0].name }}</div>
            <apexchart  width="500" type="line" :options="savedData.lineChartOptions[key]" :series="item" v-if="showLine.property"></apexchart >
          </base-material-card>
        </div>
      </div>

      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('area') && Object.keys(savedData.areaChartData).length > 0" v-for="item,key in savedData.areaChartData">
        <div>
          <base-material-card icon="mdi-earth" title="Секторная диаграмма">
            <div class="mt-3 mb-3 font-weight-bold">Показаны значения - {{ item[0].name }}</div>
            <apexchart  width="500" type="area" :options="savedData.areaChartOptions[key]" :series="item" v-if="showArea.property"></apexchart >
          </base-material-card>
        </div>
      </div>

      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('bar') && Object.keys(savedData.barChartData).length > 0" v-for="item,key in savedData.barChartData">
        <div>
          <base-material-card icon="mdi-earth" title="Столбчатая диаграмма" >
            <div class="mt-3 mb-3 font-weight-bold">Показаны значения - {{ item[0].name }}</div>
            <apexchart  width="500" type="bar"  :options="savedData.barChartOptions[key]" :series="item" v-if="showBar.property"></apexchart>
          </base-material-card>
        </div>
      </div>

      <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('pie') && Object.keys(savedData.pieChartDatas).length > 0">
        <base-material-card icon="mdi-earth" title="Круговая диаграмма" v-for="item,key in savedData.pieChartDatas">
          <div class="mt-3 mb-3 font-weight-bold">Показаны значения - {{ item.name }}</div>
          <apexchart  width="500" type="pie" :options="savedData.pieChartOptions[key]" :series="item.data" v-if="showPie.property"></apexchart>
        </base-material-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {axiosInstance as axios} from "../../../../plugins/axios";

  export default {
    name: 'SavedData',

    props: {
      drawer: Object,
      comparative_table_results: Array,
      pivot_table_results: Array,
      lineCharts: Array,
      areaCharts: Array,
      barCharts: Array,
      pieCharts: Array,
      filters: Object,
      values: Object,
      computedValues: Object,
      savedData: Object,
      block: Object,
      showLine: Object,
      showArea: Object,
      showBar: Object,
      showPie: Object,
      showHeat: Object,
      usersData: Array,
      currentUser: Array,
      userData: Object,
      addUser: Function,
      changeCurrentUserData: Function,
      changeUserStatus: Function,
      deleteUser: Function,
      getSavedData: Function,
      sortType: String,
      sortTable: Function,
      sendTableFilters: Function,
      buttonOneIsPressed: Boolean,
      toDivide: Function,
      buttonTwoIsPressed: Boolean,
      exportTableToExcel: Function,
      switchTableType: Function,
      buttonThreeIsPressed: Boolean,
    },

    data: () => ({
      //...
    }),

    methods: {
      //...
    },
  }
</script>

<style scoped>
  .sortable .sortView {
    visibility: hidden;
  }

  .sortable {
    cursor:pointer;
  }

  .sortable:hover .sortView{
    visibility: visible;
  }
</style>
