const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {type: String},
  // image: {
  //   photo: {type: String},
  //   imageList: [
  //     { url: { type: String}}
  //   ]
  // },
  image: { type: String },
  description: {type: String}
})

module.exports = mongoose.model('Scenery',schema)