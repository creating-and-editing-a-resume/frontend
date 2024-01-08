import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './PopupRegister.scss'
import RegistrationForm from '../../Register/RegistrationForm/RegistrationForm'
import LoginImg from '../../../img/popups/login.svg'

const PopupRegister = ({ isOpen, onClose, onLogin }) => {
  useEffect(() => {
    const close = e => {
      if (e.keyCode === 27) {
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return (
    <div
      className={`popup-register popup-login popup ${
        isOpen ? `popup_opened` : ''
      }`}
    >
      <div className="popup-register__container">
        <div className="popup-register__internal-container">
          <div className="popup-register__image-container popup-login__image-container">
            <img
              alt="Девушка с ноутбуком"
              src={LoginImg}
              className="popup-register__image popup-login__image"
            />
            <span className="popup-register__image-text popup-login__image-text">
              Чтобы сохранить резюме, необходимо войти или зарегистрироваться
            </span>
          </div>
          <div className="popup-register__form-container">
            <h1 className="popup-register__form-title popup-login__form-title">
              Регистрация
            </h1>
            <RegistrationForm
              buttonText="Зарегистрироваться"
              onSubmit={onLogin}
              isOpen={isOpen}
              popup
            />
            <Link className="popup-register__link link" to="/signin">
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </div>
        <button
          className="popup-register__btn-close popup-login__btn-close"
          type="button"
          onClick={onClose}
          label="button"
        />
      </div>
    </div>
  )
}

PopupRegister.propTypes = {
  onLogin: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

PopupRegister.defaultProps = {
  onLogin: () => {},
}

export default PopupRegister
