export const setToken = (state, data) => {
  localStorage.setItem('token', data.access_token)
  state.token = localStorage.getItem('token') // data.access_token
}

export const delToken = (state) => {
  localStorage.removeItem('token')
  state.token = localStorage.getItem('token')
}

export default {
  setToken (state, data) {
    localStorage.setItem('token', data.access_token)
    state.token = localStorage.getItem('token') // data.access_token
  },
  delToken (state) {
    localStorage.removeItem('token')
    state.token = localStorage.getItem('token')
  },
  setUser (state, value) {
    localStorage.setItem('user', value)
    state.user = localStorage.getItem('user')
  }
}
