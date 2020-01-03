
const mongoose = require('mongoose')
var Schema = mongoose.Schema

const gameSchema = new Schema({
  blackPassCount: { type: Number },
  whitePassCount: { type: Number },
  game: { type: Object }
})

module.exports = mongoose.model('Game', gameSchema)
