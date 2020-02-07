const mongoose = require('mongoose')

const moment = require('moment')

const CategoryModel = require('./Category')

const schema = new mongoose.Schema({
  title: { type: String },
  author: { type: String },
  content: { type: String },
  issueTime: { type: String },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: CategoryModel },
  created_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  last_modified_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
})

module.exports = mongoose.model('News', schema)