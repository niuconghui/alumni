module.exports = app => {
  const express = require('express')
  const sendMail = require('./../../plugins/mail')
  const randomCode = require('../../plugins/randomCode')

  const router = express.Router({
    mergeParams: true
  })

  router.get('/verify', async (req,res) => {
    const email = req.query.email
    let code = randomCode()
    const mailres = await sendMail(email, `本次注册的验证码是${ code },有效时间为 5 分钟，若不是本人操作请忽视`, '这是邮件标题')
    
    if (mailres) {
      res.send({
        code,
        status: 0,
        msg: '发送成功了'
      })
    } else {
      res.send({
        status: 0,
        msg: '发送失败了'
      })
    }
  })


  app.use('/admin/api', router)

}