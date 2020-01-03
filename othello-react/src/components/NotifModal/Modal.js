import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap'

function NotifModal ({ data, click }) {
  console.log('DATA', data)

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{data.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{`${data.message}`}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={click} variant="primary">Ok</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

NotifModal.propTypes = {
  data: PropTypes.object,
  click: PropTypes.func
}

export default NotifModal
