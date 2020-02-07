const express = require('express')

const app = express() 

app.use(require('cors')())
app.use(express.json())   
app.use('/uploads',express.static(__dirname + '/uploads')) 
app.set('secret','niuconghui')

// 数据库
require('./plugins/db')(app)     
// 邮箱验证
require('./plugins/nodemailer')

// 路由
require('./routes/admin')(app)
require('./routes/admin/verify')(app)

require('./routes/web')(app)

app.listen(3000, (req,res) => {
  console.log('http://localhost:3000')
})