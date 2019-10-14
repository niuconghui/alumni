const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'StudentUser'
  },
  content: { type: String,required: true },
  star: { type: Number },
  starId: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'StudentUser'
  },
  commCount: { type: Number },
  commContent: { type: String },
  commentId: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'StudentUser'
  },
})

module.exports = mongoose.model('Exchange',schema)