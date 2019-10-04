import Vue from 'vue'
import App from './App.vue'
import router from '../router/router'
import store from '../store/store'
import element from '../plugins/element-ui'
import http from '../network/http'

Vue.prototype.$http = http

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
