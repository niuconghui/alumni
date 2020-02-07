const mongoose = require('mongoose')
const moment = require('moment')

const schema = new mongoose.Schema({
  title: { type: String },
  value: { type: String },
  tag: { type: String },
  created_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  last_modified_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
})

module.exports = mongoose.model('Category',schema)