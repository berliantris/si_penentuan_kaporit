const mongoose = require('mongoose')
const { Schema } = mongoose

const klorinSchema = new Schema({
  himpunanRendah: {
    min: Number,
    max: Number
  },
  himpunanNormal: {
    min: Number,
    max: Number
  },
})

const klorinModel = mongoose.model('klorinCollections', klorinSchema)
module.exports = klorinModel