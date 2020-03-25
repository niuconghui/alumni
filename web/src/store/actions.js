export default {
  setToken({ commit }, token) {
    commit('userToken', token)
  },

  setLogin({ commit }, flag) {
    commit('userLogin', flag)
  },

  setAvatar({ commit }, avatar) {
    commit('userAvatar', avatar)
  },

  setUserId({ commit }, id) {
    commit('userId', id)
  },

  setUsername({ commit }, name) {
    commit('userName', name)
  },

}