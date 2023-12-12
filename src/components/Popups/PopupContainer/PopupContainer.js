import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './PopupContainer.scss'
import classNames from 'classnames'

function PopupContainer({
  isOpen,
  onClose,
  popupName,
  element,
  closeButton,
  closeButtonBlack,
}) {
  // Для закрытия попапа по клавише escape
  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return (
    <div className={`popup ${popupName} ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup__container">
        {element}
        {closeButton && (
          <button
            className={classNames(
              'popup__btn-close',
              closeButtonBlack && 'popup__btn-close_black'
            )}
            type="button"
            onClick={onClose}
            label="button"
          />
        )}
      </div>
    </div>
  )
}

PopupContainer.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  popupName: PropTypes.string.isRequired,
  element: PropTypes.element.isRequired,
  closeButton: PropTypes.bool,
  closeButtonBlack: PropTypes.bool,
}

PopupContainer.defaultProps = {
  closeButton: true,
  closeButtonBlack: false,
}

export default PopupContainer
