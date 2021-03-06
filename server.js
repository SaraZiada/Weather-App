// Server setup
const express = require('express')
const app = express()
const path = require('path')
const api = require('./server/routes/api')

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherdb', { useNewUrlParser: true })

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', api)
 

const port = 4200
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})