module.exports = options => {

  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')

  return async (req,res,next) => {
    // 校验用户是否登录
    const token = String(req.headers.authorization || '').split(' ').pop()
    if (!token) {
      return res.status(401).send({ message: '请先登录'})
    }
    const { id } = jwt.verify(token,req.app.get('secret'))
    if (!id) {
      return res.status(401).send({ message: '请先登录'})
    }
    req.admin = await AdminUser.findById(id)  
    if (!req.admin) {
      return res.status(401).send({ message: '请先登录'})
    }
    await next ()
  }
}