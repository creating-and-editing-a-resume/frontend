import React from 'react'
// import PropTypes from 'prop-types'
import './Register.scss'
import FormTitle from './FormTitle/FormTitle'
import RegistrationForm from './RegistrationForm/RegistrationForm'
import FormRedirection from './FormRedirection/FormRedirection'
import Header from '../Header/Header'

const Register = () => (
  <>
    <Header />
    <section className="register">
      <div className="register__container">
        <FormTitle page="register" greeting="Регистрация" />
        <div className="register__form-container">
          <RegistrationForm
            buttonText="Зарегистрироваться"
            // onSubmit={onRegister}
          />
        </div>
        <div className="register__link-container">
          <FormRedirection
            page="register"
            text="Уже есть аккаунт?"
            button="Войти"
            path="/signin"
            whiteText
          />
        </div>
      </div>
    </section>
  </>
)

// Register.propTypes = {
//   onRegister: PropTypes.func.isRequired,
// }

export default Register
