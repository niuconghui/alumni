const result = require('../../utils/result')

const feedbackModel = require('../../models/Feedback')
const CategoryModel = require('../../models/Category')

exports.postFeedback = async(req, res) => {
  const model = await feedbackModel.create(req.body)
  res.send(result.success(model))
}

exports.getCategory = async(req, res) => {
  const items = await CategoryModel.find({ tag: '反馈'})
  res.send(result.success(items))
}