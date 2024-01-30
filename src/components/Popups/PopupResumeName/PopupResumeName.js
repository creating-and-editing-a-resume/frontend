import React from 'react'
import PropTypes from 'prop-types'
import './PopupResumeName.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import ResumeName from './ResumeName/ResumeName'

function PopupConfirmationExit({
  isOpen,
  onClose,
  setValues,
  setArrValues,
  setIsEditMod,
  setCurrentResume,
  clearData,
}) {
  return (
    <PopupСontainer
      isOpen={isOpen}
      onClose={onClose}
      popupName="popup-confirmation"
      closeButtonBlack
      element={
        <ResumeName
          setValues={setValues}
          setArrValues={setArrValues}
          onClose={onClose}
          setIsEditMod={setIsEditMod}
          setCurrentResume={setCurrentResume}
          clearData={clearData}
        />
      }
    />
  )
}

PopupConfirmationExit.propTypes = {
  setIsEditMod: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setValues: PropTypes.func.isRequired,
  setArrValues: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
}

PopupConfirmationExit.defaultProps = {
  setIsEditMod: () => {},
}

export default PopupConfirmationExit
