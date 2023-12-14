import React from 'react'
import PropTypes from 'prop-types'
import './PopupConfirmationExit.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import Confirmation from './ComfirmationExit/ConfirmationExit'

function PopupConfirmationExit({
  isOpen,
  onClose,
  // setCheckboxValues,
  // setValues,
}) {
  return (
    <PopupСontainer
      isOpen={isOpen}
      onClose={onClose}
      popupName="popup-confirmation-exit"
      element={
        <Confirmation
          onClose={onClose}
          // setValues={setValues}
          // setCheckboxValues={setCheckboxValues}
        />
      }
    />
  )
}

PopupConfirmationExit.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  // setCheckboxValues: PropTypes.func.isRequired,
  // setValues: PropTypes.func.isRequired,
}

export default PopupConfirmationExit
