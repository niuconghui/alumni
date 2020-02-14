module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const encrypt = require('../../utils/encrypt')
  const router = express.Router({
    mergeParams: true
  })


  router.post('/', async (req, res) => {
    const model = await req.model.create(req.body)
    res.send(model)
  })

  router.get('/', async (req, res) => {
    let items
    const queryOptions = {}
    const total = await req.model.find().estimatedDocumentCount()
    const page = req.query.page
    if (req.model.modelName === 'Exchange' 
        || req.model.modelName === 'News'
        || req.model.modelName === 'Feedback') {
      queryOptions.populate = 'category'
    }

    const limit = req.query.limit
    const queryKey = req.query.queryKey
    if (/\d/.test(page) && page > 0 && /\d/.test(limit)) {
      if (queryKey) {
        let reg = new RegExp(queryKey, 'i')
        items = await req.model
          .find({
            $or: [
              { title: { $regex: reg } },
              { author: { $regex: reg } },
              { studentName: { $regex: reg } },
              { sec_name: { $regex: reg } },
              { name: { $regex: reg } },
              { tag: { $regex: reg } },
            ]
          })
          .setOptions(queryOptions)
      } else {
        items = await req.model
          .find()
          .setOptions(queryOptions)
          .skip((page - 1) * limit)
          .limit(limit * 1)
      }
    } else {
      items = await req.model.find().setOptions(queryOptions)
    }

    res.send({
      items,
      total,
      page
    })
  })

  router.get('/:id', async (req, res) => {
    const items = await req.model.findById(req.params.id)
    res.send(items)
  })

  router.put('/:id', async (req, res) => {
    const items = await req.model.findByIdAndUpdate(req.params.id, req.body)
    res.send(items)
  })

  router.delete('/:id', async (req, res) => {
    await req.model.findByIdAndDelete(req.params.id)
    res.send('ok')
  })

  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)


  // 图片上传
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  // 登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { adminName, password } = req.body
    const admin = await AdminUser.findOne({ adminName }).select('+password')
    if (!admin) {
      return res.status(422).send({ message: '用户不存在' })
    }
    // 校检密码
    
    if (encrypt(password) !== admin.password) {
      return res.status(422).send({ message: '密码错误' })
    }
    // 返回 token
    const token = jwt.sign({ id: admin._id, adminName: admin.adminName }, app.get('secret'))
    res.send({ token })
  })


  // 错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}