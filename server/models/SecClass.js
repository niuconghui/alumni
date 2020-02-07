const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  sec_name: { type: String },
  major: [{
    major_name: { type: String },
    class: [{
      class_name: { type: String }
    }]  
  }]
})

module.exports = mongoose.model('secClass',schema)