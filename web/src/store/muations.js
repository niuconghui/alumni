export default {
  userToken(state, token) {
    state.token = token
  },

  userLogin(state, flag) {
    state.isLogin = flag
  },

  userAvatar(state, avatar) {
    state.userAvatar = avatar
  },

  userId(state, id) {
    state.userId = id
  }
}