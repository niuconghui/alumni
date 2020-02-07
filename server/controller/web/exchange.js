const result = require('../../utils/result')

const ExchangeModel = require('../../models/Exchange')
const CategoryModel = require('../../models/Category')

exports.getExchange = async(req, res) => {
  let items
  const queryKey = req.query.type
  const page = req.query.page

  if (/\d/.test(page) && page > 0) {
    if (queryKey === '5e37b9e560a86c23842f5306') {
      // queryKey === 推荐
      items = await ExchangeModel
        .find()
        .populate('userId')
        .sort("-starNum")
        .limit(10)
        .skip( (page - 1) * 10 )
    } else if (queryKey === '5e37b9d260a86c23842f5305') {
      // queryKey === 全部
      items = await ExchangeModel
        .find()
        .populate('userId')
        .sort("-created_time")
        .limit(10)
        .skip( (page - 1) * 10 )
    } else if (queryKey) {
      items = await ExchangeModel
        .find({ category: queryKey })
        .populate('userId')
        .limit(10)
        .skip( (page - 1) * 10 )
    }
    else {
      items = await ExchangeModel
        .find()
        .populate('userId')
        .limit(10)
        .skip( (page - 1) * 10 )
    }
  } else {
    items = await ExchangeModel.find()
  }
   
  res.send(result.success({items, page}))
}

exports.getExchangeDetail = async(req, res) => {
  const items = await ExchangeModel
    .findById(req.params.id)
    .populate('userId')
  res.send(result.success(items))
}

exports.getCategory = async(req, res) => {
  const items = await CategoryModel.find({ tag: '交流'})
  res.send(result.success(items))
}

exports.savaExchange = async(req, res) => {
  const model = await ExchangeModel.create(req.body)
  res.send(result.success(model))
}