export default {
  setGeneralReport (state, report) {
    state.generalReport = report
  },
  setAgeChartData (state, data) {
    state.ageCategoryReport.data = data
  },
  setRegionsReportData (state, data) {
    state.regionsReport.data = data
  },
  getKBMReportData (state, data) {
    state.kbmsReport.data = data
  },
  setLoading (state, value) {
    state.reportsloading = value
  },
  setReportLoading (state, data) {
    state[data[0]].loading = data[1]
  }
}
