const nodemailer = require("nodemailer");

const Email  = {
  config: {
    host: "smtp.qq.com",
    port: 587,
    auth: {
      user: '923542434@qq.com', // generated ethereal user
      pass: 'gophtkwacbihbeej' // generated ethereal password
    }
  },
  get transporter() {
    return nodemailer.createTransport(this.config)
  },

  get verify() {
    return Math.random().toString().substring(2,8)
  }
}

module.exports = Email

// 此文件无用
