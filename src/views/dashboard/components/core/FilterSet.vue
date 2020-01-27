<template>
  <v-flex 12>
    <v-flex xs12>
      <div class="text-xs-center body-2 text-uppercase sidebar-filter">Фильтр 1</div>
      <v-select :items="[{text: 'Не выбрано', value: null}].concat(filter_options)"
                label="Фильтры"
                item-text="text"
                item-value="value"
                solo
                v-model="filters.filter_1"></v-select>
    </v-flex>

    <v-flex xs12>
      <div class="text-xs-center body-2 text-uppercase sidebar-filter">Фильтр 2</div>
      <v-select :items="[{text: 'Не выбрано', value: null}].concat(filter_options)"
                label="Фильтры"
                item-text="text"
                item-value="value"
                solo
                v-model="filters.filter_2"></v-select>
    </v-flex>

    <v-divider class="mt-2 mb-2"/>

    <div class="text-xs-center mb-3">Дополнительные фильтры</div>

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

          <v-select :items="age_categories"
                    label="Возраст"
                    v-model="filters.age_category">
          </v-select>

          <v-select :items="kbms"
                    label="Кбм"
                    v-model="filters.insurance_class">
          </v-select>
        </v-card>
      </v-tab-item>

      <v-tab-item :key="1" value="vehicle">
        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Год выпуска</div>
        <v-select :items="[{category: 'Все', id: null}].concat(vehicle_year_categories)"
                  label="Категория"
                  item-text="category"
                  item-value="id"
                  solo
                  v-model="filters.vehicle_year_category"></v-select>

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Марка</div>
        <v-select :items="[{name: 'Все', id: null}].concat(vehicle_brands)"
                  label="Марка"
                  item-text="name"
                  item-value="id"
                  solo
                  v-model="filters.vehicle_brand"></v-select>

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Модель</div>
        <v-select :items="[{name: 'Все', id: null}].concat(vehicle_models)"
                  label="Модель"
                  item-text="name"
                  item-value="id"
                  solo
                  v-model="filters.vehicle_model"></v-select>
      </v-tab-item>

      <v-tab-item :key="2" value="seller">
        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Канал продаж</div>
        <v-select :items="[{name: 'Все', id: null}].concat(sale_channels)"
                  label="Канал продаж"
                  item-text="name"
                  item-value="id"
                  solo
                  v-model="filters.sale_channel"></v-select>

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Центр продаж</div>
        <v-select :items="[{name: 'Все', id: null}].concat(sale_centers)"
                  label="Центра продаж"
                  item-text="name"
                  item-value="id"
                  solo
                  v-model="filters.sale_center"></v-select>

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Департамент</div>
        <v-select :items="[{name: 'Все', id: null}].concat(departments)"
                  label="Департамент"
                  item-text="name"
                  item-value="id"
                  solo
                  v-model="filters.department"></v-select>

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Канал привлечения</div>
        <v-select :items="[{name: 'Все', id: null}].concat(referrers)"
                  label="Канал привлечения"
                  item-text="name"
                  item-value="id"
                  solo
                  v-model="filters.referrer"></v-select>
      </v-tab-item>
    </v-tabs-items>
  </v-flex>
</template>

<script>
import {axiosInstance as axios} from "../../../../plugins/axios";

export default {
  name: 'FilterSet',

  props: {
    filters: Object,
  },

  data: () => ({
    kbms: ['все', 'М', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'ИП'],
    age_categories: ['все', 'младше 20', '20-25', '26-34', '35-44', '45-54', '55-64', 'старше 64'],
    vehicle_year_categories: [],
    referrers: [],
    departments: [],
    sale_centers: [],
    sale_channels: [],
    vehicle_models: [],
    vehicle_brands: [],

    filter_options: [
      {
        text: "Город",
        value: "region"
      },
      {
        text: "Возраст",
        value: "age"
      },
      {
        text: "Центр продаж",
        value: "sale_center"
      },
      {
        text: "Канал продаж",
        value: "sale_channel"
      },
      {
        text: "Канал привлечения",
        value: "referrer"
      },
      {
        text: "Агент",
        value: "agent"
      },
      {
        text: "Департамент",
        value: "department"
      },
      {
        text: "Подарки",
        value: "gift"
      }
    ],

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

  methods: {
    getVehicleFilters() {
      axios.get('/get_vehicle_filters').then((response) => {
        this.setVehicleYearCategories(response.data.year_categories);
        this.setVehicleBrands(response.data.brands);
        this.setVehicleModels(response.data.models);
      })
    },
    setVehicleYearCategories(response) {
      this.filter.vehicle_year_categories = response;
    },
    setVehicleBrands(response) {
      this.filter.vehicle_brands = response;
    },
    setVehicleModels(response) {
      this.filter.vehicle_models = response;
    },

    getSellerFilters() {
      axios.get('/get_seller_filters').then((response) => {
        this.setAgents(response.data.agents);
        this.setReferrers(response.data.referrers);
        this.setDepartments(response.data.departments);
        this.setSaleChannels(response.data.sale_channels);
        this.setSaleCenters(response.data.sale_centers);
      });
    },
    setAgents(response) {
      this.filter.agents = response;
    },
    setReferrers(response) {
      this.filter.referrers = response;
    },
    setDepartments(response) {
      this.filter.departments = response;
    },
    setSaleChannels(response) {
      this.filter.sale_channels = response;
    },
    setSaleCenters(response) {
      this.filter.sale_centers = response;
    },
  },

  beforeMount() {
    this.getSellerFilters();
    this.getVehicleFilters();
  }
}
</script>
