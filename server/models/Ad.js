const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String},
  coverSrc: { type: String },
  description: { type: String }
})

module.exports = mongoose.model('Ad',schema)