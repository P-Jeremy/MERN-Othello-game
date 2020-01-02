import React from 'react'
import Pawn from '../Pawn/Pawn'
import PropTypes from 'prop-types'

import './Square.css'

export default function Square ({ value, click, rowI, colI }) {
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
    <div className="square" onClick={() => click(rowI, colI)}>
      {returnPawn(value)}
    </div>
  )
}

Square.propTypes = {
  value: PropTypes.string,
  click: PropTypes.func,
  rowI: PropTypes.number,
  colI: PropTypes.number
}
