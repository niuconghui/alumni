const nodeMailer = require('nodemailer')
const transporter = nodeMailer.createTransport({
  service: 'qq',
  auth: {
    user: '923542434@qq.com',
    pass: 'gophtkwacbihbeej'
  }
})

module.exports = function (toMail, content, title = '注册验证') {

  let mailOptions = {
    from: 'nxist 923542434@qq.com',
    to: toMail,
    subject: title,
    text: content
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

// 邮件