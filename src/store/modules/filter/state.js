export default {
  filter: {
    value_view: 'sums',
    filter_sets: [
      // {
      //   name: 'По умолчанию',
      //   from: new Date(),
      //   to: new Date(),
      //   period_category: 'last_week',
      //   city: null,
      //   referrer: null,
      //   gender: null
      // },
      {
        name: 'Новый',
        from: '',
        to: '',
        period_category: null,
        region_id: null,
        referrer: null,
        gender: null
      }
    ],
    // choosen_filter_set: 'default',
    filter_set: {
      name: 'Произвольный',
      from: new Date('2019-03-01').toISOString().substr(0, 10),
      to: new Date('2019-03-30').toISOString().substr(0, 10),
      region_id: null,
      referrer: null,
      gender: null,
      age_category: null,
      insurance_class: null,
      client_status: null,
      vehicle_year_category: null,
      vehicle_brand: null,
      vehicle_model: null,
      sale_center: null,
      sale_channel: null,
      department: null
    },
    filter_set_template: {
      name: '',
      from: new Date(),
      to: new Date(),
      period_category: 'last_week',
      region_id: null,
      referrer: null,
      gender: null,
      age_category: null,
      insurance_class: null,
      client_status: null
    },
    regions: [],
    age_categories: ['все', '20-25', '26-34', '35-44', '45-54', '55-64', 'младше 20', 'старше 64'],
    client_statuses: [
      {
        text: 'Новый',
        value: 'new'
      },
      {
        text: 'Действующий',
        value: 'active'
      },
      {
        text: 'Вернувшийся',
        value: 'returned'
      }
    ],
    kbms: ['все', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'ИП', 'М'],
    gifts: [],
    agents: [],
    referrers: [],
    departments: [],
    sale_centers: [],
    sale_channels: [],
    vehicle_brands: [],
    vehicle_models: [],
    vehicle_year_categories: []
  }
}
