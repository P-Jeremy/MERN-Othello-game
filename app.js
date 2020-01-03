require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const gameRouter = require('./routes/gameRouter')
const mongoConf = process.env.MONGO_CONFIG_URL

mongoose
  .connect(mongoConf, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to DB!')
  })
  .catch(() => {
    console.log(' Unable to connect to DB...')
  })

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/game', gameRouter)

module.exports = app
