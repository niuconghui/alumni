const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String},
  image: {type: String},
  description: {type: String}
})

module.exports = mongoose.model('Scenery',schema)