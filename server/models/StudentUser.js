const mongoose = require('mongoose')
const encrypt = require('../utils/encrypt')

const moment = require('moment')

const schema = new mongoose.Schema({
  studentName: { type: String , required: true },
  password: {
    type: String,
    select: false,
    set (val) {
      return encrypt(val)
    },
    required: true
  },
  avatar: { type: String },
  trueName: { type: String, default: '' },
  gender: { type: String, default: '' },
  studentID: { type: String, required: true, default: '' },
  department: { type: Array, default: () => [] },
  startYear: { type: String, default: '' },
  endYear: { type: String, default: '' },
  grade: { type: String, default: '' },
  phoneID: { type: String, default: '' },
  email: { type: String, required: true  },
  birthplace: { type: Array, default: () => [] },
  address: { type: Array, default: () => [] },
  company_name: { type: String, default: '' },
  birthday: { type: String, default: '' },
  motto: { type: String , default: ''},
  qq: { type: String , default: ''},
  wechat: { type: String , default: ''},
  created_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  last_modified_time: {
    type: String,
    default: moment().format('YYYY-MM-DD HH:mm:ss')
  },
  status: { type: String, enum: [0, 1, 2], default: 0}
})

module.exports = mongoose.model('studentUser',schema)