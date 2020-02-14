module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://123.207.183.171:27017/alumni',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })

  // mongoose.connect('mongodb://127.0.0.1:27017/alumni',{
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useFindAndModify: true
  // })

  require('require-all')(__dirname + '/../models')
  

}