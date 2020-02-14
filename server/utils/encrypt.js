const crypto = require('crypto')



module.exports = function(password){
  const hmac = crypto.createHmac('sha256', "ncherish")
  hmac.update(password)
  const newPassword = hmac.digest('hex')
  return newPassword
}
