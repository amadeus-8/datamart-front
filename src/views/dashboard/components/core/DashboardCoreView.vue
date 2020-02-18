<template>
  <v-content>
    <dashboard-core-drawer :filters="filters"
                           :values="values"></dashboard-core-drawer>
    <summary-tables :filters="filters"
                    :values="values"
                    :computedValues="computedValues"></summary-tables>
    <div class="text-center">
      <v-overlay :z-index="10000" v-show="values.isLoading">
        <v-progress-circular indeterminate size="80"></v-progress-circular>
      </v-overlay>
    </div>
  </v-content>
</template>

<script>
  import {axiosInstance as axios} from "../../../../plugins/axios";

  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreDrawer: () => import('./DashboardCoreDrawer'),
      SummaryTables: () =>  import('../../tables/SummaryTables'),
    },

    data: () => ({
      filters: {
        from_date: new Date('2019-01-01').toISOString().substr(0, 10),
        to_date: new Date('2019-01-30').toISOString().substr(0, 10),
        region_id: null,
        age_category: null,
        gender: null,
        insurance_class: null,
        vehicle_year_category: null,
        vehicle_type: null,
        referrer_id: null,
        department_id: null,
        sale_center_id: null,
        sale_channel_id: null,
        vehicle_model: null,
        vehicle_brand: null,
        status_id: null,
        columns: null,
        rows: null,
        values: 'vts_overall_sum',
      },

      values: {
        type: null,
        view: 'pivot',
        chart: [],
        view_type: [],
        isLoading: false,
      },

      computedValues: {
        kbms: [
          {
            name: 'M',
            value: 'М',
          },
          {
            name: '0',
            value: '0',
          },
          {
            name: '1',
            value: '1',
          },
          {
            name: '2',
            value: '2',
          },
          {
            name: '3',
            value: '3',
          },
          {
            name: '4',
            value: '4',
          },
          {
            name: '5',
            value: '5',
          },
          {
            name: '6',
            value: '6',
          },
          {
            name: '7',
            value: '7',
          },
          {
            name: '8',
            value: '8',
          },
          {
            name: '9',
            value: '9',
          },
          {
            name: '10',
            value: '10',
          },
          {
            name: '11',
            value: '11',
          },
          {
            name: '12',
            value: '12',
          },
          {
            name: '13',
            value: '13',
          },
          {
            name: 'ИП',
            value: 'ИП',
          },
        ],
        age_categories: [],
        clients_status: [],
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
            text: "Подразделение",
            value: "department"
          },
          {
            text: "Статус",
            value: 'status'
          }
        ],
        filter_values: [
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
          // {
          //   text: 'ГПО ВТС',
          //   value: 'ogpo_vts_count',
          // },
          {
            text: 'Премии др.продукты (Кросс + доброволки)',
            value: 'vts_cross_result',
          },
          {
            text: 'Сумма премий ВТС',
            value: 'vts_overall_sum',
          },
          // {
          //   text: 'Ср. чек общий (ГПО ВТС, кросс, доброволки)',
          //   value: 'avg_sum',
          // },
          // {
          //   text: 'Ср.чек кросс и доброволки',
          //   value: 'avg_cross_result',
          // },
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
      },
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
        this.computedValues.vehicle_year_categories = response;
      },
      setVehicleBrands(response) {
        this.computedValues.vehicle_brands = response;
      },
      setVehicleModels(response) {
        this.computedValues.vehicle_models = response;
      },

      getSellerFilters() {
        axios.get('/get_seller_filters').then((response) => {
          this.setReferrers(response.data.referrers);
          this.setDepartments(response.data.departments);
          this.setSaleChannels(response.data.sale_channels);
          this.setSaleCenters(response.data.sale_centers);
        });
      },
      setReferrers(response) {
        this.computedValues.referrers = response;
      },
      setDepartments(response) {
        this.computedValues.departments = response;
      },
      setSaleChannels(response) {
        this.computedValues.sale_channels = response;
      },
      setSaleCenters(response) {
        this.computedValues.sale_centers = response;
      },

      getClientsStatus() {
        axios.get('/get_clients_status').then(response => {
          this.setClientsStatus(response.data);
        });
      },
      setClientsStatus(response) {
        this.computedValues.clients_status = response;
      },

      getAgesCategory() {
        axios.get('/get_ages_category').then(response => {
          this.setAgesCategory(response.data);
        });
      },
      setAgesCategory(response) {
        this.computedValues.age_categories = response;
      },

      getComputedValues() {
        this.getSellerFilters();
        this.getVehicleFilters();
        this.getClientsStatus();
        this.getAgesCategory();
      }
    },

    mounted() {
      this.getComputedValues();
    }
  }
</script>
