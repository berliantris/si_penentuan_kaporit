const mongoose = require('mongoose')
const { Schema } = mongoose

const kaporitSchema = new Schema({
  himpunanSedikit: {
    min: Number,
    max: Number
  },
  himpunanBanyak: {
    min: Number,
    max: Number
  },
})

const kaporitModel = mongoose.model('kaporitCollections', kaporitSchema)
module.exports = kaporitModel