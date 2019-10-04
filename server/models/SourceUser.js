const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  studentSID: {type: String},
})

module.exports = mongoose.model('SourceUser',schema)