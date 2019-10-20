import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

export default http  


// http.interceptors.request.use( config => {
//   return config
// }, err => {

// })

//   http.interceptors.response.use( res => {
//     return res.data
//   }, err => {
//     console.log(err)
//   })


