const result = require('../../utils/result')

const AdModel = require('../../models/Ad')

exports.getAd = async(req, res) => {
  const items = await AdModel
    .find()
  res.send(result.success(items))
}