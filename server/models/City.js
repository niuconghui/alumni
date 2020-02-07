const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  code: { type: Number },
  city: [{
    name: { type: String },
    code: { type: Number },
    area: [{
      name: { type: String },
      code: { type: Number },
    }]  
  }]
})

module.exports = mongoose.model('City',schema)