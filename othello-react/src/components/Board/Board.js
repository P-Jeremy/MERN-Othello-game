import React from 'react'
import Column from '../Column/Column'
import Pawn from '../Pawn/Pawn'
import PropTypes from 'prop-types'
import './Board.css'
import { Container } from 'react-bootstrap'

export default function Board ({ board, click, pieceType, handlePass }) {
  const returnPawn = (v) => {
    switch (v) {
      case 'BLACK':
        return (<Pawn color={'black'} />)
      case 'WHITE':
        return (<Pawn color={'white'} />)
      case 'BLANK':
        return (<Pawn />)
      default:
        break
    }
  }
  return (
    <div className="board_container">
      <div className="board">
        {board._squares.map((col, i) =>
          <Column key={i} click={click} col={col} />
        )}
        <div className="player_container">
          <span>pieceType</span>
          <div className="pawn_player">
            {returnPawn(pieceType)}
          </div>
          <button onClick={() => handlePass(pieceType)}>Passer</button>
        </div>
      </div>
    </div>
  )
}

Board.propTypes = {
  board: PropTypes.object,
  click: PropTypes.func,
  handlePass: PropTypes.func,
  pieceType: PropTypes.string
}
