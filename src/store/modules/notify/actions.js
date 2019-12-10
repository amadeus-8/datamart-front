export default {
  notify ({ commit }, data) {
    commit('setMessage', data.text)
    commit('setColor', data.color)
    // commit('setLocation', data.location)
    commit('SET_SNACKBAR', true)
  },
  setSnackbar ({ commit, state }, newValue) {
    commit('SET_SNACKBAR', newValue)
    return state.message
  }
}
