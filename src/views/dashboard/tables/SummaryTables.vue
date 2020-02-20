<template>
  <v-container id="extended-tables"
               fluid
               tag="section">

    <div id="savedData" v-if="this.block.savedData">
      <!--dashboard-core-app-bar></dashboard-core-app-bar-->
      <h1>Saved Data</h1>
      <base-material-card color="success"
                          icon="mdi-clipboard-text"
                          inline
                          title="Сводная таблица"
                          class="px-5 py-3"
                          v-if="values.view_type.includes('pivot') || values.view_type.length == 0"
                          v-for="(pivot_table_result,key) in savedData.pivot_table_result">
        <div v-if="Object.keys(savedData.pivot_table_result).length > 0">
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
        </div>
      </base-material-card>

      <base-material-card color="success"
                          icon="mdi-clipboard-text"
                          inline
                          title="Сравнительная таблица"
                          class="px-5 py-3 mb-5"
                          v-if="values.view_type.includes('comparative')"
                          v-for="(comparative_table_result,key) in savedData.comparative_table_result">
        <div  v-if="Object.keys(savedData.comparative_table_result).length > 0">
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
        </div>
      </base-material-card>
      <!--div class="d-flex row">
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('line')">
          <base-material-card icon="mdi-earth" title="Линейная диаграмма">
            <apexchart  width="500" type="line" :options="lineChartOptions" :series="lineChartData" v-if="showLine"></apexchart >
            <div class="d-flex justify-end" v-if="showLine">
              <v-btn small color="success" @click="deleteCharts(lineChartData)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('area')">
          <base-material-card icon="mdi-earth" title="Секторная диаграмма">
            <apexchart  width="500" type="area" :options="areaChartOptions" :series="areaChartData" v-if="showArea"></apexchart >
            <div class="d-flex justify-end" v-if="showArea">
              <v-btn small color="success" @click="deleteCharts(areaChartData)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('bar')">
          <base-material-card icon="mdi-earth" title="Столбчатая диаграмма">
            <apexchart  width="500" type="bar"  :options="barChartOptions" :series="barChartData" v-if="showBar"></apexchart>
            <div class="d-flex justify-end" v-if="showBar">
              <v-btn small color="success" @click="deleteCharts(barChartData)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('pie')">
          <base-material-card icon="mdi-earth" title="Круговая диаграмма">
            <apexchart  width="500" type="pie" :options="pieChartOptions" :series="pieChartDatas.data" v-if="showPie"></apexchart>
            <div class="d-flex justify-end" v-if="showPie">
              <v-btn small color="success" @click="deleteCharts(pieChartData)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
      </div-->
    </div>

    <div id="newData" v-if="!this.block.savedData">
      <dashboard-core-app-bar></dashboard-core-app-bar>
      <base-material-card color="success"
                          icon="mdi-clipboard-text"
                          inline
                          title="Сводная таблица"
                          class="px-5 py-3"
                          v-if="values.view_type.includes('pivot')">
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
              <v-icon color="success" v-on="on" @click="changeType('pivot')">mdi-settings</v-icon>
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
        <div v-if="Object.keys(pivot_table_result).length > 0">
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
        </div>
      </base-material-card>

      <base-material-card color="success"
                          icon="mdi-clipboard-text"
                          inline
                          title="Сравнительная таблица"
                          class="px-5 py-3 mb-5"
                          v-if="values.view_type.includes('comparative')">
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
              <v-icon color="success" v-on="on"  @click="changeType('comparative')">mdi-settings</v-icon>
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
        <div v-if="Object.keys(comparative_table_result).length > 0">
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
        </div>
      </base-material-card>

      <div class="d-flex row">
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('line')">
          <base-material-card icon="mdi-earth"
                              title="Линейная диаграмма">
            <v-menu :close-on-content-click="false"
                    :nudge-right="40"
                    style="background-color: #FFFFFF"
                    transition="scale-transition"
                    offset-y>
              <dashboard-graph-filter :filters="filters"
                                      :values="values"
                                      :type="'line'"
                                      :sendChartFilters="sendChartFilters"
                                      :computedValues="computedValues"></dashboard-graph-filter>
              <template v-slot:activator="{ on }">
                <div class="d-flex justify-space-between">
                  <v-icon color="success" v-on="on" @click="changeType('line')">mdi-settings</v-icon>
                </div>
              </template>
            </v-menu>
            <apexchart  width="500" type="line" :options="lineChartOptions" :series="lineChartData" v-if="showLine"></apexchart >
            <div class="d-flex justify-end" v-if="showLine">
              <v-btn small color="success" @click="deleteCharts(lineChartData)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('area')">
          <base-material-card icon="mdi-earth"
                              title="Секторная диаграмма">
            <v-menu :close-on-content-click="false"
                    :nudge-right="40"
                    style="background-color: #FFFFFF"
                    transition="scale-transition"
                    offset-y>
              <dashboard-graph-filter :filters="filters"
                                      :values="values"
                                      :type="'area'"
                                      :sendChartFilters="sendChartFilters"
                                      :computedValues="computedValues"></dashboard-graph-filter>
              <template v-slot:activator="{ on }">
                <div class="d-flex justify-space-between">
                  <v-icon color="success" v-on="on" @click="changeType('area')">mdi-settings</v-icon>
                </div>
              </template>
            </v-menu>
            <apexchart  width="500" type="area" :options="areaChartOptions" :series="areaChartData" v-if="showArea"></apexchart >
            <div class="d-flex justify-end" v-if="showArea">
              <v-btn small color="success" @click="deleteCharts(areaChartData)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('bar')">
          <base-material-card icon="mdi-earth"
                              title="Столбчатая диаграмма">
            <v-menu :close-on-content-click="false"
                    :nudge-right="40"
                    style="background-color: #FFFFFF"
                    transition="scale-transition"
                    offset-y>
              <dashboard-graph-filter :filters="filters"
                                      :values="values"
                                      :type="'bar'"
                                      :sendChartFilters="sendChartFilters"
                                      :computedValues="computedValues"></dashboard-graph-filter>
              <template v-slot:activator="{ on }">
                <div class="d-flex justify-space-between">
                  <v-icon color="success" v-on="on" @click="changeType('bar')">mdi-settings</v-icon>
                </div>
              </template>
            </v-menu>
            <apexchart  width="500" type="bar"  :options="barChartOptions" :series="barChartData" v-if="showBar"></apexchart>
            <div class="d-flex justify-end" v-if="showBar">
              <v-btn small color="success" @click="deleteCharts(barChartData)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('pie')">
          <base-material-card icon="mdi-earth"
                              title="Круговая диаграмма">
            <v-menu :close-on-content-click="false"
                    :nudge-right="40"
                    style="background-color: #FFFFFF"
                    transition="scale-transition"
                    offset-y>
              <dashboard-graph-filter :filters="filters"
                                      :values="values"
                                      :type="'pie'"
                                      :sendChartFilters="sendChartFilters"
                                      :computedValues="computedValues"></dashboard-graph-filter>
              <template v-slot:activator="{ on }">
                <div class="d-flex justify-space-between">
                  <v-icon color="success" v-on="on" @click="changeType('pie')">mdi-settings</v-icon>
                </div>
              </template>
            </v-menu>
            <apexchart  width="500" type="pie" :options="pieChartOptions" :series="pieChartDatas.data" v-if="showPie"></apexchart>
            <div class="d-flex justify-end" v-if="showPie">
              <v-btn small color="success" @click="deleteCharts(pieChartData)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
        <!--div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('heatmap')">
          <base-material-card icon="mdi-earth"
                              title="Тепловая карта">
            <v-menu :close-on-content-click="false"
                    :nudge-right="40"
                    style="background-color: #FFFFFF"
                    transition="scale-transition"
                    offset-y>
              <dashboard-graph-filter :filters="filters"
                                      :values="values"
                                      :type="'heatmap'"
                                      :sendChartFilters="sendChartFilters"
                                      :computedValues="computedValues"></dashboard-graph-filter>
              <template v-slot:activator="{ on }">
                <div class="d-flex justify-space-between">
                  <v-icon color="success" v-on="on">mdi-settings</v-icon>
                </div>
              </template>
            </v-menu>
            <apexchart  width="500" type="heatmap" :options="heatChartOptions" :series="series" v-if="showHeat"></apexchart>
            <div class="d-flex justify-end" v-if="showHeat">
              <v-btn small color="success" @click="deleteCharts(heatChartData)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div-->
      </div>

    </div>

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
        computedValues: Object,
        savedData:Object,
        block:Object,
      },

      components: {
        DashboardCoreAppBar: () => import('../components/core/DashboardCoreAppBar'),
        DashboardCoreFooter: () => import('../components/core/DashboardCoreFooter'),
        DashboardGraphFilter: () => import('../components/core/DashboardGraphFilter'),
        DashboardTableFilter: () => import('../components/core/DashboardTableFilter'),
      },

      data: () => ({
        pieChartDatas:{
          data:null
        },
        series: [2, 4, 1, 2, 1, 1],

        comparative_table_result: [],
        pivot_table_result: [],

        buttonOneIsPressed: true,
        buttonTwoIsPressed: false,
        buttonThreeIsPressed: false,
        showButtonOne: true,
        showButtonTwo: true,
        showButtonThree: true,

        temp: [],

        lineChart: [],
        lineChartData: [],
        areaChartData: [],
        barChartData: [],
        pieChartData: [],
        heatChartData: [],

        lineChartOptions: {
          xaxis: {
            categories: [],
          }
        },
        areaChartOptions: {
          xaxis: {
            categories: [],
          }
        },
        barChartOptions: {
          dataLabels: {
            enabled: false
          },
          // plotOptions: {
          //   bar: {
          //     horizontal: true,
          //   }
          // },
          xaxis: {
            categories: [],
          }
        },
        pieChartOptions: {
          labels: [],
          // chartOptions: {
          //   chart: {
          //     width: 380,
          //     type: 'pie',
          //   },
          //   responsive: [{
          //     breakpoint: 480,
          //     options: {
          //       chart: {
          //         width: 200
          //       },
          //       legend: {
          //         position: 'bottom'
          //       }
          //     }
          //   }]
          // },
        },
        heatChartOptions: {
          xaxis: {
            categories: [],
          }
        },

        showLine: false,
        showArea: false,
        showBar: false,
        showPie: false,
        showHeat: false,
      }),

      methods: {
        changeType(value) {
          this.filters.query_type = value;
        },
        setIsLoading(value) {
          this.values.isLoading = value;
        },

        sendTableFilters(type) {
          switch (type) {
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

        },

        sendChartFilters(type) {
          switch(type) {
            case 'line':
              if(this.lineChartData.length === 3) return;
              break;
            case 'area':
              if(this.areaChartData.length === 3) return;
              break;
            case 'bar':
              if(this.barChartData.length === 3) return;
              break;
            case 'pie':
              if(this.pieChartData.length === 3) return;
              break;
            case 'heat':
              if(this.heatChartData.length === 3) return;
              break;
            default:
              break;
          }
          this.setIsLoading(true);
          axios.post('/get_chart_report', this.filters).then(response => {
            this.setChartOptions(type, response.data);
          })
        },

        setChartOptions(type, response) {
          var vm = this;
          switch (type) {
            case 'line':
              response.series.forEach(item => {
                if(item.value === vm.filters.values) vm.lineChartData.push(item);
              });
              this.lineChartOptions.xaxis.categories = response.xaxis;
              this.showLine = true;
              this.setIsLoading(false);
              break;
            case 'area':
              response.series.forEach(item => {
                if(item.value === vm.filters.values) vm.areaChartData.push(item);
              });
              this.areaChartOptions.xaxis.categories = response.xaxis;
              this.showArea = true;
              this.setIsLoading(false);
              break;
            case 'bar':
              response.series.forEach(item => {
                if(item.value === vm.filters.values) vm.barChartData.push(item);
              });
              this.barChartOptions.xaxis.categories = response.xaxis;
              this.showBar = true;
              this.setIsLoading(false);
              break;
            case 'pie':
              //console.log(response.series[0].data);
              vm.pieChartData.push(response.series[0].data);
              this.pieChartDatas.data = response.series[0].data;
              // response.series.forEach(item => {
              //   if(item.value === vm.filters.values) vm.pieChartData.push(item);
              // });
              this.pieChartOptions.labels = response.xaxis;
              this.showPie = true;
              this.setIsLoading(false);
              break;
            case 'heatmap':
              response.series.forEach(item => {
                if(item.value === vm.filters.values) vm.heatChartData = item.data;
              });
              this.heatChartOptions.xaxis = response.xaxis;
              this.showHeat = true;
              this.setIsLoading(false);
              break;
            default:
              break;
          }
        },

        deleteCharts(array) {
          if(array.length === 1) {
            if(array === this.lineChartData) {
              this.showLine = false;
              this.lineChartOptions.xaxis.categories = [];
              array.pop();
            }
            else if(array === this.areaChartData) {
              this.showArea = false;
              this.areaChartOptions.xaxis.categories = [];
              array.pop();
            }
            else if(array === this.barChartData) {
              this.showBar = false;
              this.barChartData.xaxis.categories = [];
              array.pop();
            }
            else if(array === this.pieChartData) {
              this.showPie = false;
              this.pieChartOptions.labels = [];
              array.pop();
            }
            else if(array === this.heatChartData) {
              this.showHeat = false;
              this.heatChartOptions.xaxis.categories = [];
              array.pop();
            }
            else return;
          }
          else {
            array.pop();
          }
        }
      },
    }
</script>

<style scoped>

</style>
