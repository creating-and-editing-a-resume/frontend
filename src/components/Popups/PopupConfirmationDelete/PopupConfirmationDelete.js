import React from 'react'
import PropTypes from 'prop-types'
import './PopupConfirmationDelete.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import ConfirmationDelete from './ConfirmationDelete/ConfirmationDelete'

function PopupConfirmationDelete({ isOpen, onClose }) {
  return (
    <PopupСontainer
      isOpen={isOpen}
      onClose={onClose}
      popupName="popup-confirmation-delete"
      closeButton={false}
      element={<ConfirmationDelete onClose={onClose} />}
    />
  )
}

PopupConfirmationDelete.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default PopupConfirmationDelete
