<template>
  <v-container id="extended-tables"
               fluid
               tag="section">
    <v-btn
      color="pink"
      dark
      @click.stop="drawer.drawer = !drawer.drawer"
    >
      Toggle
    </v-btn>

    <base-material-card  v-if="currentUser.length > 0" color="success" icon="mdi-clipboard-text" inline title="Пользователи" class="px-5 py-3">
      <!--  Текущии пользователь  -->
      <div class="mt-6">
        <h3>Ваши данные</h3>
        <v-row>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              label="Имя"
              v-model="currentUser[0].name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              label="Email"
              v-model="currentUser[0].email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              type="password"
              label="Пароль"
              v-model="currentUser[0].password"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="2">
            <v-text-field
              type="password"
              label="Повторите пароль"
              v-model="currentUser[0].confirmPassword"
            ></v-text-field>
          </v-col>
          <v-col class="text-center" cols="12" sm="4" md="4">
            <v-btn class="mt-5" tile small outlined color="success" @click="changeCurrentUserData()">
              Сохранить изменения
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <!--  Конец текущии пользователь  -->

      <!--  Все пользователи  -->
      <div class="mt-6" v-if="usersData.length > 0">
        <h3>Список пользователей</h3>
        <div>
          <v-row>
            <v-col cols="12" sm="4" md="2">
              <v-text-field
                label="Имя"
                v-model="userData.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="2">
              <v-text-field
                label="Email"
                v-model="userData.email"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="2">
              <v-text-field
                type="password"
                label="Пароль"
                v-model="userData.password"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="2">
              <v-text-field
                type="password"
                label="Повторите пароль"
                v-model="userData.confirmPassword"
              ></v-text-field>
            </v-col>
            <v-col class="text-center" cols="12" sm="4" md="4">
              <v-btn class="mt-5" tile small outlined color="success" @click="addUser()">
                Добавить пользователя
              </v-btn>
            </v-col>
          </v-row>

          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">№</th>
                <th class="text-left">Имя</th>
                <th class="text-left">Email</th>
                <th class="text-left">Статус</th>
                <th class="text-center">Действие</th>
                <th class="text-center">Удаление</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="u,key in usersData">
                <td>{{ key+1 }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.email }}</td>
                <td>
                  <span v-if="u.status == 1">Админ</span>
                  <span v-else>Пользователь</span>
                </td>
                <td class="text-center">
                  <v-btn tile small outlined color="success active" v-if="u.status == 1" @click="changeUserStatus(u.id)">
                    Сделать пользователем
                  </v-btn>
                  <v-btn tile small outlined color="success active" v-else @click="changeUserStatus(u.id)">
                    Сделать админом
                  </v-btn>
                </td>
                <td class="text-center">
                  <v-btn tile small outlined color="error active" @click="deleteUser(u.id)">
                    Удалить
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
      <!--  Конец все пользователи  -->

    </base-material-card>

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
      <!--v-row>
        <v-col cols="12" sm="6" md="3">
          <h1 class="mt-3">Сохраненные данные</h1>
        </v-col>
        <v-col cols="9" sm="2" md="2">
          <v-text-field label="Количество на странице" v-model="savedData.countOnPage"></v-text-field>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <v-btn class="mt-5" tile small outlined color="success" @click="getSavedData()">
            обновить
          </v-btn>
        </v-col>
      </v-row-->
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

    <div id="newData" v-if="!this.block.savedData">
      <h1>Витрина данных</h1>

      <v-btn tile small outlined color="success" v-for="key in values.view_type" class="mt-3" @click="addView(key)" >
        Добавить {{ getFilterTypeTitle[key] }}
      </v-btn>

      <base-material-card color="success" icon="mdi-clipboard-text" inline title="Сводная таблица" class="px-5 py-3" v-if="values.view_type.includes('pivot')" v-for="items,key in pivot_table_results">
        <v-flex xs12>
          <v-select :items="computedValues.filter_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    v-model="filters.values"
                    v-if="Object.keys(items.pivot_table_result).length > 0">
          </v-select>
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
                                  :id="key"
                                  :computedValues="computedValues">
          </dashboard-table-filter>
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
        <div v-if="Object.keys(items.pivot_table_result).length > 0">
          <v-simple-table :id="'pivotTable-'+key">
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">{{ items.pivot_table_result.property }}</th>
                <th v-for="(item) in items.pivot_table_result.labels" v-if="items.pivot_table_result.labels.length > 0">{{ item }}</th>
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
              <tr v-for="(item, key) in items.pivot_table_result.data">
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
            <v-btn tile small color="success" class="mr-0" @click="exportTableToExcel('pivotTable-'+key)">
              <v-icon small color="white" class="mr-1">mdi-arrow-down-bold-box-outline</v-icon>
              <span>Скачать</span>
            </v-btn>
          </div>
        </div>

        <div class="d-flex justify-end mt-2 pr-0">
          <v-btn small color="success" class="mr-0" @click="deleteView('pivot',key)">Удалить</v-btn>
        </div>

      </base-material-card>

      <base-material-card color="success"
                          icon="mdi-clipboard-text"
                          inline
                          title="Сравнительная таблица"
                          class="px-5 py-3 mb-5"
                          v-if="values.view_type.includes('comparative')"
                          v-for="items,key in comparative_table_results">
        <v-flex xs12>
          <v-select :items="computedValues.filter_values"
                    label="Значения"
                    item-text="text"
                    item-value="value"
                    v-model="filters.values"
                    v-if="Object.keys(items.comparative_table_result).length > 0"></v-select>
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
                                  :id="key"
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
        <div v-if="Object.keys(items.comparative_table_result).length > 0">
          <v-simple-table :id="'comparativeTable-'+key">
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">{{ items.comparative_table_result.property }}</th>
                <th v-for="(item) in items.comparative_table_result.labels">{{ item }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, key) in items.comparative_table_result.data">
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
                <td v-for="(item,key) in items.comparative_table_result.bottomData[0]" v-if="key == filters.values">
                  <span v-if="item == null">0</span>
                  <span v-else>{{ item.toLocaleString() }}</span>
                </td>
                <td>
                  100%
                </td>
                <td v-for="(item,key) in items.comparative_table_result.bottomData[1]" v-if="key == filters.values">
                  <span v-if="item == null">0</span>
                  <span v-else>{{ item.toLocaleString() }}</span>
                </td>
                <td>
                  100%
                </td>
                <td v-for="(item,key) in items.comparative_table_result.bottomData[2]" v-if="key == filters.values">
                  <span v-if="item == null">0</span>
                  <span v-else>{{ item.toLocaleString() }}%</span>
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

        <div class="d-flex justify-end mt-2 pr-0">
          <v-btn small color="success" class="mr-0" @click="deleteView('comparative',key)">Удалить</v-btn>
        </div>

      </base-material-card>

      <div class="d-flex row">
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('line')" v-for="items,key in lineCharts">
          <base-material-card icon="mdi-earth" title="Линейная диаграмма">
            <v-menu :close-on-content-click="false" :nudge-right="40" style="background-color: #FFFFFF" transition="scale-transition" offset-y>
              <dashboard-graph-filter
                :filters="filters"
                :values="values"
                :type="'line'"
                :id="key"
                :sendChartFilters="sendChartFilters"
                :computedValues="computedValues">
              </dashboard-graph-filter>
              <template v-slot:activator="{ on }">
                <div class="d-flex justify-space-between">
                  <v-icon color="success" v-on="on" @click="changeType('line')">mdi-settings</v-icon>
                </div>
              </template>
            </v-menu>
            <div class="mt-3 mb-3 font-weight-bold" v-if="showLine.property && Object.keys(items.lineChartData).length > 0">
              Показаны значения - {{ items.lineChartData[0].name }}
            </div>
            <apexchart  width="500" type="line" :options="items.lineChartOptions" :series="items.lineChartData" v-if="showLine.property && Object.keys(items.lineChartData).length > 0">
            </apexchart >

            <div class="d-flex justify-end mt-2 pr-0">
              <v-btn small color="success" class="mr-0" @click="deleteView('line',key)">Удалить</v-btn>
            </div>

          </base-material-card>
        </div>
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('area')" v-for="items,key in areaCharts">
          <base-material-card icon="mdi-earth" title="Секторная диаграмма">
            <v-menu :close-on-content-click="false"
                    :nudge-right="40"
                    style="background-color: #FFFFFF"
                    transition="scale-transition"
                    offset-y>
              <dashboard-graph-filter :filters="filters"
                                      :values="values"
                                      :type="'area'"
                                      :id="key"
                                      :sendChartFilters="sendChartFilters"
                                      :computedValues="computedValues"></dashboard-graph-filter>
              <template v-slot:activator="{ on }">
                <div class="d-flex justify-space-between">
                  <v-icon color="success" v-on="on" @click="changeType('area')">mdi-settings</v-icon>
                </div>
              </template>
            </v-menu>
            <div class="mt-3 mb-3 font-weight-bold" v-if="showArea.property && Object.keys(items.areaChartData).length > 0">Показаны значения - {{ items.areaChartData[0].name }}</div>
            <apexchart  width="500" type="area" :options="items.areaChartOptions" :series="items.areaChartData" v-if="showArea.property && Object.keys(items.areaChartData).length > 0"></apexchart >
            <div class="d-flex justify-end mt-2 pr-0">
              <v-btn small color="success" class="mr-0" @click="deleteView('area',key)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
        <div class="ml-4 mr-4 pt-2 pb-2" v-if="values.view_type.includes('bar')" v-for="items,key in barCharts">
          <base-material-card icon="mdi-earth" title="Столбчатая диаграмма">
            <v-menu :close-on-content-click="false"
                    :nudge-right="40"
                    style="background-color: #FFFFFF"
                    transition="scale-transition"
                    offset-y>
              <dashboard-graph-filter :filters="filters"
                                      :values="values"
                                      :type="'bar'"
                                      :id="key"
                                      :sendChartFilters="sendChartFilters"
                                      :computedValues="computedValues"></dashboard-graph-filter>
              <template v-slot:activator="{ on }">
                <div class="d-flex justify-space-between">
                  <v-icon color="success" v-on="on" @click="changeType('bar')">mdi-settings</v-icon>
                </div>
              </template>
            </v-menu>
            <div class="mt-3 mb-3 font-weight-bold" v-if="showBar.property && Object.keys(items.barChartData).length > 0">
              Показаны значения - {{ items.barChartData[0].name }}
            </div>
            <apexchart  width="500" type="bar"  :options="items.barChartOptions" :series="items.barChartData" v-if="showBar.property && Object.keys(items.barChartData).length > 0"></apexchart>
            <div class="d-flex justify-end mt-2 pr-0">
              <v-btn small color="success" class="mr-0" @click="deleteView('bar',key)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
        <div class="ml-4 mr-4 pt-2 pb-2">
          <base-material-card icon="mdi-earth" title="Круговая диаграмма" v-if="values.view_type.includes('pie')"  v-for="items,key in pieCharts">
            <v-menu :close-on-content-click="false"
                    :nudge-right="40"
                    style="background-color: #FFFFFF"
                    transition="scale-transition"
                    offset-y>
              <dashboard-graph-filter :filters="filters"
                                      :values="values"
                                      :type="'pie'"
                                      :id="key"
                                      :sendChartFilters="sendChartFilters"
                                      :computedValues="computedValues">
              </dashboard-graph-filter>
              <template v-slot:activator="{ on }">
                <div class="d-flex justify-space-between">
                  <v-icon color="success" v-on="on" @click="changeType('pie')">mdi-settings</v-icon>
                </div>
              </template>
            </v-menu>
            <div class="mt-3 mb-3 font-weight-bold" v-if="showPie.property && items.pieChartDatas.data != undefined && items.pieChartDatas.data != ''">Показаны значения - {{ items.pieChartDatas.name }}</div>
            <apexchart  width="500" type="pie" :options="items.pieChartOptions" :series="items.pieChartDatas.data" v-if="showPie.property && items.pieChartDatas.data != undefined && items.pieChartDatas.data != ''"></apexchart>
            <div class="d-flex justify-end mt-2 pr-0">
              <v-btn small color="success" class="mr-0" @click="deleteView('pie',key)">Удалить</v-btn>
            </div>
          </base-material-card>
        </div>
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
      },

      components: {
        DashboardCoreAppBar: () => import('../components/core/DashboardCoreAppBar'),
        DashboardCoreFooter: () => import('../components/core/DashboardCoreFooter'),
        DashboardGraphFilter: () => import('../components/core/DashboardGraphFilter'),
        DashboardTableFilter: () => import('../components/core/DashboardTableFilter'),
      },

      data: () => ({
        test:'',
        series: [2, 4, 1, 2, 1, 1],
        buttonOneIsPressed: true,
        buttonTwoIsPressed: false,
        buttonThreeIsPressed: false,
        showButtonOne: true,
        showButtonTwo: true,
        showButtonThree: true,
        temp: [],
        getFilterTypeTitle: {
            'pivot' : 'сводную таблицу',
            'comparative' : 'сравнительную таблицу',
            'line' : 'линейную диаграмму',
            'area' : 'секторную диаграмму',
            'bar' : 'столбчатую диаграмму',
            'pie' : 'круговую диаграмму'
        }
      }),

      methods: {
        changeType(value) {
          this.filters.query_type = value;
        },
        setIsLoading(value) {
          this.values.isLoading = value;
        },
        sendTableFilters(type, id = 0) {
          switch (type) {
            case "comparative":
              this.setIsLoading(true);
              axios.post('/get_comparative_report', this.filters, id).then(response => {
                this.setComparativeTableData(response.data, id);
              }).catch(error => {
                alert(error);
                this.setIsLoading(false);
              });
              break;
            case "pivot":
              this.setIsLoading(true);
              axios.post('/get_pivot_report', this.filters, id).then(response => {
                this.setPivotTableData(response.data, id);
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
        setComparativeTableData(response, id) {
          this.comparative_table_results[id].comparative_table_result = response;
          this.setIsLoading(false);
          this.clearFilter();
        },
        setPivotTableData(response, id) {
          this.pivot_table_results[id].pivot_table_result = response;
          this.setIsLoading(false);
          this.clearFilter();
        },

        exportTableToExcel(tableID, filename = '') {
          var downloadLink;
          //var dataType = 'application/vnd.ms-excel';
          var tableSelect = document.getElementById(tableID);
          //var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

          var tableHTML = tableSelect.outerHTML;
          tableHTML = tableHTML+'<div><br><b>Указанные значения - '+this.getLabels(this.filters.values)+'</b></div>';
          var dataType = 'data:application/vnd.ms-excel,' + '\uFEFF' + encodeURIComponent(tableHTML);

          // Specify file name
          filename = filename ? filename + '.xls' : 'excel_data.xls';

          // Create download link element
          downloadLink = document.createElement("a");

          document.body.appendChild(downloadLink);

          if(navigator.msSaveOrOpenBlob){
            var blob = new Blob(['\ufeff', encodeURIComponent(tableHTML)], {
              type: dataType
            });
            navigator.msSaveOrOpenBlob( blob, filename);
          }
          else {
            // Create a link to the file
            //downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            downloadLink.href = dataType;

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
            'kommesk_comfort_count': 'Коммеск-Комфорт',
            'tour_count': 'ВЗР (все из узла страхование путеш-в)',
          };
          for(let name in labels) {
            if(name === label) return labels[name];
          }
        },

        sendChartFilters(type,id) {
          switch(type) {
            case 'line':
                this.showLine.property = false;
              break;
            case 'area':
                this.showArea.property = false;
              break;
            case 'bar':
                this.showBar.property = false;
              break;
            case 'pie':
                this.showPie.property = false;
              break;
            case 'heat':
                this.showHeat.property = false;
              break;
            default:
              break;
          }
          this.setIsLoading(true);
          axios.post('/get_chart_report', this.filters,id).then(response => {
            this.setChartOptions(type, response.data,id);
          })
        },

        setChartOptions(type, response, id) {
          var vm = this;
          switch (type) {
            case 'line':
              response.series.forEach(item => {
                if (item.value === vm.filters.values) vm.lineCharts[id].lineChartData[0] = item; // push
              });
              this.lineCharts[id].lineChartOptions.xaxis.categories = response.xaxis;
              this.showLine.property = true;
              this.setIsLoading(false);
              this.clearFilter();
              break;
            case 'area':
              response.series.forEach(item => {
                if (item.value === vm.filters.values) vm.areaCharts[id].areaChartData[0] = item;  //push
              });
              this.areaCharts[id].areaChartOptions.xaxis.categories = response.xaxis;
              this.showArea.property = true;
              this.setIsLoading(false);
              this.clearFilter();
              break;
            case 'bar':
              response.series.forEach(item => {
                if (item.value === vm.filters.values) vm.barCharts[id].barChartData[0] = item;   //push
              });
              this.barCharts[id].barChartOptions.xaxis.categories = response.xaxis;
              this.showBar.property = true;
              this.setIsLoading(false);
              this.clearFilter();
              break;
            case 'pie':
              this.pieCharts[id].pieChartOptions.labels = response.xaxis;
              this.pieCharts[id].pieChartDatas.data = response.series[0].data;
              this.pieCharts[id].pieChartDatas.name = response.series[0].name;
              this.showPie.property = true;
              this.setIsLoading(false);
              this.clearFilter();
              break;
            default:
              break;
          }
        },
        clearFilter(){
          this.filters.region_id = null;
          this.filters.age_category = null;
          this.filters.gender = null;
          this.filters.insurance_class = null;
          this.filters.vehicle_year_category = null;
          this.filters.vehicle_type = null;
          this.filters.referrer_id = null;
          this.filters.department_id = null;
          this.filters.sale_center_id = null;
          this.filters.sale_channel_id = null;
          this.filters.vehicle_model = null;
          this.filters.vehicle_brand = null;
          this.filters.status_id = null;
          //this.filters.columns = null;
          //this.filters.rows = null;
          //this.filters.values = 'vts_overall_sum';
          this.filters.query_type = '';
        },
        addView (type) {
          switch (type) {
          case 'pivot':
            this.pivot_table_results.push({ pivot_table_result:[] });
            break;
          case 'comparative':
            this.comparative_table_results.push({ comparative_table_result:[] });
            break;
          case 'line':
            var data = { lineChartData:[], lineChartOptions: { xaxis: { categories: [], } } };
            this.lineCharts.push(data);
            break;
          case 'area':
            var data = { areaChartData:[], areaChartOptions: { xaxis: { categories: [], } } };
            this.areaCharts.push(data);
            break;
          case 'bar':
            var data = { barChartData:[], barChartOptions: {  dataLabels: { enabled: false }, xaxis: { categories: [], } } };
            this.barCharts.push(data);
            break;
          case 'pie':
            var data = { pieChartDatas: { data: '',  name: '', }, pieChartOptions: { labels: [], }, };
            this.pieCharts.push(data);
            break;
          }
        },
        deleteView(type, id){
          this.setIsLoading(true);
          if(type === 'pivot'){
            this.pivot_table_results.splice(id,1);
            this.setIsLoading(false);
          } else if(type === 'comparative'){
            this.comparative_table_results.splice(id,1);
            this.setIsLoading(false);
          } else if(type === 'line'){
            this.lineCharts.splice(id,1);
            this.setIsLoading(false);
          } else if(type === 'area'){
            this.areaCharts.splice(id,1);
            this.setIsLoading(false);
          } else if(type === 'bar'){
            this.barCharts.splice(id,1);
            this.setIsLoading(false);
          } else if(type === 'pie'){
            this.pieCharts.splice(id,1);
            this.setIsLoading(false);
          }
        },
      },
    }
</script>

<style scoped>

</style>
