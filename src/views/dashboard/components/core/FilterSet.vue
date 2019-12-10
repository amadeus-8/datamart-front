<template>
<v-flex 12>
    <v-flex xs12>
        <div class="text-xs-center body-2 text-uppercase sidebar-filter">Город</div>
        <v-select
                :items="[{name: 'Все', id: null}].concat(filter.regions)"
                label="регион"
                item-text="name"
                item-value="id"
                v-model="filter.filter_set.region_id"
                solo
        ></v-select>
    </v-flex>

    <v-divider class="mt-2 mb-2"/>

    <div class="text-xs-center mb-3">Дополнительные фильтры</div>

    <v-tabs
      v-model="tab"
      centered
      slider-color="yellow"
      dark
    >
      <v-tab
        v-for="(tab, i) in tabs"
        :key="i"
        :href="`#${tab.value}`"
      >
        {{ tab.text }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        :key="0"
        value="client"
      >
        <v-card flat p-1>
<!--          <v-card-text v-text="text">-->
            <div class="mt-2 text-xs-center body-2 text-uppercase sidebar-filter">
              Пол
            </div>
            <v-radio-group v-model="filter.filter_set.gender" row>
              <v-radio label="М" value="М"></v-radio>
              <v-radio label="Ж" value="Ж"></v-radio>
              <v-radio label="Все" :value="null"></v-radio>
            </v-radio-group>

            <!--    <div class="text-xs-center body-2 text-uppercase sidebar-filter">-->
            <!--        Возрастная категория-->
            <!--    </div>-->
            <v-select
              :items="filter.age_categories"
              label="Возраст"
              v-model="filter.filter_set.age_category"
            >
            </v-select>

            <!--    <div class="text-xs-center body-2 text-uppercase sidebar-filter">-->
            <!--        КБМ-->
            <!--    </div>-->
            <v-select
              :items="filter.kbms"
              label="Кбм"
              v-model="filter.filter_set.insurance_class"
            >
            </v-select>
<!--          </v-card-text>-->
        </v-card>
      </v-tab-item>
      <v-tab-item :key="1" value="vehicle">
        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Год выпуска</div>
        <v-select
          :items="[{category: 'Все', id: null}].concat(filter.vehicle_year_categories)"
          label="Категория"
          item-text="category"
          item-value="id"
          v-model="filter.filter_set.vehicle_year_category"
          solo
        ></v-select>

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Марка</div>
        <v-select
          :items="[{name: 'Все', id: null}].concat(filter.vehicle_brands)"
          label="Марка"
          item-text="name"
          item-value="id"
          v-model="filter.filter_set.vehicle_brand"
          solo
        ></v-select>

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Модель</div>
        <v-select
          :items="[{name: 'Все', id: null}].concat(filter.vehicle_models)"
          label="Модель"
          item-text="name"
          item-value="id"
          v-model="filter.filter_set.vehicle_model"
          solo
        ></v-select>
      </v-tab-item>
      <v-tab-item :key="2" value="seller">

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Канал продаж</div>
        <v-select
          :items="[{name: 'Все', id: null}].concat(filter.sale_channels)"
          label="Канал продаж"
          item-text="name"
          item-value="id"
          v-model="filter.filter_set.sale_channel"
          solo
        ></v-select>

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Центр продаж</div>
        <v-select
          :items="[{name: 'Все', id: null}].concat(filter.sale_centers)"
          label="Центра продаж"
          item-text="name"
          item-value="id"
          v-model="filter.filter_set.sale_center"
          solo
        ></v-select>

<!--        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Агент</div>-->
<!--        <v-select-->
<!--          :items="[{fullname: 'Все', id: null}].concat(filter.vehicle_models)"-->
<!--          label="Агент"-->
<!--          item-text="fullname"-->
<!--          item-value="id"-->
<!--          v-model="filter.filter_set.agent"-->
<!--          solo-->
<!--        ></v-select>-->

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Департамент</div>
        <v-select
          :items="[{name: 'Все', id: null}].concat(filter.departments)"
          label="Департамент"
          item-text="name"
          item-value="id"
          v-model="filter.filter_set.department"
          solo
        ></v-select>

        <div class="text-xs-center mt-2 body-2 text-uppercase sidebar-filter">Канал привлечения</div>
        <v-select
          :items="[{name: 'Все', id: null}].concat(filter.referrers)"
          label="Канал привлечения"
          item-text="name"
          item-value="id"
          v-model="filter.filter_set.referrer"
          solo
        ></v-select>

      </v-tab-item>
    </v-tabs-items>
</v-flex>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FilterSet',
  // props: {
  //   filterSet: {
  //     type: Object,
  //     default: null
  //   }
  // },
  data () {
    return {
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
    }
  },
  computed: {
    ...mapState('filter', [
      'filter'
      // 'regions',
      // 'age_categories',
      // 'kbms',
      // 'gifts',
      // 'referrers',
      // 'departments',
      // 'sale_centers',
      // 'sale_channels',
      // 'vehicle_brands',
      // 'vehicle_models',
      // 'vehicle_year_categories'
    ]),
    isNew () {
      return this.filter.filter_set.name !== 'default' && typeof this.filter.filter_set.id === 'undefined'
    }
  }
}
</script>
