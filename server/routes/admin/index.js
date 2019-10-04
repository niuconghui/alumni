module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  router.post('/', async (req,res) => {
    const model = await req.model.create(req.body)
    res.send(model)
  })

  router.get('/', async (req,res) => {
    const items = await req.model.find()
    res.send(items)
  })

  router.get('/:id', async (req,res) => {
    const items = await req.model.findById(req.params.id)
    res.send(items)
  })

  router.put('/:id', async (req,res) => {
    const items = await req.model.findByIdAndUpdate(req.params.id,req.body)
    res.send(items)
  })

  router.delete('/:id', async (req,res) => {
    await req.model.findByIdAndDelete(req.params.id)
    res.send('ok')
  })

  // app.use('/admin/api/rest',router)
  // 模型名不能是固定的，要是动态传递的，通过路径找模型名，再去数据库中找到模型
  //    需要通过小写的路径找到大写的模型，需要用到 inflection 模块
  // 想要各处都用这个中间件，需要把它挂载到 req 对象上

  app.use('/admin/api/rest/:resource', (req,res,next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.model = require(`../../models/${modelName}`)
    next()
  },router)

  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload',upload.single('file'),async (req,res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}