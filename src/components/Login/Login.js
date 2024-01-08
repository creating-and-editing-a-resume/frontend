import React from 'react'
import PropTypes from 'prop-types'
import './Login.scss'
import '../Register/Register.scss'
import FormTitle from '../Register/FormTitle/FormTitle'
import FormRedirection from '../Register/FormRedirection/FormRedirection'
import LoginForm from './LoginForm/LoginForm'
import Header from '../Header/Header'

const Login = ({ onLogin, isLoggedIn }) => (
  <>
    <Header isLoggedIn={isLoggedIn} />
    <section className="login register">
      <div className="login__container register__container">
        <FormTitle page="login" greeting="Вход" />

        <div className="login__form-container">
          <LoginForm buttonText="Войти" onSubmit={onLogin} />
        </div>
        <a href="_blank" className="login__restore-password">
          Не помню пароль
        </a>
        <FormRedirection
          page="login"
          button="Зарегистрироваться"
          path="/signup"
          whiteText
        />
      </div>
    </section>
  </>
)

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
}

Login.defaultProps = {
  isLoggedIn: false,
}
export default Login
