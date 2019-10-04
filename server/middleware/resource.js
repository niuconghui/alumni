module.exports = options => {
  return async (req,res,next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.model = require(`../models/${modelName}`)
    next()
  }
}