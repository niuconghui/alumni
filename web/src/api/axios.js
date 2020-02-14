import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})


http.interceptors.request.use( config => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
}, err => {

})

//   http.interceptors.response.use( res => {
//     return res.data
//   }, err => {
//     console.log(err)
//   })

export default http 


