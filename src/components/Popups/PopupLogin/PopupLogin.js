import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './PopupLogin.scss'
import LoginForm from '../../Login/LoginForm/LoginForm'
import LoginImg from '../../../img/popups/login.svg'

const PopupLogin = ({ isOpen, onClose, onLogin }) => {
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
    <div className={`popup-login popup ${isOpen ? `popup_opened` : ''}`}>
      <div className="popup-login__container">
        <div className="popup-login__internal-container">
          <div className="popup-login__image-container">
            <img
              alt="Девушка с ноутбуком"
              src={LoginImg}
              className="popup-login__image"
            />
            <span className="popup-login__image-text">
              Чтобы сохранить резюме, необходимо войти или зарегистрироваться
            </span>
          </div>
          <div className="popup-login__form-container">
            <h1 className="popup-login__form-title">Вход</h1>
            <LoginForm
              buttonText="Войти"
              onSubmit={onLogin}
              isOpen={isOpen}
              popup
            />
            <a href="_blank" className="popup-login__restore-password">
              Не помню пароль
            </a>
            <Link className="popup-login__link link" to="/signup">
              Зарегистрироваться
            </Link>
          </div>
        </div>
        <button
          className="popup-login__btn-close"
          type="button"
          onClick={onClose}
          label="button"
        />
      </div>
    </div>
  )
}

PopupLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default PopupLogin
