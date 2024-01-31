import React from 'react'
import PropTypes from 'prop-types'
import '../Register/Register.scss'
import FormTitle from '../Register/FormTitle/FormTitle'
import FormRedirection from '../Register/FormRedirection/FormRedirection'
import LoginForm from './LoginForm/LoginForm'
import Header from '../Header/Header'

const Login = ({ onLogin, isLoggedIn, handleUserData, handleLogin }) => (
  <>
    <Header isLoggedIn={isLoggedIn} />
    <section className="register">
      <div className="register__container">
        <FormTitle page="login" greeting="Вход" />

        <div className="register__form-container">
          <LoginForm
            buttonText="Войти"
            onSubmit={onLogin}
            handleUserData={handleUserData}
            handleLogin={handleLogin}
          />
        </div>
        <a href="_blank" className="register__restore-password">
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
  handleUserData: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

Login.defaultProps = {
  isLoggedIn: false,
}
export default Login
