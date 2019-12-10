export default {
  filters_label (state) {
    let label = `с ${state.filter.filter_set.from} по ${state.filter.filter_set.to}`

    if (state.filter.filter_set.age_category) {
      label = `${label}, Возраст - ${state.filter.filter_set.age_category}`
    }

    if (state.filter.filter_set.region_id) {
      label = `${label} , ${state.filter.regions.find((region) => region.id === state.filter.filter_set.region_id).name}`
    }

    if (state.filter.filter_set.insurance_class) {
      label = `${label}, КБМ${state.filter.filter_set.insurance_class}`
    }

    if (state.filter.filter_set.gender) {
      label = `${label}, Пол - ${state.filter.filter_set.gender}`
    }

    if (state.filter.filter_set.vehicle_year_category) {
      label = `${label}, Год выпуска ТС - ${state.filter.vehicle_year_categories.find((cat) => cat.id === state.filter.filter_set.vehicle_year_category).category}`
    }

    if (state.filter.filter_set.vehicle_brand) {
      label = `${label}, Марка ТС - ${state.filter.vehicle_brands.find((brand) => brand.id === state.filter.filter_set.vehicle_brand).name}`
    }

    if (state.filter.filter_set.vehicle_model) {
      label = `${label}, Модель ТС - ${state.filter.vehicle_models.find((model) => model.id === state.filter.filter_set.vehicle_model).name}`
    }

    return label
  }
}
