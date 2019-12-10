import { axiosInstance as axios } from '../../../plugins/axios'

export default {
  getGeneralReport ({ commit }, data) {
    commit('setLoading', true)
    return axios.post('/get_general_report', data).then((res) => {
      commit('setGeneralReport', res.data.general_report)
      commit('setLoading', false)
      return res.data
    }).catch(() => {
      commit('setLoading', false)
    })
  },
  getAgeChartData ({ commit }, filter) {
    commit('setReportLoading', ['ageCategoryReport', true])
    return axios.post('/get_age_chart_data', filter).then((res) => {
      commit('setAgeChartData', res.data)
      commit('setReportLoading', ['ageCategoryReport', false])
      return res.data
    })
  },
  getRegionsReportData ({ commit }, filter) {
    commit('setReportLoading', ['regionsReport', true])
    return axios.post('/get_regions_report_data', filter).then((res) => {
      commit('setRegionsReportData', res.data)
      commit('setReportLoading', ['regionsReport', false])
      return res.data
    })
  },
  getSaleCentersReportData ({ commit }, filter) {
    commit('setReportLoading', ['saleCentersReport', true])
    return axios.post('/get_sale_centers_report_data', filter).then((res) => {
      commit('setSaleCenterstData', res.data)
      commit('setReportLoading', ['saleCentersReport', false])
      return res.data
    })
  },
  getKBMReportData ({ commit }, filter) {
    commit('setReportLoading', ['kbmsReport', true])
    return axios.post('/get_kbm_report_data', filter).then((res) => {
      commit('setKBMReportData', res.data)
      commit('setReportLoading', ['kbmsReport', false])
      return res.data
    })
  }
}
