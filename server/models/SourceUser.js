const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  studentSID: { type: Number },
})

module.exports = mongoose.model('sourceUser',schema)