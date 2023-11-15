import React from 'react'
import PropTypes from 'prop-types'
import './PopupLogin.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
// import LoginForm from '../Login/LoginForm/LoginForm'
import Login from '../Login/Login'

function PopupLogin({ isOpen, onClose }) {
	return (
		<PopupСontainer
			isOpen={isOpen}
			onClose={onClose}
			popupName="popupRegister"
			element={<Login />}
			// element={<LoginForm />}
		/>
	)
}

PopupLogin.propTypes = {
	onClose: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
}

export default PopupLogin
