import React from 'react'
import PropTypes from 'prop-types'
import './PopupRegister.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
import Register from '../Register/Register'
// import RegistrationForm from '../Register/RegistrationForm/RegistrationForm'

function PopupRegister({ isOpen, onClose }) {
	return (
		<PopupСontainer
			isOpen={isOpen}
			onClose={onClose}
			popupName="popupRegister"
			element={<Register />}
			// element={<RegistrationForm />}
		/>
	)
}

PopupRegister.propTypes = {
	onClose: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
}

export default PopupRegister
