import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locales from './locales'
import ls from '../libs/ls'

Vue.use(VueI18n)
Vue.config.productionTip = false

Vue.config.lang = ls.get('lang', 'vi')

const i18n = new VueI18n({
  locale: ls.get('lang', 'vi'), // set locale
  messages: locales // set locale messages
})

export default i18n
