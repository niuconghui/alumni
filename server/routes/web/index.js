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

  const adController = require('../../controller/web/ad')

  const imgUploadController = require('../../controller/web/imgUpload')

  const socketController = require('../../controller/web/socket')

  router.get('/socketUrl', (req, res) => {
    res.send(console.log(socketController.createChatroom))
  })
  
  // ----------------------- 用户中心 ------------------------------
  router.get('/user/susers', userController.getSUsers)

  router.get('/user/checkUsername', userController.checkUsername)

  router.get('/user/checkEmail', userController.checkEmail)

  router.post('/user/register', userController.register)

  router.post('/user/login', userController.login)

  router.get('/user/userInfo', userController.getUserInfo)

  router.get('/user/otherUserInfo/:id', userController.getOtherUserInfo)

  router.put('/user/userInfo', userController.saveUserInfo)

  router.get('/department', userController.getDepartments)

  router.get('/city', userController.getCities)


  // ----------------------- 新闻 ----------------------------------

  router.get('/news/center', newsController.getNewsCenter)

  router.get('/news/declear', newsController.getNewsDeclear)

  router.get('/news/detail/:id', newsController.getNewsDetail)

  // ----------------------- 校园交流 ---------------------------------

  router.get('/ecategory', exchangeController.getCategory)

  router.get('/exchange', exchangeController.getExchange)

  router.post('/exchange/create', exchangeController.savaExchange)

  router.put('/exchange/update/:id', exchangeController.updateExchange)

  router.delete('/exchange/delete/:id', exchangeController.deleteExchange)

  router.get('/exchange/detail/:id', exchangeController.getExchangeDetail)

  router.get('/user/exchanges/:id', exchangeController.getUserExchanges)

  router.get('/user/otherUserExchanges/:id', exchangeController.getOtherUserExchanges)

  router.post('/star/:id', exchangeController.star)

  router.post('/comment/:id', exchangeController.saveComment)

  router.get('/comments/:id', exchangeController.getComments)

  router.delete('/comment/:id', exchangeController.deleteComment)

  // ----------------------- 校友风采 ----------------------------------

  router.get('/demeanor/alumni', demeanorController.getAlumni)

  router.get('/demeanor/academician', demeanorController.getAcademician)

  router.get('/demeanor/detail/:id', demeanorController.getDemeanorDetail)

  router.get('/demeanor/search', demeanorController.search)

  router.get('/demeanor/province', demeanorController.getProvince)

  // ---------------------- 校园风光 --------------------------------

  router.get('/scenery', sceneryController.getScenery)

  // ---------------------- 反馈 ------------------------------------

  router.post('/feedback', feedbackController.postFeedback)

  router.get('/fcategory', feedbackController.getCategory)

  // ---------------------- 广告 ------------------------------------

  router.get('/ad', adController.getAd)

  // ----------------------- 图片上传 -------------------------------
  // imgUploadController
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  router.post('/upload', upload.single('file'), imgUploadController.imgUpload)

  app.use('/web/api', router)

}