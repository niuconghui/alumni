const mongoose = require('mongoose')
const moment = require('moment')
const CategoryModel = require('./Category')
const StudensModel = require('./StudentUser')

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId, ref: StudensModel
  },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: CategoryModel },
  title: { type: String },
  content: { type: String, required: true },
  starNum: { type: Number, default: 0 },
  commentNum: { type: Number, default: 0 },
  created_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  last_modified_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
})

module.exports = mongoose.model('Exchange',schema)