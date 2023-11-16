import React from 'react'
import PropTypes from 'prop-types'
import './Login.scss'
import '../Register/Register.scss'
import FormTitle from '../Register/FormTitle/FormTitle'
import FormRedirection from '../Register/FormRedirection/FormRedirection'
import LoginForm from './LoginForm/LoginForm'
import loginImage from '../../logo.svg'

const Login = ({ onLogin, isOpen }) => (
	<section className={`login register ${isOpen && 'register_popup'}`}>
		{isOpen && (
			<img
				src={loginImage}
				alt="login icon"
				className="login__image register__image"
			/>
		)}
		<div
			className={`login__container register__container ${
				isOpen && 'register__container_popup'
			}`}
		>
			{isOpen && (
				<p className="login__description register__description">
					Чтобы сохранить резюме, необходимо войти или
					зарегистрироваться
				</p>
			)}
			<FormTitle page="login" greeting="Вход" isOpen={isOpen} />
			<LoginForm buttonText="Войти" onSubmit={onLogin} isOpen={isOpen} />
			<a href="_blank" className="login__restore-password">
				Не помню пароль
			</a>
			<FormRedirection
				page="login"
				button="Зарегистрироваться"
				path="/signup"
				isOpen={isOpen}
			/>
		</div>
	</section>
)

Login.propTypes = {
	onLogin: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
}

export default Login
