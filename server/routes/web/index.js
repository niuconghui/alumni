module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams: true
  })

  const newsController = require('../../controller/web/news')
  const exchangeController = require('../../controller/web/exchange')
  const demeanorController = require('../../controller/web/demeanor')
  const sceneryController = require('../../controller/web/scenery')
  const userController = require('../../controller/web/user')

  const feedbackController = require('../../controller/web/feedback')

  // const exchangeModel = require('../../models/Exchange')
  // router.get('/insert', async (req, res) => {
  //   // await exchangeModel.deleteMany({})
  //   const exchanges = []
  //   for(let i=0;i<30;i++){
  //     let item = '其他'
  //     exchanges.push({ 
  //       userId: '5e3a71b150559a2444f5c07a' ,
  //       category: '5e37baba60a86c23842f530d',
  //       title: item + i,
  //       content: '测试'+item+'数据数据'
  //     })
  //   }
  //   await exchangeModel.insertMany(exchanges)
  //   res.send({code: 0})
  // })

  // ----------------------- 用户中心 ------------------------------

  router.post('/user/login', userController.login)

  router.get('/user/userInfo', userController.getUserInfo)

  // ----------------------- 新闻 ----------------------------------

  router.get('/news/center', newsController.getNewsCenter)

  router.get('/news/declear', newsController.getNewsDeclear)

  router.get('/news/detail/:id', newsController.getNewsDetail)

  // ----------------------- 校园交流 ---------------------------------

  router.get('/ecategory', exchangeController.getCategory)

  router.get('/exchange', exchangeController.getExchange)

  router.get('/exchange/detail/:id', exchangeController.getExchangeDetail)

  router.post('/exchange/create', exchangeController.savaExchange)

  // ----------------------- 校友风采 ----------------------------------

  router.get('/demeanor/alumni', demeanorController.getAlumni)

  router.get('/demeanor/academician', demeanorController.getAcademician)

  router.get('/demeanor/detail/:id', demeanorController.getDemeanorDetail)

  // ---------------------- 校园风光 --------------------------------

  router.get('/scenery', sceneryController.getScenery)

  // ---------------------- 反馈 ------------------------------------

  router.post('/feedback', feedbackController.postFeedback)

  router.get('/fcategory', feedbackController.getCategory)

  app.use('/web/api', router)

}