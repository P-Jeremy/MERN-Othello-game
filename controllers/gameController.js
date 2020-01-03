const Game = require('../models/Game')

module.exports = class GameController {
  /** Get all the game in Db */
  async getGames (req, res) {
    try {
      const results = await Game.find()
      return res
        .status(200)
        .json(results)
        .end()
    } catch (error) {
      return res
        .status(400)
        .end()
    }
  };

  /** Add a game in DB */
  async addGame (req, res) {
    const { newGame, blackPassCount, whitePassCount } = req.body
    try {
      const newGameToSave = new Game({ game: newGame, blackPassCount: blackPassCount, whitePassCount: whitePassCount })
      const result = await newGameToSave.save()
      const socketio = req.app.get('socketIo')
      socketio.sockets.emit('gameUpdated', { result: result })
      return res
        .status(200)
        .json(result)
        .end()
    } catch (error) {
      return res
        .status(400)
        .json(error)
    }
  };

  /** Update a game */
  async updateGame (req, res) {
    const { id } = req.params
    const { game, blackPassCount, whitePassCount, newMove } = req.body
    try {
      const result = await Game.findOneAndUpdate({ _id: id }, {
        $set:
        {
          game: game,
          whitePassCount: whitePassCount,
          blackPassCount: blackPassCount
        }
      },
      { new: true }
      )
      const socketio = req.app.get('socketIo')
      socketio.sockets.emit('gameUpdated', { message: `${!newMove ? 'The game has been updated' : 'A move has been played'}`, title: `${!newMove ? 'Update' : 'New move'}`, newMove })

      return res
        .status(200)
        .json(result)
        .end()
    } catch (error) {
      return res
        .status(403)
        .json(error)
        .end()
    }
  };

  /** Delete a game in DB */
  async newGame (req, res) {
    const { id } = req.params
    const { newGame, whitePassCount, blackPassCount } = req.body
    try {
      const result = await Game.findOneAndUpdate({ _id: id },
        { $set: { game: newGame, whitePassCount, blackPassCount } },
        { new: true }
      )
      const socketio = req.app.get('socketIo')
      socketio.sockets.emit('gameUpdated', { result: result })
      return res
        .status(200)
        .json(result)
        .end()
    } catch (error) {
      return res
        .status(400)
        .json(error)
        .end()
    }
  }
}
