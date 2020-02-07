const result = require('../../utils/result')

const AlumniModel = require('../../models/Demeanor')

exports.getAlumni = async(req, res) => {
  let items 
  const total = await AlumniModel.find({ tag: '校友'}).count()
  const page = req.query.page
  const limit = req.query.limit
  if(/\d/.test(page) && page > 0 && /\d/.test(limit)) {
    items = await AlumniModel
      .find({ tag: '校友'})
      .sort({ "issueTime": -1 })
      .skip( (page - 1) * limit )
      .limit( limit * 1 ) 
  } else {
    items = await AlumniModel
    .find({ tag: '校友'})
    .sort({ "issueTime": -1 })
  }

  res.send(result.success({
    items,
    total,
    page
  }))
}

exports.getAcademician = async(req, res) => {
  let items 
  const total = await AlumniModel.find({ tag: '院士'}).count()
  const page = req.query.page
  const limit = req.query.limit
  if(/\d/.test(page) && page > 0 && /\d/.test(limit)) {
    items = await AlumniModel
      .find({ tag: '院士'})
      .sort({ "issueTime": -1 })
      .skip( (page - 1) * limit )
      .limit( limit * 1 ) 
  } else {
    items = await AlumniModel
    .find({ tag: '院士'})
    .sort({ "issueTime": -1 })
  }

  res.send(result.success({
    items,
    total,
    page
  }))
}

exports.getDemeanorDetail = async(req, res) => {
  const items = await AlumniModel
    .findById(req.params.id)
  res.send(result.success(items))
}