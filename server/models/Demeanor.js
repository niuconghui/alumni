const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String},
  coverSrc: { type: String },
  author: {type: String},
  excellentName: {type: String},
  tag: { type: String },
  content: {type: String},
  issueTime: {type: String}
})

module.exports = mongoose.model('Demeanor',schema)