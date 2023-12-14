import React from 'react'
import PropTypes from 'prop-types'
import './PopupResumeName.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import ResumeName from './ResumeName/ResumeName'

function PopupConfirmationExit({ isOpen, onClose }) {
  return (
    <PopupСontainer
      isOpen={isOpen}
      onClose={onClose}
      popupName="popup-confirmation"
      closeButtonBlack
      element={<ResumeName />}
    />
  )
}

PopupConfirmationExit.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default PopupConfirmationExit
