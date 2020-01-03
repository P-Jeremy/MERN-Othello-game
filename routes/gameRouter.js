const express = require('express')
const router = express.Router()
const GameController = require('../controllers/gameController')

/** New instance of GameController */
const controller = new GameController()

/** GET ALL GAMES */
router.get('/', controller.getGames)

/** ADD A GAME */
router.post('/', controller.addGame)

/** UPDATE A GAME */
router.put('/:id', controller.updateGame)

/** UPDATE A GAME TO A NEW ONE  */
router.put('/newGame/:id', controller.newGame)

module.exports = router
