import React from 'react'
import PropTypes from 'prop-types'
import './PopupResumeName.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import ResumeName from './ResumeName/ResumeName'

function PopupConfirmationExit({
  isOpen,
  onClose,
  values,
  setValues,
  setArrValues,
  arrValues,
  setIsEditMod,
  currentResume,
  setCurrentResume,
}) {
  return (
    <PopupСontainer
      isOpen={isOpen}
      onClose={onClose}
      popupName="popup-confirmation"
      closeButtonBlack
      element={
        <ResumeName
          values={values}
          setValues={setValues}
          setArrValues={setArrValues}
          onClose={onClose}
          arrValues={arrValues}
          setIsEditMod={setIsEditMod}
          currentResume={currentResume}
          setCurrentResume={setCurrentResume}
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
  currentResume: PropTypes.objectOf(
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
  setCurrentResume: PropTypes.func.isRequired,
}

PopupConfirmationExit.defaultProps = {
  arrValues: [],
  values: {},
  setIsEditMod: () => {},
  currentResume: {},
}

export default PopupConfirmationExit
