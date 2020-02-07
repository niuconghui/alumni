const result = require('../../utils/result')

const NewsModel = require('../../models/News')

exports.getNewsCenter = async(req, res) => {
  let items 
  const total = await NewsModel.find({ category: '5e363aa9fb717410b80ea6ef'}).countDocuments()
  const page = req.query.page
  const limit = req.query.limit
  if(/\d/.test(page) && page > 0 && /\d/.test(limit)) {
    items = await NewsModel
      .find({ category: '5e363aa9fb717410b80ea6ef'})
      .sort({ "issueTime": -1 })
      .skip( (page - 1) * limit )
      .limit( limit * 1 ) 
  } else {
    items = await NewsModel
    .find({ category: '5e363aa9fb717410b80ea6ef'})
    .sort({ "issueTime": -1 })
  }

  res.send(result.success({
    items,
    total,
    page
  }))
}

exports.getNewsDeclear = async(req, res) => {
  let items 
  const total = await NewsModel.find({ category: '5e363b10fb717410b80ea6f1'}).countDocuments()
  const page = req.query.page
  const limit = req.query.limit
  if(/\d/.test(page) && page > 0 && /\d/.test(limit)) {
    items = await NewsModel
      .find({ category: '5e363b10fb717410b80ea6f1'})
      .sort({ "issueTime": -1 })
      .skip( (page - 1) * limit )
      .limit( limit * 1 ) 
  } else {
    items = await NewsModel
    .find({ category: '5e363b10fb717410b80ea6f1'})
    .sort({ "issueTime": -1 })
  }

  res.send(result.success({
    items,
    total,
    page
  }))
}

exports.getNewsDetail = async(req, res) => {
  const items = await NewsModel
    .findById(req.params.id)
  res.send(result.success(items))
}
