const express = require('express')

const app = express() 

app.use(require('cors')())
app.use(express.json())   
app.use('/uploads',express.static(__dirname + '/uploads')) 
app.set('secret','niuconghui')

require('./plugins/db')(app)     
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, (req,res) => {
  console.log('http://localhost:3000')
})