export default {
  setFilterSet (state, value) {
    if (value.name !== 'new') {
      state.filter.filter_set = value
    } else {
      state.filter.filter_set = Object.assign(state.filter.filter_set, state.filter.filter_set.template)
    }
  },
  setFilterSets (state, value) {
    state.filter.filter_sets = value
  },
  setRegions (state, value) {
    state.filter.regions = value
  },
  setVehicleYearCategories (state, value) {
    state.filter.vehicle_year_categories = value
  },
  setVehicleBrands (state, value) {
    state.filter.vehicle_brands = value
  },
  setVehicleModels (state, value) {
    state.filter.vehicle_models = value
  },
  setAgents (state, value) {
    state.filter.agents = value
  },
  setReferrers (state, value) {
    state.filter.referrers = value
  },
  setDepartments (state, value) {
    state.filter.departments = value
  },
  setSaleChannels (state, value) {
    state.filter.sale_channels = value
  },
  setSaleCenters (state, value) {
    state.filter.sale_centers = value
  }
}
