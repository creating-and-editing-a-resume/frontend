import React from 'react'
import PropTypes from 'prop-types'
import './PopupRegister.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import Register from '../Register/Register'
// import RegistrationForm from '../Register/RegistrationForm/RegistrationForm'

function PopupRegister({ isOpen, onClose, onRegister }) {
	return (
		<PopupСontainer
			isOpen={isOpen}
			onClose={onClose}
			popupName="popupRegister"
			element={<Register onRegister={onRegister} />}
			// element={<RegistrationForm />}
		/>
	)
}

PopupRegister.propTypes = {
	onRegister: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
}

export default PopupRegister
