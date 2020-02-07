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

  saveExchange(params) {
    return http.post('exchange/create', params)
  }
}