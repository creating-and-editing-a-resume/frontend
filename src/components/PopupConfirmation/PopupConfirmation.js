import React from 'react'
import PropTypes from 'prop-types'
import './PopupConfirmation.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import Confirmation from './Comfirmation/Confirmation'

function PopupConfirmation({ isOpen, onClose }) {
	return (
		<PopupСontainer
			isOpen={isOpen}
			onClose={onClose}
			popupName="popup-confirmation"
			element={<Confirmation />}
		/>
	)
}

PopupConfirmation.propTypes = {
	onClose: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
}

export default PopupConfirmation
