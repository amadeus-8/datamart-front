/**
 * Vuex
 *
 * @library
 *
 * https://vuex.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Vuex from 'vuex'
import VueApexCharts from 'vue-apexcharts'

// Store functionality
import modules from './modules'

Vue.use(Vuex)
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

// Create a new store
const store = new Vuex.Store({
  modules,
})

export default store
