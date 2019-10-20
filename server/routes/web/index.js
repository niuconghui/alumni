module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })


  // 校园新闻
  const News = require('../../models/News')

  router.get('/news', async (req,res) => {
    const items = await News.find()
    res.send(items)
  })

  router.get('/news/:id', async (req,res) => {
    const items = await News.findById(req.params.id)
    res.send(items)
  })

  // 校园风光
  const Scenery = require('../../models/Scenery')

  router.get('/scenery', async (req,res) => {
    const items = await Scenery.find()
    res.send(items)
  })

  app.use('/web/api', router)

}