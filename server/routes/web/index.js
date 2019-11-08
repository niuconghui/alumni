module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })


  // 校园新闻
  const News = require('../../models/News')

  // 新闻中心 热点新闻
  router.get('/news/center', async (req,res) => {
    const items = await News.find({ tag: '新闻'}).sort({ "issueTime": -1 })
    res.send(items)
  })
  // 公告中心 
  router.get('/news/declear', async (req,res) => {
    const items = await News.find({ tag: '公告'}).sort({ "issueTime": -1 })
    res.send(items)
  })

  // 详情页
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