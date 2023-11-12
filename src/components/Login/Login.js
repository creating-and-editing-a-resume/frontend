import React from 'react'
import FormTitle from '../Register/FormTitle/FormTitle'
import FormRedirection from '../Register/FormRedirection/FormRedirection'
import LoginForm from './LoginForm/LoginForm'
import './Login.scss'

const Login = ({ onLogin }) => (
	<section className="login">
		<FormTitle greeting="Привет!" />
		<LoginForm button="Войти" onSubmit={onLogin} />
		<FormRedirection
			text="Еще не зарегистрированы?"
			button="Зарегистрироваться"
			path="/signup"
		/>
	</section>
)
export default Login
