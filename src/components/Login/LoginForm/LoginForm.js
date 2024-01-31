import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { EMAIL_REGEX } from '../../../constants/regex'
import RegistrationField from '../../Register/RegistrationForm/RegistrationField/RegistrationField'
import '../../Register/RegistrationForm/RegistrationForm.scss'
import * as auth from '../../Utils/Auth'

const LoginForm = ({ buttonText, handleLogin, popup, handleUserData }) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [responseMessage, setResponseMessage] = useState('')
  const navigate = useNavigate()

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

  function onSubmit() {
    // e.preventDefault()
    const { password, email } = values

    if (!email || !password) {
      return
    }
    auth
      .authorize(email, password)
      .then(data => {
        if (data.auth_token) {
          handleUserData(email)
          setValues({ email: '', password: '' })
          handleLogin()
          navigate('/', { replace: true })
        }
      })
      .catch(err => console.log(err))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit()
  }

  return (
    <section className="registration-form">
      <form
        className="registration-form__form"
        name="login"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="registration-form__fields">
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
            eye
          />
        </div>
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

LoginForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUserData: PropTypes.func.isRequired,
  popup: PropTypes.bool,
}

LoginForm.defaultProps = {
  popup: false,
}

export default LoginForm
