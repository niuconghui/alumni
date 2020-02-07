const mongoose = require('mongoose')

const moment = require('moment')

const schema = new mongoose.Schema({
  studentName: { type: String ,required: true },
  password: {
    type: String,
    select: false,
    set (val) {
      return require('bcrypt').hashSync(val,10)
    },
    required: true
  },
  avatar: { type: String, default: '/public/avatar-default.png' },
  trueName: { type: String },
  gender: { type: String },
  studentID: { type: Number },
  department: {
    sec_name: { type: String },
    major: [{
      major_name: { type: String },
      class: [{
        class_name: { type: String }
      }]  
    }]
  },
  startYear: { type: String },
  endYear: { type: String },
  phoneID: { type: Number },
  email: { type: String },
  birthplace: {
    name: { type: String },
    city: [{
      name: { type: String },
      area: [{
        name: { type: String }
      }]  
    }]
  },
  address: {
    name: { type: String },
    city: [{
      name: { type: String },
      area: [{
        name: { type: String }
      }]  
    }]
  },
  company_name: { type: String },
  birthday: { type: String },
  motto: { type: String, default: '这个人很懒，什么都没说~~~' },
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