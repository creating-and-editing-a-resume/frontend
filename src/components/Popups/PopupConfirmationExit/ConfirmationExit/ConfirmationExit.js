import './ConfirmationExit.scss'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import exitImage from '../../../../img/popups/exit-design.svg'
import CloseIcon from '../../../../img/popups/close-icon-black.svg'

function ConfirmationExit({
  onClose,
  handleResumeNamePopupOpen,
  isEditMod,
  setArrValues,
  arrValues,
  values,
  setIsEditMod,
  clearData,
}) {
  const navigate = useNavigate()

  const updateResume = () => {
    setArrValues(newArr =>
      newArr.map(resume => {
        if (resume.id === values.id) {
          return { ...resume, ...values }
        }
        return resume
      })
    )
    localStorage.setItem('allData', JSON.stringify(arrValues))
  }

  const handleSave = () => {
    if (!isEditMod) {
      handleResumeNamePopupOpen()
    } else {
      updateResume()
      setIsEditMod(false)
      navigate('/my-profile')
    }
  }

  return (
    <div className="confirmation-exit">
      <h1 className="confirmation-exit__title">
        Вы уверены, что хотите покинуть страницу заполнения?
      </h1>
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
            clearData()
            navigate('/my-profile')
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
            onClose()
            handleSave()
          }}
        >
          Сохранить и выйти
        </button>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="confirmation-exit__close-button link"
      >
        <img
          src={CloseIcon}
          alt="крестик"
          className="confirmation-exit__close-button-icon"
        />
      </button>
    </div>
  )
}

ConfirmationExit.propTypes = {
  onClose: PropTypes.func.isRequired,
  handleResumeNamePopupOpen: PropTypes.func.isRequired,
  isEditMod: PropTypes.bool.isRequired,
  arrValues: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.objectOf(
              PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
              ])
            ),
          ])
        ),
      ])
    )
  ),
  setArrValues: PropTypes.func.isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.bool,
            ])
          ),
        ])
      ),
    ])
  ),
  setIsEditMod: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
}

ConfirmationExit.defaultProps = {
  arrValues: {},
  values: {},
}

export default ConfirmationExit
