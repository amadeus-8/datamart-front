<template>
  <v-navigation-drawer id="core-navigation-drawer"
                       dark
                       mobile-break-point="960"
                       app
                       width="260"
                       v-bind="$attrs">

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-uppercase font-weight-regular display-2">
          <span class="logo-normal">Datamart</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <base-item-group :item="profile" />
    </v-list>

    <v-divider class="mb-2" />

    <v-list expand nav>
      <template v-for="(item, i) in computedItems">
        <base-item-group v-if="item.children"
                         :key="`group-${i}`"
                         :item="item">
        </base-item-group>
        <base-item v-else
                   :key="`item-${i}`"
                   :item="item"/>
      </template>
    </v-list>

    <v-list class="pl-3 pr-3 pt-0 pb-0">
      <v-flex xs12>
        <div class="text-xs-center mt-2 pl-2 pb-2 body-2 text-uppercase sidebar-filter">Регионы</div>
        <v-select :items="[{name: 'Все', id: null}].concat(regions)"
                  label="Регионы"
                  item-text="name"
                  class="box-shadow-none"
                  item-value="id"
                  solo-inverted
                  v-model="filters.region_id"
        ></v-select>
      </v-flex>
    </v-list>

    <v-list class="pl-3 pr-3 pt-0 pb-0">
      <div class="text-xs-center pl-2 pb-2 body-2 text-uppercase sidebar-filter">Период</div>
      <v-menu v-model="from_menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field v-model="filters.from_date"
                        label="Дата начала"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="filters.from_date"
                       @input="from_menu = false"
                       locale="ru-ru"></v-date-picker>
      </v-menu>

      <v-menu v-model="to_menu"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px">
        <template v-slot:activator="{ on }">
          <v-text-field v-model="filters.to_date"
                        label="Дата окончания"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="filters.to_date"
                       locale="ru-ru"
                       @input="to_menu = false"></v-date-picker>
      </v-menu>
    </v-list>

    <v-list class="pl-3 pr-3 pt-0 pb-0">
      <div class="text-xs-center pl-2 pb-2 body-2 text-uppercase sidebar-filter">Таблицы</div>
      <v-select :items="[{text: 'Не выбрано', value: null}].concat(tables)"
                label="Таблицы"
                item-text="text"
                item-value="value"
                solo-inverted
                v-model="values.view"></v-select>
    </v-list>

    <v-list class="pl-3 pr-3 pt-0 pb-0">
      <div class="text-xs-center pl-2 pb-2 body-2 text-uppercase sidebar-filter">Графики</div>
      <v-select :items="charts"
                label="Графики"
                item-text="text"
                item-value="value"
                multiple
                solo-inverted
                chips
                v-model="values.chart"></v-select>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {axiosInstance as axios} from "../../../../plugins/axios";
  import {
    mapState,
    mapActions
  } from 'vuex';

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      filters: Object,
      values: Object,
    },

    data: () => ({
      from_menu: false,
      to_menu: false,
      drawer: true,

      tables: [
        {
          text: "Сводная таблица",
          value: "pivot"
        },
        {
          text: "Сравнительная таблица",
          value: "comparative"
        },
      ],

      charts: [
        {
          text: "Линейная диаграмма",
          value: "line"
        },
        {
          text: "Секторная диаграмма",
          value: "area"
        },
        {
          text: "Столбчатая диаграмма",
          value: "bar"
        },
        {
          text: "Круговая диаграмма",
          value: "pie"
        },
        {
          text: "Интерактивная кольцевая диаграмма",
          value: "donut"
        },
        {
          text: "Диаграмма рассеяния",
          value: "scatter"
        },
        {
          text: "Пузырьковая диаграмма",
          value: "bubble"
        },
        {
          text: "Тепловая карта",
          value: "heatmap"
        },
        {
          text: "Радиальная диаграмма",
          value: "radialBar"
        },
        {
          text: "Диаграмма подвсечника",
          value: "candlestick"
        },
      ],

      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/'
        }
      ],

      regions: [],
    }),

    beforeMount() {
      this.getRegions();
    },

    computed: {
      ...mapState('auth', ['user']),

      computedItems() {
        return this.items.map(this.mapItem)
      },
      profile() {
        return {
          avatar: false,
          group: '',
          title: this.user,
          children: [
            {
              click: this._logout,
              title: 'Выход'
            }
          ]
        }
      }
    },

    methods: {
      ...mapActions('auth', ['logout']),
      mapItem(item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title)
        }
      },
      _logout() {
        this.logout().then((response) => {
          if(response) this.$router.push({ name: 'Login' });
        });
      },

      getRegions() {
        axios.get('/get_regions').then((response) => {
          this.setRegions(response.data);
        });
      },
      setRegions(response) {
        this.regions = response;
      },
    }
  }
</script>

<style>
  .box-shadow-none {
    box-shadow: none !important;
  }
</style>

<!--<style lang="sass">-->
<!--  @import '~vuetify/src/styles/tools/_rtl.sass'-->

<!--  #core-navigation-drawer-->
<!--    &.v-navigation-drawer&#45;&#45;mini-variant-->
<!--      .v-list-item-->
<!--        justify-content: flex-start !important-->

<!--      .v-list-group&#45;&#45;sub-group-->
<!--        display: block !important-->

<!--    .v-list-group__header.v-list-item&#45;&#45;active:before-->
<!--      opacity: .24-->

<!--    .v-list-item-->
<!--      &__icon&#45;&#45;text,-->
<!--      &__icon:first-child-->
<!--        justify-content: center-->
<!--        text-align: center-->
<!--        width: 20px-->

<!--        +ltr()-->
<!--          margin-right: 24px-->
<!--          margin-left: 12px !important-->

<!--        +rtl()-->
<!--          margin-left: 24px-->
<!--          margin-right: 12px !important-->

<!--    .v-list&#45;&#45;dense-->
<!--      .v-list-item-->
<!--        &__icon&#45;&#45;text,-->
<!--        &__icon:first-child-->
<!--          margin-top: 10px-->

<!--    .v-list-group&#45;&#45;sub-group-->
<!--      .v-list-item-->
<!--        +ltr()-->
<!--          padding-left: 8px-->

<!--        +rtl()-->
<!--          padding-right: 8px-->

<!--      .v-list-group__header-->
<!--        +ltr()-->
<!--          padding-right: 0-->

<!--        +rtl()-->
<!--          padding-right: 0-->

<!--        .v-list-item__icon&#45;&#45;text-->
<!--          margin-top: 19px-->
<!--          order: 0-->

<!--        .v-list-group__header__prepend-icon-->
<!--          order: 2-->

<!--          +ltr()-->
<!--            margin-right: 8px-->

<!--          +rtl()-->
<!--            margin-left: 8px-->
<!--</style>-->
