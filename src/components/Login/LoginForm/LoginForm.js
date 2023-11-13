import React, { useState } from 'react'
import { EMAIL_REGEX } from '../../../constants/regex'
import './LoginForm.scss'
import RegistrationField from '../../Register/RegistrationForm/RegistrationField/RegistrationField'

const LoginForm = ({ button, onSubmit }) => {
	const [values, setValues] = useState({})
	const [errors, setErrors] = useState({})
	const [isValid, setIsValid] = useState(false)
	// eslint-disable-next-line no-unused-vars
	const [responseMessage, setResponseMessage] = useState('')

	const handleChange = evt => {
		const { name, value } = evt.target
		setValues({ ...values, [name]: value })
		setErrors({ ...errors, [name]: evt.target.validationMessage })
		setIsValid(evt.target.closest('form').checkValidity())
	}

	const handleEmailChange = evt => {
		handleChange(evt)
		const { name, value } = evt.target
		if (name === 'email' && !EMAIL_REGEX.test(value)) {
			setIsValid(false)
			setErrors({
				...errors,
				email: 'Введите email в формате address@domain.com',
			})
		}
	}

	const handlePasswordChange = evt => {
		handleChange(evt)
		const { name } = evt.target
		if (name === 'password' && evt.target.value.length < 2) {
			setIsValid(false)
			setErrors({
				...errors,
				password: 'Пароль должен иметь не менее 2 символов',
			})
		}
	}

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit()
	}
	return (
		<section className="login-form">
			<form
				className="login-form__form"
				name="login"
				onSubmit={handleSubmit}
				noValidate
			>
				<RegistrationField
					label="E-mail"
					name="email"
					placeholder="Введите e-mail"
					type="email"
					handleChange={handleEmailChange}
					values={values}
					errors={errors}
				/>
				<RegistrationField
					label="Пароль"
					name="password"
					placeholder="Введите пароль"
					type="password"
					handleChange={handlePasswordChange}
					values={values}
					errors={errors}
				/>
				<p className="login-field__input-error">
					{!isValid && responseMessage}
				</p>
				<button type="submit" className="button" disabled={!isValid}>
					{button}
				</button>
			</form>
		</section>
	)
}

export default LoginForm
