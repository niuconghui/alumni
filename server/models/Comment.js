const mongoose = require('mongoose')
const moment = require('moment')
const ObjectId = mongoose.SchemaTypes.ObjectId

const schema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'studentUser' },
  exchange: { type: ObjectId, ref: 'Exchange' },
  content: { type: String },
  created_time: {
    type: String,
    default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  },
  last_modified_time: {
    type: String,
    default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  },
})


schema.post('remove', doc => {

  const { exchange } = doc
  const ExchangeModle = require('./Exchange')
  ExchangeModle.updateOne({_id: exchange}, { $inc: { commentNum: -1 } }).exec((err, res) => {
    console.log(err, res);
  })

})

module.exports = mongoose.model('Comment', schema)