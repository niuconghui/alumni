const mongoose = require('mongoose')
const encrypt = require('../utils/encrypt')

const schema = new mongoose.Schema({
  adminName: {type: String},
  password: {
    type: String,
    select: false,
    set (val) {
      return encrypt(val)
    },
  }
})

module.exports = mongoose.model('adminUser',schema)