import './ConfirmationRegister.scss'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function ConfirmationRegister({ onClose }) {
  const navigate = useNavigate()
  return (
    <div className="confirmation-reg">
      <p className="confirmation-reg__text">
        Чтобы сохранить и редактировать готовое резюме советуем сразу войти или
        зарегистрироваться
      </p>

      <div className="confirmation-reg__buttons">
        <button
          className="confirmation-reg__button confirmation-reg__button_skip"
          type="button"
          label="button"
          onClick={() => {
            onClose()
          }}
        >
          Пропустить
        </button>
        <button
          className="confirmation-reg__button confirmation-reg__button_reg"
          type="button"
          label="button"
          onClick={() => {
            navigate('/signup')
            onClose()
          }}
        >
          Зарегистрироваться
        </button>
      </div>
      <Link className="confirmation-reg__link link" to="/signin">
        Уже есть аккаунт? Войти
      </Link>
    </div>
  )
}

ConfirmationRegister.propTypes = {
  onClose: PropTypes.func.isRequired,
}
export default ConfirmationRegister
