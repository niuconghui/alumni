import http from './axios'

export default {
  getExchange(page, type = '') {
    return http.get('exchange', {
      params: {
        page,
        type
      }
    })
  },

  getCategory() {
    return http.get('ecategory')
  },

  getExchangeDetail(id) {
    return http.get(`exchange/detail/${id}`)
  },

  uploadImg(file) {
    return http.post('upload', file)
  },

  saveExchange(params) {
    return http.post('exchange/create', params)
  },

  updateExchange(params) {
    return http.put(`/exchange/update/${params._id}`, params)
  },

  deleteExchange(id) {
    return http.delete(`/exchange/delete/${id}`)
  },

  getUserExchanges(id) {
    return http.get(`/user/exchanges/${id}`)
  },

  getOtherUserExchanges(id) {
    return http.get(`/user/otherUserExchanges/${id}`)
  },

  postStar(id) {
    return http.post(`star/${id}`)
  },

  saveComment(params) {
    return http.post(`/comment/${params.id}`, {content: params.content})
  },

  getComments(id) {
    return http.get(`comments/${id}`)
  },

  deleteComment(id) {
    return http.delete(`comment/${id}`)
  }

}