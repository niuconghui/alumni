const jwt = require('jsonwebtoken')
exports.parseUserByToken = (token) => {
  if (token) {
    token = token.split(' ')[1]
    return new Promise((resolve, reject) => {
      jwt.verify(token, 'niuconghui', function(err, data){
        if(err) return reject(err)
        resolve(data)
      })
    })
  }
}
