/**
 * -----------------------------------------------------------------------------------------------------------
 * Loading dependencies
 * -----------------------------------------------------------------------------------------------------------
 */
import axios from 'axios'
import ls from 'local-storage'
import router from '@/router'
import store from '@/store'

/**
 * -----------------------------------------------------------------------------------------------------------
 * Default configurations
 * -----------------------------------------------------------------------------------------------------------
 */
axios.defaults.baseURL = process.env.API_URI
axios.defaults.headers.post['Accept'] = 'application/json'

/**
 * -----------------------------------------------------------------------------------------------------------
 * Add a request interceptor
 * -----------------------------------------------------------------------------------------------------------
 */
axios.interceptors.request.use(config => {
  const token = ls.get('authen', {})
  if (token) {
    config.headers.Authorization = `Bearer ${token.access_token}`
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

/**
 * -----------------------------------------------------------------------------------------------------------
 * Add a response interceptor
 * -----------------------------------------------------------------------------------------------------------
 */
axios.interceptors.response.use(response => {
  if (response.data.queries) {
    store.commit('SET_DEBUG', response.data.queries)
  }
  return response.data
}, error => {
  const token = ls.get('authen', {})
  let response = error.response
  if (response.status === 400 || response.status === 401) {
    if (!(response.config.method === 'post' && response.config.url === response.config.baseURL + '/login')) {
      if (token) {
        ls.remove('authen')
      }
      store.commit('setLogout')
      router.push('/login')
    }
  }
  if (response.status === 403) {
    router.push({name: 'error-403'})
  }
  // if (response.headers && response.headers.Authorization) {
  //   ls.set('authen', response.headers.Authorization)
  // }
  // if (response.data && response.data.access_token && response.data.access_token.length > 10) {
  //   ls.set('authen', response.data.access_token)
  // }
  // Do something with response error
  return error.response.data
})
