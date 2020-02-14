export default {
  userToken(state, token) {
    state.token = token
  },

  userLogin(state, flag) {
    state.isLogin = flag
  },

  userAvatar(state, avatar) {
    // console.log('我是 muations 里边的' + avatar)
    state.userAvatar = avatar
  },

  userId(state, id) {
    state.userId = id
  }
}