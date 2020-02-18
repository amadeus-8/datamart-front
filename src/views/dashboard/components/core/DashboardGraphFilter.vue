<template>
  <div class="pa-4" style="background-color: #FFF; min-width: 500px;">
    <div class="d-flex justify-center mb-3">Фильтры</div>
    <v-flex xs12>
      <v-select :items="[{text: 'Не выбрано', value: 'ogpo_vts_result'}].concat(computedValues.filter_options)"
                label="Значения по оси X"
                item-text="text"
                item-value="value"
                v-model="filters.columns"></v-select>
    </v-flex>

    <v-flex xs12>
      <v-select :items="computedValues.filter_values"
                label="Значения"
                item-text="text"
                item-value="value"
                v-model="filters.values"></v-select>
    </v-flex>

    <v-divider class="mt-2 mb-2"/>

    <div class="d-flex justify-center mb-3">Дополнительные фильтры</div>

    <v-tabs v-model="tab"
            centered
            slider-color="yellow"
            dark>
      <v-tab v-for="(tab, i) in tabs"
             :key="i"
             :href="`#${tab.value}`">{{ tab.text }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :key="0" value="client">
        <v-card flat p-1>
          <div class="mt-2 text-xs-center body-2 text-uppercase sidebar-filter">Пол</div>
          <v-radio-group v-model="filters.gender" row>
            <v-radio label="М" value="М"></v-radio>
            <v-radio label="Ж" value="Ж"></v-radio>
            <v-radio label="Все"></v-radio>
          </v-radio-group>

          <v-select :items="[{name: 'Все', id: null}].concat(computedValues.age_categories)"
                    label="Категория возраста"
                    item-text="name"
                    item-value="id"
                    v-model="filters.age_category">
          </v-select>

          <v-select :items="[{name: 'Все', value: null}].concat(computedValues.kbms)"
                    label="КБМ"
                    item-text="name"
                    item-value="value"
                    v-model="filters.insurance_class">
          </v-select>

          <v-select :items="[{name: 'Все', id: null}].concat(computedValues.clients_status)"
                    label="Статус клиента"
                    item-text="name"
                    item-value="id"
                    v-model="filters.status_id">
          </v-select>
        </v-card>
      </v-tab-item>

      <v-tab-item :key="1" value="vehicle">
        <v-select :items="[{category: 'Все', id: null}].concat(computedValues.vehicle_year_categories)"
                  label="Категория"
                  item-text="category"
                  item-value="id"
                  v-model="filters.vehicle_year_category"></v-select>

        <v-select :items="[{name: 'Все', id: null}].concat(computedValues.vehicle_brands)"
                  label="Марка"
                  item-text="name"
                  item-value="id"
                  v-model="filters.vehicle_brand"></v-select>

        <v-select :items="[{name: 'Все', id: null}].concat(computedValues.vehicle_models)"
                  label="Модель"
                  item-text="name"
                  item-value="id"
                  item-brand-id="vehicle_brand_id"
                  v-model="filters.vehicle_model"
        ></v-select>
      </v-tab-item>

      <v-tab-item :key="2" value="seller">
        <v-select :items="[{name: 'Все', id: null}].concat(computedValues.sale_channels)"
                  label="Центр продаж"
                  item-text="name"
                  item-value="id"
                  v-model="filters.sale_channel_id"></v-select>

        <v-select :items="[{name: 'Все', id: null}].concat(computedValues.sale_centers)"
                  label="Канал продаж"
                  item-text="name"
                  item-value="id"
                  v-model="filters.sale_center_id"></v-select>

        <v-select :items="[{name: 'Все', id: null}].concat(computedValues.departments)"
                  label="Подразделение"
                  item-text="name"
                  item-value="id"
                  v-model="filters.department_id"></v-select>

        <v-select :items="[{name: 'Все', id: null}].concat(computedValues.referrers)"
                  label="Канал привлечения"
                  item-text="name"
                  item-value="id"
                  v-model="filters.referrer_id"></v-select>
      </v-tab-item>
    </v-tabs-items>
    <div class="d-flex justify-center">
      <v-btn small tile color="success" @click="sendChartFilters(type)">Применить</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DashboardTableFilter',

    props: {
      filters: Object,
      values: Object,
      computedValues: Object,
      type: String,
      sendChartFilters: Function,
    },

    data: () => ({
      tabs: [
        {
          text: 'Страхователь',
          value: 'client'
        },
        {
          text: 'ТС',
          value: 'vehicle'
        },
        {
          text: 'Источник продаж',
          value: 'seller'
        }
      ],
      tab: 'client'
    }),
  }
</script>
