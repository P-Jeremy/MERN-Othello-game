import React from 'react'
import Square from '../Square/Square'
import PropTypes from 'prop-types'
import './Column.css'

export default function Column ({ col, click }) {
  return (
    < div className="column">
      {col.map((square, i) => (
        <Square
          key={i}
          rowI={square._rowIndex}
          colI={square._colIndex}
          value={square._pieceType}
          click={click} />))}
    </div >
  )
}

Column.propTypes = {
  col: PropTypes.array,
  click: PropTypes.func
}
