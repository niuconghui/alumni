import http from './axios'

export default {
  getDemeanorAlumini(page, limit) {
    return http.get('demeanor/alumni', {
      params: {
        page,
        limit
      }
    })
  },

  getDemeanorAcademician(page, limit) {
    return http.get('demeanor/academician', {
      params: {
        page,
        limit
      }
    })
  },

  getDemeanorDetail(id) {
    return http.get(`demeanor/detail/${id}`)
  },
}

