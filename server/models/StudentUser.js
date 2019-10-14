const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  studentName: { type: String ,required: true},
  password: {
    type: String,
    select: false,
    set (val) {
      return require('bcrypt').hashSync(val,10)
    },
    required: true
  },
  avatar: { type: String },
  trueName: { type: String,required: true },
  gender: { type: String },
  studentID: { type: Number, required: true},
  numberID: { type: Number,required: true },
  phoneID: { type: Number,required: true },
  birthday: { type: String },
  birthplace: { type: String },
  address: { type: String,required: true },
  workspace: { type: String },
  startYear: { type: Number },
  endYear: { type: Number },
  class: { type: Number }

})

module.exports = mongoose.model('StudentUser',schema)