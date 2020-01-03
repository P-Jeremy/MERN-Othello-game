import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Board from '../Board/Board'
import merge from 'lodash.merge'
import reversi from 'reversi'
import axios from 'axios'
import openSocket from 'socket.io-client'

const uri = 'http://localhost:8080'

const socket = openSocket(uri)

const Reversi = reversi.Game

const url = 'http://localhost:8080/api/game'

export default class Game extends Component {
  state = {
    game: null,
    nextPlayer: '',
    score: null,
    id: null,
    blackPassCount: 0,
    whitePassCount: 0
  }

  /** MERGE THE RESULT FROM DB INTO A NEW GAME INSTANCE
   * In order to get all Game class methods
   * @param res data from the mongo db
   * @returns game instance of data in state
   */
  turnDataInGameInstance = (res) => {
    const newGame = new Reversi()
    const dbGame = res.data[0].game
    merge(newGame, dbGame)
    const id = res.data[0]._id
    return this.setState({
      id,
      nextPlayer: newGame._nextPieceType,
      game: newGame,
      blackPassCount: res.data[0].blackPassCount,
      whitePassCount: res.data[0].whitePassCount
    })
  }

  /**
   * FETCH GAME DATA FROM DB
   * And turn it into Game instance
   */
  getGameData = () => {
    axios.get(url).then(res => {
      if (res.data.length) {
        this.turnDataInGameInstance(res)
      }
      return this.countPoints()
    })
      .catch(err => err)
  }

  componentDidMount () {
    this.getGameData()
    socket.on('gameUpdated', () => this.getGameData())
  }

  /**
   * Listens to the socket events
   */
  onMessage = () => {
    return this.getGameData()
  }

  /**
 * Allows to get the game score
 * set the score state according to countByPieceType() method results
 */
  countPoints = () => {
    const { game } = this.state
    if (game !== null) {
      const score = game.board.countByPieceType()
      return this.setState({ score: score })
    }
  }

  updateGame = () => {
    const { id, game, blackPassCount, whitePassCount } = this.state

    axios.put(`${url}/${id}`, {
      whitePassCount,
      blackPassCount,
      game
    })
    return this.setState({ nextPlayer: game._nextPieceType, blackPassCount, whitePassCount })
  }

  /**
 * Allows to change the pawn status if game move is legit
 * @param {*} x pawn X coordinate
 * @param {*} y pawn Y coordinate
 */
  handleClick = (x, y) => {
    const { game } = this.state
    /* CHECK IF THE MOVE IS LEGAL */
    const report = game.proceed(x, y)
    /* RETURNS IF ILLEGAL MOVE */
    if (!report.isSuccess) {
      return
    }
    this.updateGame()
    return this.countPoints()
  }

  handlePass = async () => {
    let { game, blackPassCount, whitePassCount, nextPlayer } = this.state

    switch (game._nextPieceType) {
      case 'BLACK':
        game._nextPieceType = 'WHITE'
        blackPassCount++
        nextPlayer = 'WHITE'
        break
      case 'WHITE':
        game._nextPieceType = 'BLACK'
        whitePassCount++
        nextPlayer = 'BLACK'
        break
      default:
        break
    }

    if (whitePassCount > 1) {
      alert('BLACK wins')
      this.setState({ whitePassCount: 0, blackPassCount: 0 })
      return this.handleNewGame()
    }

    if (blackPassCount > 1) {
      alert('WHITE wins')
      this.setState({ whitePassCount: 0, blackPassCount: 0 })
      return this.handleNewGame()
    }

    await this.setState({ nextPlayer, whitePassCount: whitePassCount, blackPassCount: blackPassCount })
    this.updateGame()
  }

  /**
 * Allows to reset the game
 */
  handleNewGame = async () => {
    const { id, blackPassCount, whitePassCount } = this.state
    const newGame = new Reversi()
    /* IF NO GAME CREATE A NEW ONE */
    if (id === null) {
      this.setState({
        game: newGame,
        whitePassCount: 0,
        blackPassCount: 0,
        nextPlayer: newGame._nextPieceType,
        score: newGame.board.countByPieceType()
      })
      const res = await axios.post(url, { newGame })
      this.setState({ id: res.data._id, nextPlayer: res.data._nextPieceType, blackPassCount: 0, whitePassCount: 0 })
    }
    /* ELSE CLEAR THE EXISTING ONE */
    axios.put(`${url}/newGame/${id}`, { newGame, whitePassCount: 0, blackPassCount: 0 })
      .then(() => this.setState({ game: newGame, nextPlayer: newGame._nextPieceType, blackPassCount, whitePassCount, score: null }))
      .catch(err => err)
  }

  render () {
    const { nextPlayer, score, game, id } = this.state
    const { handleNewGame, handleClick, handlePass } = this
    return (
      <div className="App" >
        {game !== null && !game.isEnded &&
          <>
            <h1>{`Player: ${nextPlayer}`}</h1>
            <span>
              {
                `WHITE: ${score === null ? 2 : score.WHITE} points 
            Vs BLACK: ${score === null ? 2 : score.BLACK} points`
              }
            </span>
          </>
        }
        {game !== null && game.isEnded && <h2>{`${game.getHighScorer()} player wins !`}</h2>}
        <section>
          {
            game !== null &&
            <Board click={handleClick} board={game._board} />
          }
          <Button
            tabIndex={0}
            variant={id === null ? 'primary' : 'danger'}
            onClick={handleNewGame}>
            {id === null ? 'New game' : 'Reset'}
          </Button>
          <Button onClick={handlePass}>Pass</Button>
        </section>
      </div>
    )
  }
}
