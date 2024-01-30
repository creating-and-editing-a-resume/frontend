import React from 'react'
import PropTypes from 'prop-types'
import './PopupConfirmationExit.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import Confirmation from './ConfirmationExit/ConfirmationExit'

function PopupConfirmationExit({
  isOpen,
  onClose,
  handleResumeNamePopupOpen,
  isEditMod,
  setArrValues,
  setIsEditMod,
  clearData,
}) {
  return (
    <PopupСontainer
      isOpen={isOpen}
      onClose={onClose}
      popupName="popup-confirmation-exit"
      element={
        <Confirmation
          onClose={onClose}
          handleResumeNamePopupOpen={handleResumeNamePopupOpen}
          isEditMod={isEditMod}
          setArrValues={setArrValues}
          setIsEditMod={setIsEditMod}
          clearData={clearData}
        />
      }
    />
  )
}

PopupConfirmationExit.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleResumeNamePopupOpen: PropTypes.func.isRequired,
  isEditMod: PropTypes.bool.isRequired,
  setArrValues: PropTypes.func.isRequired,
  setIsEditMod: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
}

export default PopupConfirmationExit
