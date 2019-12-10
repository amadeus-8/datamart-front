export default {
  generalReport: {
    count: 0,
    ogpo_vts_result: 0,
    vts_cross_result: 0,
    vts_overall_sum: 0,
    payout_sum: 0,
    avg_sum: 0,
    avg_cross_result: 0,
    overall_lost_count: 0,
    vts_lost_count: 0
  },
  reportsloading: true,
  ageCategoryReport: {
    views: ['table', 'bar_chart', 'pie'],
    view: 'table',
    loading: false,
    data: {
      labels: [],
      sums: [],
      avgs: [],
      counts: []
    },
    options: {
      sums: {
        axisX: {
          showGrid: false
        },
        low: 1000,
        high: 100000000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        },
        divisor: 10
      },
      avgs: {
        axisX: {
          showGrid: false
        },
        low: 1000,
        high: 100000000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        },
        divisor: 10
      },
      counts: {
        axisX: {
          showGrid: false
        },
        low: 10,
        high: 10000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      },
      pie: {
        labelInterpolationFnc: (value) => `${value}%`
      }
    },
    responsiveOptions: [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0]
          }
        }
      }]
    ]
  },
  regionsReport: {
    views: ['table', 'chart'],
    view: 'table',
    loading: false,
    data: {
      labels: [],
      sums: [],
      avgs: [],
      counts: []
    },
    options: {
      sums: {
        axisX: {
          showGrid: false
        },
        low: 1000,
        high: 100000000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        },
        divisor: 10
      },
      avgs: {
        axisX: {
          showGrid: false
        },
        low: 1000,
        high: 100000000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        },
        divisor: 10
      },
      counts: {
        axisX: {
          showGrid: false
        },
        low: 10,
        high: 10000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      },
      pie: {
        labelInterpolationFnc: (value) => `${value}%`
      }
    }
  },
  saleCentersReport: {
    views: ['table', 'chart'],
    view: 'table',
    loading: false,
    data: {
      labels: [],
      sums: [],
      avgs: [],
      counts: []
    },
    options: {
      sums: {
        axisX: {
          showGrid: false
        },
        low: 1000,
        high: 100000000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        },
        divisor: 10
      },
      avgs: {
        axisX: {
          showGrid: false
        },
        low: 1000,
        high: 100000000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        },
        divisor: 10
      },
      counts: {
        axisX: {
          showGrid: false
        },
        low: 10,
        high: 10000,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      },
      pie: {
        labelInterpolationFnc: (value) => `${value}%`
      }
    }
  },
  kbmsReport: {
    views: ['table', 'chart'],
    data: {
      labels: [],
      sums: [],
      avgs: [],
      counts: []
    }
  }
}
