module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
      mergeParams: true
  })

  app.post('/admin/api/login', async (req,res) => {
    const { adminName,password } = req.body
    const admin = await AdminUser.findOne({ adminName }).select('+password')
    if (!admin) {
      return res.status(422).send({ message: '用户不存在'})
    }
    // 校检密码
    const isValid = require('bcrypt').compareSync(password,admin.password)
    if (!isValid) {
      return res.status(422).send({ message: '密码错误'})
    }
    // 返回 token
    const token = jwt.sign({ id: admin._id ,adminName: admin.adminName}, app.get('secret'))
    res.send({ token })
  })
}

app.use('/admin/api/rest/' )