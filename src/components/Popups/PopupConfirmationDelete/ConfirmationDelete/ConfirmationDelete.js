import './ConfirmationDelete.scss'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import TrashIcon from '../../../../img/popups/trash-icon-red.svg'
import CloseIcon from '../../../../img/popups/close-icon-black.svg'
import { cleanLocalStorage } from '../../../Utils/Utils'

function ConfirmationDelete({
  onClose,
  arrValues,
  setArrValues,
  currentResume,
  setCurrentResume,
  setImage,
  setValues,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const locationResult = location.pathname === '/resume/result'
  const currentResumeName = currentResume
    ? arrValues.find(item => item.id === currentResume.id)
    : ''

  const handleDeleteResume = () => {
    setArrValues(arrValues.filter(item => item.id !== currentResumeName?.id))
    setCurrentResume({})
  }

  return (
    <div
      className={classNames(
        'confirmation-delete',
        locationResult && 'confirmation-delete_result'
      )}
    >
      <p
        className={classNames(
          'confirmation-delete__text',
          locationResult && 'confirmation-delete__text_result'
        )}
      >
        {`Вы действительно хотите удалить резюме ${
          currentResume.resume_name === undefined
            ? ''
            : currentResume.resume_name
        } без возможности восстановления?`}
      </p>
      <div
        className={classNames(
          'confirmation-delete__buttons',
          locationResult && 'confirmation-delete__buttons_result'
        )}
      >
        <button
          className="confirmation-delete__button confirmation-delete__button_delete"
          type="button"
          label="button"
          onClick={() => {
            handleDeleteResume()
            onClose()
            cleanLocalStorage()
            navigate('/')
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
          <img src={TrashIcon} alt="trash-icon" />
          Удалить
        </button>

        <button
          className="confirmation-delete__button confirmation-delete__button_cancel"
          type="button"
          label="button"
          onClick={() => {
            onClose()
          }}
        >
          Отменить
        </button>
      </div>
      {!locationResult && (
        <button
          type="button"
          onClick={onClose}
          className="confirmation-delete__close-button link"
        >
          <img
            src={CloseIcon}
            alt="крестик"
            className="confirmation-delete__close-button-icon"
          />
        </button>
      )}
    </div>
  )
}

ConfirmationDelete.propTypes = {
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
        PropTypes.objectOf(PropTypes.bool),
      ])
    )
  ),
  setArrValues: PropTypes.func,
  currentResume: PropTypes.objectOf(
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
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func,
  setValues: PropTypes.func,
  setImage: PropTypes.func,
}

ConfirmationDelete.defaultProps = {
  arrValues: [],
  setArrValues: () => {},
  setCurrentResume: () => {},
  setValues: () => {},
  setImage: () => {},
}

export default ConfirmationDelete
