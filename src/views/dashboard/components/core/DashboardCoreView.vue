<template>
  <v-content>

    <div class="ml-lg-8 mt-5">
      <v-btn
        color="green"
        fab
        small
        @click.stop="drawer.drawer = !drawer.drawer"
      >
        <v-icon v-if="!drawer.drawer">
          mdi-view-quilt
        </v-icon>

        <v-icon v-else>
          mdi-dots-vertical
        </v-icon>
      </v-btn>
      <v-btn tile small outlined color="success active" @click="getSavedData()">Сохраненные данные</v-btn>
      <v-btn tile small outlined color="success" @click="clearSavedData()" >Витрина данных</v-btn>
      <v-btn tile small outlined color="success" v-if="currentUser.length == 0" @click="getUsers()" >Пользователи</v-btn>
      <v-btn tile small outlined color="error" v-if="currentUser.length != 0" @click="usersData = [],currentUser = []" >Закрыть раздел пользователей</v-btn>
    </div>

    <dashboard-core-drawer :filters="filters"
                           :values="values"
                            :block="block"
                            :getSavedData="getSavedData"
                            :usersData="usersData"
                            :getUsers="getUsers"
                            :drawer="drawer"></dashboard-core-drawer>
    <summary-tables :filters="filters"
                    :values="values"
                    :computedValues="computedValues"
                    :savedData="savedData"
                    :block="block"
                    :showLine = "showLine"
                    :showArea = "showArea"
                    :showBar = "showBar"
                    :showPie = "showPie"
                    :showHeat = "showHeat"
                    :comparative_table_results="comparative_table_results"
                    :pivot_table_results="pivot_table_results"
                    :lineCharts="lineCharts"
                    :areaCharts="areaCharts"
                    :barCharts="barCharts"
                    :pieCharts="pieCharts"
                    :usersData="usersData"
                    :userData="userData"
                    :addUser="addUser"
                    :changeUserStatus="changeUserStatus"
                    :deleteUser="deleteUser"
                    :currentUser="currentUser"
                    :changeCurrentUserData="changeCurrentUserData"
                    :getSavedData="getSavedData"
                    :drawer="drawer">

    </summary-tables>
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
      drawer: { drawer: null},
      pivot_table_results: [{
        pivot_table_result: []
      }],
      comparative_table_results: [{
        comparative_table_result: []
      }],
      lineCharts: [{
        lineChartData: [],
        lineChartOptions: {
          xaxis: {
            categories: [],
          }
        },
      }],
      areaCharts: [{
        areaChartData: [],
        areaChartOptions: {
          xaxis: {
            categories: [],
          }
        },
      }],
      barCharts: [{
        barChartData: [],
        barChartOptions: {
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: [],
          }
        },
      }],
      pieCharts: [{
        pieChartDatas: {
          data: '',
          name: '',
        },
        pieChartOptions: {
          labels: [],
        },
      }],
      usersData: [],
      currentUser: [],
      userData: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      showLine: {
        property: false
      },
      showArea: {
        property: false
      },
      showBar: {
        property: false
      },
      showPie: {
        property: false
      },
      showHeat: {
        property: false
      },

      savedData: {
        countOnPageItems: [
          {name: 'Вывести 3 записи', value: 3},
          {name: 'Вывести 10 записей', value: 10},
          {name: 'Вывести 20 записей', value: 20},
          {name: 'Вывести 100 записей', value: 100},
          {name: 'Вывести 1000 записей', value: 1000}
        ],
        countOnPage: 3,
        pivot_table_result: '',
        comparative_table_result: '',
        lineChartData: [],
        areaChartData: [],
        barChartData: [],
        pieChartData: [],
        pieChartDatas: [],
        heatChartData: [],
        lineChartOptions: [],
        areaChartOptions: {
          xaxis: {
            categories: [],
          }
        },
        barChartOptions: {
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: [],
          }
        },
        pieChartOptions: {
          labels: [],
          chart: {
            type: 'pie',
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
        heatChartOptions: {
          xaxis: {
            categories: [],
          }
        },
      },
      block: {
        savedData: false
      },
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
        query_type: '',
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
          { name: 'M', value: 'М', },
          { name: '0', value: '0',  },
          { name: '1', value: '1', },
          { name: '2', value: '2', },
          { name: '3', value: '3', },
          { name: '4', value: '4', },
          { name: '5', value: '5', },
          { name: '6', value: '6', },
          { name: '7', value: '7', },
          { name: '8', value: '8', },
          { name: '9', value: '9', },
          { name: '10', value: '10', },
          { name: '11', value: '11', },
          { name: '12', value: '12', },
          { name: '13', value: '13', },
          { name: 'ИП', value: 'ИП', },
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
          { text: "Город", value: "region" },
          { text: "Возраст", value: "age" },
          { text: "Центр продаж", value: "sale_center" },
          { text: "Канал продаж", value: "sale_channel" },
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
      getSavedData(){
        var lastElement = this.values.view_type.pop();
        this.values.view_type = [];
        this.values.view_type.push(lastElement);

        this.setLoading(true);
        if(this.values.view_type.length === 0 || this.values.view_type[0] === undefined){
          this.values.view_type.push('pivot');
        }

        for(var i=0; i < this.values.view_type.length;i++)
        {
          var countType = (this.values.view_type.length-1);
          if(i === countType) {
            var item = this.values.view_type[i];
            axios.post('/get_saved_data',
              {
                take: this.savedData.countOnPage,
                type: this.values.view_type[i],
                from_date: this.filters.from_date,
                to_date: this.filters.to_date
              }, item).then(response => {
              if (item === 'pivot') {
                this.setPivotTable(response.data);
              }
              if (item === 'comparative') {
                this.setComparativeTable(response.data);
              }
              if (item !== 'comparative' && item !== 'pivot') {
                this.setChartOptions(item, response.data);
              }
              this.block.savedData = true;
            }).catch(error => {
              alert(error);
              this.setLoading(false);
            });
          } else {
            delete this.values.view_type[i];
          }
        }
      },
      clearSavedData(){
        this.block.savedData = false;
        this.values.view_type = [];
        this.savedData.pivot_table_result = '';
        this.savedData.comparative_table_result = '';
        this.savedData.lineChartData = [];
        this.savedData.lineChartOptions = [];
        this.savedData.areaChartData = [];
        this.savedData.areaChartOptions = [];
        this.savedData.barChartData = [];
        this.savedData.barChartOptions = [];
        this.savedData.pieChartDatas = [];
        this.savedData.pieChartOptions = [];
      },
      setPivotTable(response) {
        this.savedData.pivot_table_result = response;
        this.setLoading(false);
      },
      setComparativeTable(response) {
        this.savedData.comparative_table_result = response;
        this.setLoading(false);
      },

      setChartOptions(type, response) {
        var vm = this;
        switch (type) {
          case 'line':
            vm.savedData.lineChartData = [];
            vm.savedData.lineChartOptions = [];
            response.forEach(item => {
              var xaxisData = null;
              item.series.forEach(items => {
                  vm.savedData.lineChartData.push([items]);
              });

              xaxisData = {
                xaxis: {
                  categories: item.xaxis
                }
              }
              vm.savedData.lineChartOptions.push(xaxisData);
            });
             this.showLine.property = true;
            this.setLoading(false);
            break;
          case 'area':
            vm.savedData.areaChartData = [];
            vm.savedData.areaChartOptions = [];
            response.forEach(item => {
              item.series.forEach(items => {
                vm.savedData.areaChartData.push([items]);
              });
              var xaxisData = {
                xaxis: {
                  categories: item.xaxis
                }
              }
              this.savedData.areaChartOptions.push(xaxisData);
            });
            this.showArea.property = true;
            this.setLoading(false);
            break;
          case 'bar':
            vm.savedData.barChartData = [];
            vm.savedData.barChartOptions = [];
            response.forEach(item => {
              item.series.forEach(items => {
                vm.savedData.barChartData.push([items]);
              });
              var xaxisData = {
                dataLabels: {
                  enabled: false
                },
                xaxis: {
                  categories: item.xaxis
                }
              }
              this.savedData.barChartOptions.push(xaxisData);
            });
            this.showBar.property = true;
            this.setLoading(false);
            break;
          case 'pie':
            vm.savedData.pieChartDatas = [];
            vm.savedData.pieChartOptions = [];
            response.forEach(item => {
              item.series.forEach(items => {
                var data = {
                  data: items.data,
                  name: items.name
                }
                vm.savedData.pieChartDatas.push(data);
              });
              var xaxisData = {  labels: item.xaxis }
              this.savedData.pieChartOptions.push(xaxisData);
            });

            this.showPie.property = true;
            this.setLoading(false);
            break;
          default:
            break;
        }
      },
      setLoading(value) {
        this.values.isLoading = value;
      },
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
      },
      getUsers(dontClose = null) {
        if(this.usersData.length === 0 || this.usersData.length !== 0 && dontClose != null) {
          this.setLoading(true);
          axios.post('/get_users').then((response) => {
            if (response.data.success) {
              if(response.data.result != null) {
                this.usersData = response.data.result;
              } else {
                this.usersData = [];
              }
              this.currentUser.push(response.data.currentUser);
            } else {
              this.usersData = [];
              if(response.data.error != '') {
                alert(response.data.error);
              }
              // if(response.data.errorCurrentUser != '') {
              //   alert(response.data.errorCurrentUser);
              // }
            }
            this.setLoading(false);
          });
        } else {
          this.usersData = [];
          this.setLoading(false);
        }
      },
      addUser() {
        if(this.userData.name == '' || this.userData.email == '' || this.userData.password == '' || this.userData.confirmPassword == ''){
          alert('Заполните пожалуйста все поля');
          this.setLoading(false);
          return false;
        }
        if(this.userData.password === this.userData.confirmPassword) {
          this.setLoading(true);
          axios.post('/add_user', this.userData).then((response) => {
            if (response.data.success) {
              alert('Пользователь успешно добавлен');
              this.userData.name = '';
              this.userData.email = '';
              this.userData.password = '';
              this.userData.confirmPassword = '';
              this.getUsers(1);
            } else {
              if (response.data.error != '') {
                alert(response.data.error);
                this.setLoading(false);
              } else {
                this.setLoading(false);
                alert('Ошибка! Обратитесь пожалуйста к системному администратору');
              }
            }
          });
        } else {
          alert('Пароли не совпадают');
        }
      },
      changeUserStatus(id) {
        this.setLoading(true);
        axios.post('/change_status',{ id:id }).then((response) => {
          if(response.data.success){
            this.getUsers(1);
            //alert('Статус успешно сменен');
          } else {
            this.setLoading(false);
            alert('Ошибка');
          }
        });
      },
      changeCurrentUserData(){
        if(this.currentUser[0].name == '' || this.currentUser[0].email == '' || this.currentUser[0].password == '' || this.currentUser[0].confirmPassword == ''){
          alert('Заполните пожалуйста все данные');
        } else {
          if(this.currentUser[0].password === this.currentUser[0].confirmPassword) {
            this.setLoading(true);
            axios.post('/change_user_data', {user: this.currentUser[0]}).then((response) => {
              if (response.data.success) {
                alert('Данные успешно изменены');
                this.setLoading(false);
              } else {
                this.setLoading(false);
                alert('Ошибка записи в базу данных');
              }
            });
          } else {
            alert('Пароли не совпадают');
          }
        }
      },
      deleteUser(id){
        this.setLoading(true);
        axios.post('/delete_user',{ id:id }).then((response) => {
          if(response.data.success){
            this.getUsers(1);
            //alert('Пользователь успешно удален');
          } else {
            this.setLoading(false);
            alert('Ошибка удаления');
          }
        });
      }
    },

    mounted() {
      this.getComputedValues();
    }
  }
</script>
