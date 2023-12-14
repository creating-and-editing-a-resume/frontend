import './PopupConfirmationRegister.scss'
import PropTypes from 'prop-types'
import PopupСontainer from '../PopupContainer/PopupContainer'
import ConfirmationRegister from './ConfirmationRegister/ConfirmationRegister'

function PopupConfirmationRegister({ isOpen, onClose }) {
  return (
    <PopupСontainer
      isOpen={isOpen}
      onClose={onClose}
      popupName="popup-confirmation-reg"
      closeButton={false}
      element={<ConfirmationRegister onClose={onClose} />}
    />
  )
}

PopupConfirmationRegister.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}
export default PopupConfirmationRegister
