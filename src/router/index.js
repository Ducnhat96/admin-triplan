/**
 * -----------------------------------------------------------------------------------------------------------
 * Loading dependencies
 * -----------------------------------------------------------------------------------------------------------
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { concat } from 'lodash'
import ls from 'local-storage'
import store from '@/store'

/**
 * -----------------------------------------------------------------------------------------------------------
 * Loading module routes
 * -----------------------------------------------------------------------------------------------------------
 */
import { routers } from './router'
import accountRoutes from '@/components/account/routes'

Vue.use(VueRouter)

/**
 * -----------------------------------------------------------------------------------------------------------
 * Route list
 * -----------------------------------------------------------------------------------------------------------
 */

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }), // Chuyen trang thi scroll ve top
  routes: concat(
    routers,
    accountRoutes
  )
})

router.beforeEach((to, from, next) => {
  let token = ls.get('authen')
  token = true
  if (!token && (to.path !== '/login')) {
    store.commit('setLogout')
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
