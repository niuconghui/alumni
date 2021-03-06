import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'

// 全局网络请求
import api from './api'
Vue.prototype.$api = api

// 引入 elementui
import '@/plugins/elementUi'

// 全局重置样式文件
import 'assets/scss/base.css'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client'
 
Vue.use(new VueSocketIO({
    debug: true,
    autoConnect: false,
    // connection: socketio('http://localhost:3000/chat'), 
    connection: 'http://localhost:3000/',
  })
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
