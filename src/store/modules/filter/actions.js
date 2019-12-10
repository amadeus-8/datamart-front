import { axiosInstance as axios } from '../../../plugins/axios'

export default {
  getRegions ({ commit }) {
    return axios.get('/get_regions').then((res) => {
      commit('setRegions', res.data)
      return res.data
    })
  },
  getFilterSets ({ commit }) {
    return axios.get('/get_filtersets').then((res) => {
      commit('setFilterSets', res.data)
    })
  },
  getVehicleFilters ({ commit }) {
    return axios.get('/get_vehicle_filters').then((res) => {
      commit('setVehicleYearCategories', res.data.year_categories)
      commit('setVehicleBrands', res.data.brands)
      commit('setVehicleModels', res.data.models)
    })
  },
  getSellerFilters ({ commit }) {
    return axios.get('/get_seller_filters').then((res) => {
      // commit('setAgents', res.data.agents)
      commit('setReferrers', res.data.referrers)
      commit('setDepartments', res.data.departments)
      commit('setSaleChannels', res.data.sale_channels)
      commit('setSaleCenters', res.data.sale_centers)
    })
  }
}
