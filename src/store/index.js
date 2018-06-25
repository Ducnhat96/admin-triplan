/**
 * -----------------------------------------------------------------------------------------------------------
 * Loading dependencies
 * -----------------------------------------------------------------------------------------------------------
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import ls from '@/libs/ls'
import router from '@/router'
/**
 * -----------------------------------------------------------------------------------------------------------
 * Loading vuex modules
 * -----------------------------------------------------------------------------------------------------------
 */
import app from './app'
import gsTable from '@/components/app/gsTable/store'
import account from '@/components/account/store'

/**
 * -----------------------------------------------------------------------------------------------------------
 * Vuex base configurations
 * -----------------------------------------------------------------------------------------------------------
 */
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  strict: debug,
  state: {
    loading: false,
    logged: false,
    loadingInstance: undefined,
    debugQuery: [],
    show_notify: false,
    notify: {
      type: 'success',
      timeout: 3000,
      body: 'body',
      title: 'title',
      showProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true
    }
  },
  actions: {
    showNotify: ({commit}, notify) => {
      commit('SET_NOTIFY', notify)
      commit('SHOW_NOTIFY', true)
    },
    hideNotify ({commit}) {
      commit('SET_NOTIFY', {})
      commit('SHOW_NOTIFY', false)
    },
    logged ({commit}, token) {
      ls.set('authen', token)
      commit('setLogged')
    },
    logout ({commit}) {
      ls.remove('authen')
      commit('setLogout')
    },
    toggleLoadding ({commit}, loading = true) {
      commit('loading', loading)
    },
    checkLogged ({commit}) {
      if (ls.get('authen')) {
        commit('setLogged')
      } else {
        router.push('/login')
      }
    }
  },
  mutations: {
    loading (state, loading) {
      state.loading = loading
    },
    setLogged (state) {
      state.logged = true
    },
    setLogout (state) {
      state.logged = false
    },
    SET_DEBUG (state, queries) {
      state.debugQuery.push(queries)
    },
    SHOW_NOTIFY (state, status) {
      state.show_notify = status
    },
    SET_NOTIFY (state, notify) {
      state.notify = Object.assign(state.notify, notify)
    }
  },
  getters: {
    loading: (state) => state.loading,
    isLogged: state => state.logged,
    debugQuery: state => state.debugQuery,
    show_notify: state => state.show_notify,
    notify: state => state.notify
  },
  modules: {
    app,
    gsTable,
    account
  },
  plugins: debug ? [createLogger()] : []
})

export default store
