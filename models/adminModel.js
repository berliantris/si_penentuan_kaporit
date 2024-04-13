const mongoose = require('mongoose')
const { Schema } = mongoose

const adminSchema = new Schema({
  namaLengkap: String,
  username: String,
  email: String,
  password: String,
})

const adminModel = mongoose.model('adminCollections', adminSchema)
module.exports = adminModel