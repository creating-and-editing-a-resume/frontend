import React from 'react'
import PropTypes from 'prop-types'
import './PopupConfirmationDelete.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import ConfirmationDelete from './ConfirmationDelete/ConfirmationDelete'

function PopupConfirmationDelete({
  setArrValues,
  setCurrentResume,
  isOpen,
  onClose,
  clearData,
}) {
  return (
    <PopupСontainer
      isOpen={isOpen}
      onClose={onClose}
      popupName="popup-confirmation-delete"
      closeButton={false}
      element={
        <ConfirmationDelete
          onClose={onClose}
          setArrValues={setArrValues}
          setCurrentResume={setCurrentResume}
          clearData={clearData}
        />
      }
    />
  )
}

PopupConfirmationDelete.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setArrValues: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func,
  clearData: PropTypes.func,
}

PopupConfirmationDelete.defaultProps = {
  setCurrentResume: () => {},
  clearData: () => {},
}

export default PopupConfirmationDelete
