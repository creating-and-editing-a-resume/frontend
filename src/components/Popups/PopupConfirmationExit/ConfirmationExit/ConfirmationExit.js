import './ConfirmationExit.scss'
import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import exitImage from '../../../../img/popups/exit-design.svg'

function ConfirmationExit({
  onClose,
  handleResumeNamePopupOpen,
  setValues,
  setImage,
  isEditMod,
  setArrValues,
  arrValues,
  values,
  setIsEditMod,
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
            navigate('/my-profile')
            onClose()
            setValues({
              name: '',
              surname: '',
              birthday: '',
              work_status: '',
              email: '',
              city: '',
              work_experience_checkbox: false,
              work_period_experience_checkbox: false,
              education_period_checkbox: false,
              qualification_checkbox: false,
              languages: [{ id: uuidv4() }],
              links: [{ id: uuidv4() }],
              jobs: [],
              qualifications: [],
              educations: [],
              portfolio: [],
            })
            setImage('')
          }}
        >
          Выйти без сохранения
        </button>

        <button
          className="confirmation-exit__button confirmation-exit__button_save"
          type="button"
          label="button"
          onClick={() => {
            // navigate('/my-profile')
            onClose()
            handleSave()
            // handleResumeNamePopupOpen()
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
  handleResumeNamePopupOpen: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
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
}

ConfirmationExit.defaultProps = {
  arrValues: {},
  values: {},
}

export default ConfirmationExit
