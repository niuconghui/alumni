const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  donateUserId: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'StudentUser'
  },
  donateWay: { type: String },
  donateAmount: { type: Number },
})

module.exports = mongoose.model('Donate',schema)