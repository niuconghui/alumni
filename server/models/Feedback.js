const mongoose = require('mongoose')

const CategoryModel = require('./Category')

const moment = require('moment')

const schema = new mongoose.Schema({
  category: { type: mongoose.SchemaTypes.ObjectId, ref: CategoryModel },
  problemDesc: { type: String },
  qq: {type: String},
  weChat: {type: String},
  email: { type: String },
  created_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
})

module.exports = mongoose.model('Feedback',schema)