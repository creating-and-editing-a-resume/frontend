import React from 'react'
import PropTypes from 'prop-types'
import './PopupConfirmationDelete.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import ConfirmationDelete from './ConfirmationDelete/ConfirmationDelete'

function PopupConfirmationDelete({
  arrValues,
  setArrValues,
  currentResume,
  setCurrentResume,
  isOpen,
  onClose,
  setValues,
  setImage,
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
          arrValues={arrValues}
          setArrValues={setArrValues}
          currentResume={currentResume}
          setCurrentResume={setCurrentResume}
          setValues={setValues}
          setImage={setImage}
        />
      }
    />
  )
}

PopupConfirmationDelete.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
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
  ).isRequired,
  setArrValues: PropTypes.func.isRequired,
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
  ).isRequired,
  setCurrentResume: PropTypes.func,
  setValues: PropTypes.func,
  setImage: PropTypes.func,
}

PopupConfirmationDelete.defaultProps = {
  setCurrentResume: () => {},
  setValues: () => {},
  setImage: () => {},
}

export default PopupConfirmationDelete
