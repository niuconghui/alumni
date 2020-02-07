const jwt = require('jsonwebtoken')

const result = require('../../utils/result')
const userModel = require('../../models/StudentUser')

exports.login = async(req, res) => {
  const { studentName, password } = req.body

  const user = await userModel.findOne({studentName}).select('+password')
  if (user === null){
    return res.send(result.error(-1, '用户不存在')) 
  } 

  const isValid = require('bcrypt').compareSync(password, user.password)
  if (!isValid) {
    return res.send(result.error(-1, '账户名或密码错误')) 
  }

  const token = jwt.sign({ id: user._id }, 'niuconghui')

  res.send(result.success({token, uname: user.studentName, uavatar: user.avatar }))
}

exports.getUserInfo = async(req, res) => {
  const token = String(req.headers.authorization || '').split(' ').pop()
  if (!token) return res.send(result.error(-1, '用户未登录'))

  const { id } = jwt.verify(token, 'niuconghui')
  if (!id) return res.send(result.error(-1, 'token 异常'))

  const user = await userModel.findById(id)
  res.send(result.success({user}))

}