import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../interceptor'
import jwtDecode from 'jwt-decode'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || null,
    user: {},
    tests: []
  },
  mutations: {
    SET_TESTS(state, payload) {
      state.tests = payload.tests
    },
    LOADING_START(state) {
      state.status = 'loading'
    },
    LOADING_STOP(state) {
      state.status = ''
    },
    AUTH_SUCCESS(state, payload) {
      state.status = 'success'
      state.token = payload.token
      state.user = payload.user
    },
    SET_ERROR(state) {
      state.status = 'error'
    },
    LOGOUT(state) {
      state.status = ''
      state.token = null
    },
  },
  actions: {
    login({ commit }, user) {
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

      return new Promise((resolve, reject) => {
        axios({
          url: 'https://app.netquest.ru/api/auth', data: user, method: 'POST'
        })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            if (user.isAdmin) {
              localStorage.setItem("ddl-bg-285015", 1584678841912);
            }
            axios.defaults.headers.common['x-auth-token'] = token
            commit('AUTH_SUCCESS', { token, user })
            resolve(resp)
          })
          .catch(err => {
            commit('SET_ERROR', err.response)
            localStorage.removeItem('token')
            localStorage.removeItem('ddl-bg-285015')
            reject(err.response)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: 'https://app.netquest.ru/api/users', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['x-auth-token'] = token
            commit('AUTH_SUCCESS', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('SET_ERROR', err.response)
            localStorage.removeItem('token')
            reject(err.response)
          })
      })
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('LOGOUT')
        localStorage.removeItem('token')
        localStorage.removeItem('ddl-bg-285015')
        delete axios.defaults.headers.common['x-auth-token']
        resolve()
      })
    },
    getTests({ commit }) {
      return new Promise((resolve, reject) => {
        axios({ url: 'https://app.netquest.ru/api/test', method: 'GET' })
          .then(resp => {
            console.log(resp)
            commit('SET_TESTS', resp)
            resolve(resp)
          })
          .catch(err => {
            console.log(err);
            commit('SET_ERROR', err)
            reject(err)
          })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isAdmin: state => state.user.isAdmin ? state.user.isAdmin : localStorage.getItem('ddl-bg-285015') == 1584678841912,
    name: state => state.user.name,
    email: state => state.user.email,
    tests: state => state.tests,
    jwtDecoded: (state) => {
      let token = state.token || null
      if (token !== null) {
        return jwtDecode(state.token)
      }
    },
    token: (state) => state.token
  }
})
