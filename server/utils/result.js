module.exports = class {
  static success(data = {}, code = 0, msg = 'OK') {
    return {
      code,
      msg,
      data
    }
  }

  static error(code = '9999', msg = 'error') {
    return {
      code,
      msg
    }
  }
}
// module.exports = {
//   success(data = {}, code = 0, msg = 'OK') {
//     return {
//       code,
//       msg,
//       data
//     }
//   },

//   error(code = '9999', msg = 'error') {
//     return {
//       code,
//       msg
//     }
//   }
// }
