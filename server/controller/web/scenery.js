const result = require('../../utils/result')

const SceneryModel = require('../../models/Scenery')

exports.getScenery = async(req, res) => {
  const items = await SceneryModel
    .find()
  res.send(result.success(items))
}