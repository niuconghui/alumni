export default {
  setToken({ commit }, token) {
    commit('userToken', token)
  },

  setLogin({ commit }, flag) {
    commit('userLogin', flag)
  },

  setAvatar({ commit }, avatar) {
    commit('userAvatar', avatar)
    // console.log('我是 actions 里边的' + avatar)
  },

  setUserId({ commit }, id) {
    commit('userId', id)
  },

}