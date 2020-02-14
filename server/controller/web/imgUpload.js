exports.imgUpload = async(req, res) => {
  const file = req.file
  file.url = `http://localhost:3000/uploads/${file.filename}`
  res.send(file)
}

// app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
//   const file = req.file
//   file.url = `http://localhost:3000/uploads/${file.filename}`
//   res.send(file)
// })