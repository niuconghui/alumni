import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import element from './plugins/element-ui'
import http from './network/http'

import 'assets/css/global.css'

Vue.prototype.$http = http

Vue.config.productionTip = false

Vue.mixin({
  computed: {
    uploadUrl () {
      return this.$http.defaults.baseURL +'/upload'
    }
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer  + ${localStorage.token || ''}`
      } 
    }
  }
})

// 带有表情的富文本编辑器
import vueEditor from 'vue-editor-interline'
Vue.use(vueEditor)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
