// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store'
import { sync } from 'vuex-router-sync'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css'
import vueTopprogress from 'vue-top-progress'
import { appRouter, otherRouter } from './router/router'
import { messages } from 'vue-mc/validation'
import VeeValidate from 'vee-validate'

import * as filters from '@/filters'
import * as mixins from '@/mixins'
import '@/api/config'
import { vi } from '@/models/commons/mc/locale'
import GsTable from '@/components/app/gsTable/GsTable'
import gsTableHelper from '@/components/app/gsTable/mixins'
import validateMessages from '@/locale/validates'
import i18n from '@/locale'
import ls from './libs/ls'

sync(store, router)

Vue.use(Vuetify)
// Config Notify
const options = {
  toast: {
    position: SnotifyPosition.rightTop
  }
}
Vue.$snotify = Snotify
Vue.use(Snotify, options)
Vue.use(vueTopprogress)
Vue.use(VeeValidate, {
  locale: ls.get('lang', 'vi'),
  dictionary: validateMessages
})

// global components
Vue.component('gs-table', GsTable)
Vue.mixin(gsTableHelper)

messages.register(vi)
messages.locale('vi-vn')

// custom filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// common mixins
Object.keys(mixins).forEach(key => {
  Vue.mixin(mixins[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created () {
    let tagsList = [...otherRouter.children]
    appRouter.map((item) => {
      if (item.children.length <= 1) {
        tagsList.push(item.children[0])
      } else {
        tagsList.push(...item.children)
      }
    })
    this.$store.dispatch('setTagsList', tagsList)
  }
})
