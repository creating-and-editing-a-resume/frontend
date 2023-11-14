import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './RegistrationForm.scss'
import RegistrationField from './RegistrationField/RegistrationField'
import { NAME_REGEX, EMAIL_REGEX } from '../../../constants/regex'

const RegistrationForm = ({ button, onSubmit }) => {
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

	const handleNameChange = evt => {
		handleChange(evt)
		const { name, value } = evt.target
		if (name === 'name' && evt.target.value.length < 2) {
			setIsValid(false)
			setErrors({
				...errors,
				name: 'Имя должно иметь не менее 2 символов',
			})
		} else if (name === 'name' && !NAME_REGEX.test(value)) {
			setIsValid(false)
			setErrors({
				...errors,
				name: 'Имя может содержать только латиницу, кириллицу, пробел или дефис.',
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

	const handlePasswordConfirmationChange = evt => {
		handleChange(evt)
		const { name, value } = evt.target
		if (name === 'passwordConfirmation' && evt.target.value.length < 1) {
			setIsValid(false)
			setErrors({
				...errors,
				passwordConfirmation: 'Необходимо повторно ввести пароль',
			})
		} else {
			setValues({ ...values, [name]: value })
		}
	}
	// TODO: раскомментировать, когда будет Api:
	// const getErrorMessage = (status, defaultText) => {
	// 	switch (status) {
	// 		case 409:
	// 			return 'Пользователь с таким email уже существует.'
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

	// TODO: раскомментировать, когда будет Api
	// const handleSubmit = e => {
	// 	e.preventDefault()
	// 	onSubmit(values.email, values.password).catch(err => {
	// 		const message = getErrorMessage(
	// 			err.status,
	// 			'Произошла ошибка при авторизации пользователя'
	// 		)
	// 		setResponseMessage(message)
	// 		setIsValid(false)
	// 	})
	// }

	return (
		<section className="registration-form">
			<form
				className="registration-form__form"
				name="register"
				onSubmit={handleSubmit}
				noValidate
			>
				<RegistrationField
					label="Имя"
					name="name"
					placeholder="Введите имя"
					type="text"
					handleChange={handleNameChange}
					values={values}
					errors={errors}
				/>
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
				<RegistrationField
					label="Подтверждение пароля"
					name="passwordConfirmation"
					placeholder="Повторите пароль"
					type="password"
					handleChange={handlePasswordConfirmationChange}
					values={values}
					errors={errors}
				/>
				<p className="registration-field__input-error">
					{!isValid && responseMessage}
				</p>
				<button type="submit" className="button" disabled={!isValid}>
					{button}
				</button>
			</form>
		</section>
	)
}

RegistrationForm.propTypes = {
	button: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
}

export default RegistrationForm
