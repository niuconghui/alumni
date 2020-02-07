const mongoose = require('mongoose')

const moment = require('moment')

const ObjectId = mongoose.SchemaTypes.ObjectId

const schema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'StudentUser' },
  exchangeId: { type: ObjectId, ref: 'Exchange' },
  value: { type: Boolean },
  created_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  last_modified_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
})

module.exports = mongoose.model('Star',schema)