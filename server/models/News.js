const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String},
  author: {type: String},
  content: {type: String},
  issueTime: {type: String}
})

module.exports = mongoose.model('News',schema)