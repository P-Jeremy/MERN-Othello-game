const Game = require('../models/Game')

module.exports = class ListController {
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
      const newGameToSave = new Game({ newGame, whitePassCount, blackPassCount })
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
    const { game, blackPassCount, whitePassCount } = req.body
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
      socketio.sockets.emit('gameUpdated', { result: result })

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
  async deleteGame (req, res) {
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
