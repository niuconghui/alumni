import http from './axios'

export default {
  postFeedback(params) {
    return http.post('feedback', params)
  },

  getCategory() {
    return http.get('fcategory')
  }
}