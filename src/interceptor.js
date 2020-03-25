import axios from 'axios'
import store from './store'
import router from './router'

axios.defaults.timeout = 30000

axios.interceptors.request.use(config => {
  store.commit('LOADING_START')
  let token = store.getters.jwtDecoded || null
  let authorized = (token && token.exp > Date.now() / 1000)

  if (authorized) {
    config.headers.common['Authorization'] = 'Bearer ' + store.state.auth.token
  }

  return Promise.resolve(config)
}, error => {
  store.commit('SET_ERROR')
  return Promise.reject(error)
})

axios.interceptors.response.use(data => {
  store.commit('LOADING_STOP')
  return Promise.resolve(data)
}, error => {
  store.commit('SET_ERROR')
  if (error.response && error.response.status && error.response.status === 401) {
    this.$store.dispatch("logout")
      .then(() => router.push('/auth'))
  }

  return Promise.reject(error)
})

export default axios
