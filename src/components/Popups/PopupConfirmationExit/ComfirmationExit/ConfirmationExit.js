import './ConfirmationExit.scss'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import exitImage from '../../../../img/popups/exit-design.svg'

function ConfirmationExit({ onClose }) {
  const navigate = useNavigate()

  return (
    <div className="confirmation-exit">
      <img
        src={exitImage}
        alt="confirm popup icon"
        className="confirmation-exit__image"
      />
      <div className="confirmation-exit__buttons">
        <button
          className="confirmation-exit__button confirmation-exit__button_exit"
          type="button"
          label="button"
          onClick={() => {
            navigate('/')
            onClose()
          }}
        >
          Выйти без сохранения
        </button>

        <button
          className="confirmation-exit__button confirmation-exit__button_save"
          type="button"
          label="button"
          onClick={() => {
            navigate('/')
            onClose()
          }}
        >
          Сохранить и выйти
        </button>
      </div>
    </div>
  )
}

ConfirmationExit.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ConfirmationExit
