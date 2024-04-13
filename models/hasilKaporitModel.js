const mongoose = require('mongoose')
const { Schema } = mongoose

const hasilKaporitSchema = new Schema({
  namaStaf: String,
  kadarKlorin: Number,
  aturanFuzzy1: {
    k1: Number,
    aPredikat: Number,
    zHasil: Number
  },
  aturanFuzzy2: {
    k1: Number,
    aPredikat: Number,
    zHasil: Number
  },
  alphaTotal: Number,
  zTotal: Number,

  tanggalInt: Number,
  hariInt: Number,
  hariString: String,
  mingguInt: Number,
  bulanInt: Number,
  bulanString: String,
  tahunInt: Number
})

const hasilKaporitModel = mongoose.model('hasilKaporitCollections', hasilKaporitSchema)
module.exports = hasilKaporitModel