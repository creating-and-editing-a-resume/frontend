import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './RegistrationForm.scss'
import RegistrationField from './RegistrationField/RegistrationField'
import { EMAIL_REGEX } from '../../../constants/regex'
import DataProcessing from './DataProcessing/DataProcessing'
import { DATA_PROCESSING_TEXT } from '../../../constants/text-templates'

const RegistrationForm = ({ buttonText, onSubmit, popup }) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  // const [isFromValid, setIsFormValid] = useState(false)
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

  const handleCheckboxChange = evt => {
    handleChange(evt)
    const { name, checked } = evt.target
    if (name === 'dataProcessing' && evt.target.checked === false) {
      setIsValid(false)
      setErrors({
        ...errors,
        dataProcessing: 'Необходимо дать согласие на обработку данных',
      })
    } else {
      setValues({ ...values, [name]: toString(checked) })
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
    if (values.password !== values.passwordConfirmation) {
      setIsValid(false)
      setErrors({
        ...errors,
        passwordConfirmation: 'Пароли не совпадают',
      })
    } else {
      onSubmit()
    }
    // TODO: раскомментировать, когда будет Api
    // onSubmit(values.name, values.email, values.password).catch(err => {
    // 	const message = getErrorMessage(
    // 		err.status,
    // 		'Произошла ошибка при регистрации пользователя'
    // 	)
    // 	setResponseMessage(message)
    // 	setIsValid(false)
    // })
  }

  return (
    <section className="registration-form">
      <form
        className="registration-form__form"
        name="register"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="registration-form__fields">
          <RegistrationField
            name="email"
            placeholder="e-mail"
            type="email"
            handleChange={handleEmailChange}
            values={values}
            errors={errors}
          />
          <RegistrationField
            label="Пароль"
            name="password"
            placeholder="Пароль"
            type="password"
            handleChange={handlePasswordChange}
            values={values}
            errors={errors}
            eye
          />
          <RegistrationField
            label="Подтвердите пароль"
            name="passwordConfirmation"
            placeholder="Подтвердите пароль"
            type="password"
            handleChange={handlePasswordConfirmationChange}
            values={values}
            errors={errors}
            eye
          />
        </div>
        <DataProcessing
          text={DATA_PROCESSING_TEXT}
          handleChange={handleCheckboxChange}
        />
        {responseMessage && (
          <p className="registration-form__input-error">{responseMessage}</p>
        )}

        <button
          type="submit"
          className={`registration-form__button ${
            !isValid ? 'registration-form__button_inactive' : 'link'
          } ${popup && 'registration-form__button_popup'}`}
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
    </section>
  )
}

RegistrationForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  popup: PropTypes.bool,
}

RegistrationForm.defaultProps = {
  popup: false,
}

export default RegistrationForm
