<template>
  <div id="settings-wrapper">
    <v-card
      id="settings"
      class="py-2 px-4"
      color="rgba(0, 0, 0, .3)"
      dark
      flat
      link
      min-width="100"
      style="position: fixed; top: 115px; right: -35px; border-radius: 8px;"
    >
      <v-icon large>
        mdi-filter
      </v-icon>
    </v-card>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      activator="#settings"
      bottom
      content-class="v-settings"
      left
      nudge-left="8"
      offset-x
      origin="top right"
      transition="scale-transition"
    >
      <v-card
        class="text-center mb-0"
        width="600"
      >
        <v-card-text>
          <strong class="d-inline-block">ФИЛЬТРЫ</strong>

              <!--  TODO -->
              <!--              <v-select-->
              <!--                        :items="filter_sets"-->
              <!--                        label="Комбинации фильтров"-->
              <!--                        item-text="name"-->
              <!--                        :item-value="function(item) {-->
              <!--                          return item-->
              <!--                        }"-->
              <!--                        v-model="selected_filter_set"-->
              <!--                        @input="setFilterSet(selected_filter_set)"-->
              <!--                        solo-->
              <!--              ></v-select>-->

<!--          <div class="text-center text-uppercase sidebar-filter">-->
          <v-menu
            v-model="from_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="filter.filter_set.from"
                label="From date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="filter.filter_set.from" @input="from_menu = false"></v-date-picker>
          </v-menu>

          <v-menu
            v-model="to_menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="filter.filter_set.to"
                label="To date"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="filter.filter_set.to" @input="to_menu = false"></v-date-picker>
          </v-menu>

          <v-divider class="mb-3"/>

          <filter-set></filter-set>

          <div class="mt-3 text-xs-center body-2 text-uppercase">
            <v-btn
              color="secondary"
              medium
              rounded
              :disabled="reportsloading"
              @click="commitFilters()"
            >
              Применить
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState,
  mapActions
} from 'vuex'

import FilterSet from './FilterSet.vue'

export default {
  components: {
    FilterSet
  },
  data: () => ({
    menu: false,
    from_menu: false,
    to_menu: false
    // selected_filter_set: 'default',
  }),

  computed: {
    ...mapState('app', ['image', 'color']),
    ...mapState('filter', ['filter']),
    ...mapState('report', ['reportsloading']),
  },
  methods: {
    ...mapActions('report', ['getGeneralReport', 'getAgeChartData', 'getRegionsReportData']),
    ...mapActions('filter', ['getRegions', 'getVehicleFilters', 'getSellerFilters']),
    ...mapMutations('app', ['setImage']),
    ...mapMutations('filter', ['setFilterSet']),
    // setColor (color) {
    //   this.$store.state.app.color = color
    // },
    commitFilters () {
      this.getGeneralReport(this.filter.filter_set)
      this.getAgeChartData(this.filter.filter_set)
      this.getRegionsReportData(this.filter.filter_set)
    }
  },
  created () {
      this.getRegions()
      this.getVehicleFilters()
      this.getSellerFilters()
      this.commitFilters()
  }
}
</script>

<style lang="sass">
  .v-settings
    .v-item-group > *
      cursor: pointer

    &__item
      border-width: 3px
      border-style: solid
      border-color: transparent !important

      &--active
        border-color: #00cae3 !important
</style>
