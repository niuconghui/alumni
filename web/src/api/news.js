import http from './axios'

export default {
  getNewsCenter(page, limit) {
    return http.get('news/center', {
      params: {
        page,
        limit
      }
    })
  },

  getNewsDeclear(page, limit) {
    return http.get('news/declear', {
      params: {
        page,
        limit
      }
    })
  },

  getNewsDetail(id) {
    return http.get(`news/detail/${id}`)
  },
}

