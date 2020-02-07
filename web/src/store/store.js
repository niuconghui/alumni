import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './muations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    userAvatar: '',
    userId: ''
  },
  actions,
  mutations,
  getters
})


export default store