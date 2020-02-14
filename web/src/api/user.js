import http from './axios'

export default {

  getSUsers(studentSID) {
    return http.get('/user/susers', {
      params: { studentSID }
    })
  },

  checkUsername(studentName) {
    return http.get('/user/checkUsername', {
      params: { studentName }
    })
  },

  checkEmail(email) {
    return http.get('/user/checkEmail', {
      params: {
        email
      }
    })
  },

  register(params) {
    return http.post('/user/register', params)
  },

  login(params) {
    return http.post('/user/login', params)
  },

  getUserInfo() {
    return http.get('/user/userInfo')
  },

  getOtherUserInfo(id) {
    return http.get(`/user/otherUserInfo/${id}`)
  },

  getDepartments() {
    return http.get('/department')
  },

  getCities() {
    return http.get('/city')
  },

  saveUserInfo(model) {
    return http.put(`/user/userInfo`, model)
  }
}