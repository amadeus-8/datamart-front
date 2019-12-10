export default {
  authorized (state) {
    return !!state.token
  },
  getToken (state) {
    return state.token !== null ? `Bearer ${state.token}` : state.token
  }
}
