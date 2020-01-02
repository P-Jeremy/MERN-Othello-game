import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import cloneDeep from 'lodash.clonedeep'
import Board from '../Board/Board'
import reversi from 'reversi'
import { Button } from 'react-bootstrap'

const GameGameInstance = reversi.Game
const game = new GameGameInstance()

export default class Game extends Component {
  state = {
    game: cloneDeep(game),
    isBlack: true,
    score: null,
    blackPassCount: 0,
    whitePassCount: 0

  }

  componentDidMount () {
    return this.countPoints()
  }

  /**
 * Allows to get the game score
 * set the score state according to score results
 */
  countPoints = () => {
    const score = this.state.game.board.countByPieceType()
    return this.setState({ score: score })
  }

  /**
 * Allows to change the pawn status if game move is legit
 * @param {*} x pawn X coordinate
 * @param {*} y pawn Y coordinate
 */
  handleClick = (x, y) => {
    const report = this.state.game.proceed(x, y)
    if (!report.isSuccess) {
      return
    }

    this.setState({ isBlack: !this.state.isBlack })
    return this.countPoints()
  }

  handlePass = () => {
    let { game, isBlack, blackPassCount, whitePassCount } = this.state
    switch (game._nextPieceType) {
      case 'BLACK':
        game._nextPieceType = 'WHITE'
        blackPassCount = blackPassCount + 1
        break
      case 'WHITE':
        game._nextPieceType = 'BLACK'
        whitePassCount = whitePassCount + 1
        break
      default:
        break
    }

    this.setState({ game: game, isBlack: !isBlack, whitePassCount: whitePassCount, blackPassCount: blackPassCount })

    if (whitePassCount >= 2) {
      alert('BLACK wins')
      this.setState({ whitePassCount: 0, blackPassCount: 0 })
      return this.handlReset()
    }

    if (blackPassCount >= 2) {
      alert('WHITE wins')
      this.setState({ whitePassCount: 0, blackPassCount: 0 })
      return this.handlReset()
    }
  }

  /**
 * Allows to reset the game
 */
  handlReset = () => {
    return this.setState({
      game: cloneDeep(game),
      isBlack: true,
      score: game.board.countByPieceType(),
      whitePassCount: 0,
      blackPassCount: 0
    })
  }

  render () {
    const { isBlack, game, score } = this.state
    const { handlReset, handleClick, handlePass } = this
    return (
      <div className="App" >
        <h1>{`Player: ${isBlack ? 'BLACK' : 'WHITE'}`}</h1>
        {
          score !== null &&
        <div>{`WHITE: ${score.WHITE} points Vs BLACK: ${score.BLACK} points`}
        </div>
        }
        {game.isEnded && <h2>{`${game.getHighScorer()} player wins !`}</h2>}
        <Button variant="danger" onClick={handlReset}>RESET</Button>
        <Button onClick={handlePass}>Pass</Button>
        <section>
          <Board click={handleClick} board={game._board} pieceType={game._nextPieceType} handlePass={handlePass}/>
        </section>
      </div>
    )
  }
}
