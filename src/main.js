import Vue from 'vue'
import App from './App'
import { i18n } from '@/local/index.js'
import store from './store'
import globalMixin from '@/mixins/global'
import '@/common/ican-H5Api'
import toast from '@/components/ba-toast/toast'

Vue.mixin(globalMixin)
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

// 必须的
Vue.prototype._i18n = i18n

Vue.prototype.$toast = toast

const app = new Vue({
  i18n,
  ...App,
})
app.$mount()
