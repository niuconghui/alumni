const jwt = require('jsonwebtoken')
const encrypt = require('../../utils/encrypt')
const result = require('../../utils/result')
const SUserModel = require('../../models/SourceUser')
const userModel = require('../../models/StudentUser')
const DepartModel = require('../../models/SecClass')
const CityModel = require('../../models/City')

exports.getSUsers = async(req, res) => {
  const { studentSID } = req.query
  const suser = await SUserModel.findOne({ studentSID })
  if (suser) {
    res.send(result.success())
  } else {
    res.send(result.error(-1, '未查询到该学号'))
  }
},

exports.checkUsername = async(req, res) => {
  const { studentName } = req.query
  const user = await userModel.findOne({ studentName })
  if (user) {
    res.send(result.error(-1, '用户名已存在'))
  } else {
    res.send(result.success())
  }
}

exports.checkEmail = async(req, res) => {
  const { email } = req.query
  const useremail = await userModel.findOne({ email })
  if (useremail) {
    res.send(result.error(-1, '邮箱已被注册'))
  } else {
    res.send(result.success())
  }
}

exports.register = async(req, res) => {
  console.log(req.model);
  const model = await userModel.create(req.body)
  
  res.send(result.success(model))
}

exports.login = async(req, res) => {
  const { studentName, password } = req.body

  const user = await userModel.findOne({studentName}).select('+password')
  console.log('这是req', req.body, req.params);
  if (user === null){
    return res.send(result.error(-1, '用户不存在')) 
  } 

  if (encrypt(password) !== user.password) {
    return res.send(result.error(-1, '用户名或密码错误')) 
  }

  const token = jwt.sign({ id: user._id }, 'niuconghui')

  res.send(result.success({token, uname: user.studentName, uavatar: user.avatar, userId: user._id }))
}

exports.getUserInfo = async(req, res) => {
  const token = String(req.headers.authorization || '').split(' ').pop()
  if (!token) return res.send(result.error(-1, '用户未登录'))

  const { id } = jwt.verify(token, 'niuconghui')
  if (!id) return res.send(result.error(-1, 'token 异常'))

  const user = await userModel.findById(id)
  res.send(result.success({user}))

}

exports.getOtherUserInfo = async(req, res) => {
  const token = String(req.headers.authorization || '').split(' ').pop()
  if (!token) return res.send(result.error(-1, '用户未登录'))

  const id = req.params.id

  const user = await userModel.findById(id)
  res.send(result.success({user}))
}

exports.getDepartments = async(req, res) => {
  const items = await DepartModel.find()
  res.send(result.success(items))
}

exports.getCities = async(req, res) => {
  const items = await CityModel.find()
  res.send(result.success(items))
}

exports.saveUserInfo = async(req, res) => {

  const [, token] = req.headers.authorization.split(' ')
  
  jwt.verify(token, 'niuconghui', async (err, data) => {
    if (err) return res.send(result.error(-1, '无效 token'))
    const items = await userModel.findByIdAndUpdate(data.id, req.body)
    res.send(result.success(items))
  })
 
}