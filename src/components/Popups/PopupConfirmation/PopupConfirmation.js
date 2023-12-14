import React from 'react'
import PropTypes from 'prop-types'
import './PopupConfirmation.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import Confirmation from './Confirmation/Confirmation'

function PopupConfirmation({ isOpen, onClose, setCheckboxValues, setValues }) {
  return (
    <PopupСontainer
      isOpen={isOpen}
      onClose={onClose}
      popupName="popup-confirmation"
      element={
        <Confirmation
          onClose={onClose}
          setValues={setValues}
          setCheckboxValues={setCheckboxValues}
        />
      }
    />
  )
}

PopupConfirmation.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setCheckboxValues: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
}

export default PopupConfirmation
