import moment from 'moment'

export default ({ Vue }) => {
  Vue.prototype.$humanizeDate = (dt) => {
    const localDt = moment.utc(dt).toDate()
    return moment(localDt).format('DD.MM.YYYY')
  }
}
