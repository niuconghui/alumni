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

  getDepartments() {
    return http.get('/department')
  },

  getCities() {
    return http.get('/city')
  },

  getSearch(params) {
    return http.get('/demeanor/search', {
      params
    })
  },

  getProvince() {
    return http.get('/demeanor/province')
  }
}

