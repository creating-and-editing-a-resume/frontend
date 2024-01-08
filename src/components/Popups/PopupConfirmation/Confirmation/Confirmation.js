import './Confirmation.scss'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import confirmLogo from '../../../../img/back-to-profile.svg'

function Confirmation({ onClose /* setCheckboxValues, setValues */ }) {
  const navigate = useNavigate()
  // const resetAllValues = () => {
  //   setCheckboxValues({})
  //   setValues({})
  // }

  return (
    <div className="confirmation">
      <img
        src={confirmLogo}
        alt="confirm popup icon"
        className="confirmation__image"
      />
      <div className="confirmation__buttons">
        <button
          className="confirmation__button"
          type="button"
          label="button"
          onClick={() => {
            // resetAllValues()
            navigate('/')
            onClose()
          }}
        >
          Выйти без сохранения
        </button>

        <button
          className="confirmation__button"
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

Confirmation.propTypes = {
  onClose: PropTypes.func.isRequired,
  // setCheckboxValues: PropTypes.func.isRequired,
  // setValues: PropTypes.func.isRequired,
}

export default Confirmation
