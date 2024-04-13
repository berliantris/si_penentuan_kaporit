const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://trisIndonesia:pwTrisIndonesia@clustersistem.ifqbfxb.mongodb.net/dbSistemKaporit?')
const db = mongoose.connection
db.on('error', () => { console.log('koneksi db error') })
db.once('open', () => { console.log('sukses koneksi db') })

const session = require('express-session')
app.use(session({
  secret: 'secretSession',
  resave: false,
  saveUninitialized: false
}))

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use('/public', express.static('public'))

const adminRoute = require('./routes/adminRoute.js')
app.use(adminRoute)
const stafRoute = require('./routes/stafRoute.js')
app.use(stafRoute)

app.listen(port, () => {
  console.log('server is running')
})