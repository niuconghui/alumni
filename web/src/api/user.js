import http from './axios'

export default {
  login(params) {
    return http.post('/user/login', params)
  },

  getUser() {
    return http.get('/user/userInfo')
  }
}