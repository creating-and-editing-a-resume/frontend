import React from 'react'
import PropTypes from 'prop-types'
import './PopupLogin.scss'
import PopupСontainer from '../PopupContainer/PopupContainer'
// import LoginForm from '../Login/LoginForm/LoginForm'
// import FormTitle from '../Register/FormTitle/FormTitle'
// import FormRedirection from '../Register/FormRedirection/FormRedirection'
import Login from '../Login/Login'

function PopupLogin({ isOpen, onClose, onLogin }) {
	return (
		<PopupСontainer
			isOpen={isOpen}
			onClose={onClose}
			popupName="popup-login"
			element={<Login onLogin={onLogin} isOpen={isOpen} />}
			// element={
			// 	<>
			// 		<LoginForm buttonText="Войти" onSubmit={onLogin} />
			// 		<a href="_blank" className="login__restore-password">
			// 			Не помню пароль
			// 		</a>
			// 		<FormTitle page="login" greeting="Привет!" />
			// 		<FormRedirection
			// 			page="login"
			// 			button="Зарегистрироваться"
			// 			path="/signup"
			// 		/>
			// 	</>
			// }
		/>
	)
}

PopupLogin.propTypes = {
	onLogin: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
}

export default PopupLogin
