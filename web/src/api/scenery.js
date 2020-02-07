import http from './axios'

export default {
  getScenery() {
    return http.get('scenery')
  },
}
