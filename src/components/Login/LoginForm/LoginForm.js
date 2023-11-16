import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { EMAIL_REGEX } from '../../../constants/regex'
import RegistrationField from '../../Register/RegistrationForm/RegistrationField/RegistrationField'
import './LoginForm.scss'
import '../../Register/RegistrationForm/RegistrationForm.scss'
import PlusIcon from '../../../img/plus-icon.svg'

const LoginForm = ({ buttonText, onSubmit, isOpen }) => {
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
	// TODO: раскомментировать, когда будет Api:
	// const getErrorMessage = (status, defaultText) => {
	// 	switch (status) {
	// 		case 400:
	// 			return 'Вы ввели неправильный логин или пароль.'
	// 		case 500:
	// 			return 'На сервере произошла ошибка.'
	// 		default:
	// 			return defaultText
	// 	}
	// }

	const handleSubmit = e => {
		e.preventDefault()
		onSubmit()
	}
	return (
		<section
			className={`login-form registration-form ${
				isOpen && 'registration-form_popup'
			}`}
		>
			<form
				className="login-form__form registration-form__form"
				name="login"
				onSubmit={handleSubmit}
				noValidate
			>
				<div className="login-form__fields registration-form__fields">
					<RegistrationField
						label="E-mail"
						name="email"
						placeholder="Введите e-mail"
						type="email"
						handleChange={handleEmailChange}
						values={values}
						errors={errors}
						isOpen={isOpen}
					/>
					<RegistrationField
						label="Пароль"
						name="password"
						placeholder="Введите пароль"
						type="password"
						handleChange={handlePasswordChange}
						values={values}
						errors={errors}
						eye
						isOpen={isOpen}
					/>
				</div>
				{responseMessage && (
					<p className="login-form__input-error registration-form__input-error">
						{responseMessage}
					</p>
				)}

				<button
					type="submit"
					className={`login-form__button registration-form__button ${
						!isValid ? 'registration-form__button_inactive' : 'link'
					}`}
					disabled={!isValid}
				>
					<img
						className="login-form__button-icon registration-form__button-icon"
						src={PlusIcon}
						alt="plus icon"
					/>
					<span className="login-form__button-text registration-form__button-text">
						{buttonText}
					</span>
				</button>
			</form>
		</section>
	)
}

LoginForm.propTypes = {
	buttonText: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
}

export default LoginForm
