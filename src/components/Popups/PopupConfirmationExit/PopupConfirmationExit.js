import React from 'react'
import PropTypes from 'prop-types'
import './PopupConfirmationExit.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import Confirmation from './ConfirmationExit/ConfirmationExit'

function PopupConfirmationExit({
  isOpen,
  onClose,
  handleResumeNamePopupOpen,
  setValues,
  setImage,
  isEditMod,
  setArrValues,
  arrValues,
  values,
  setIsEditMod,
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
          setValues={setValues}
          setImage={setImage}
          isEditMod={isEditMod}
          setArrValues={setArrValues}
          arrValues={arrValues}
          values={values}
          setIsEditMod={setIsEditMod}
        />
      }
    />
  )
}

PopupConfirmationExit.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleResumeNamePopupOpen: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  isEditMod: PropTypes.bool.isRequired,
  arrValues: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.objectOf(
              PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
              ])
            ),
          ])
        ),
      ])
    )
  ),
  setArrValues: PropTypes.func.isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.bool,
            ])
          ),
        ])
      ),
    ])
  ),
  setIsEditMod: PropTypes.func.isRequired,
}

PopupConfirmationExit.defaultProps = {
  arrValues: {},
  values: {},
}

export default PopupConfirmationExit
