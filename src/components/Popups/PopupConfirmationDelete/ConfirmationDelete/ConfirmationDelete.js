import React from 'react'
import './ConfirmationDelete.scss'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import TrashIcon from '../../../../img/popups/trash-icon-red.svg'
import CloseIcon from '../../../../img/popups/close-icon-black.svg'
import { cleanLocalStorage } from '../../../Utils/Utils'
import { CurrentArrValuesContext } from '../../../../contexts/ArrValuesContext'
import { CurrentResumeContext } from '../../../../contexts/CurrentResumeContext'

function ConfirmationDelete({
  onClose,
  setArrValues,
  setCurrentResume,
  clearData,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const arrValues = React.useContext(CurrentArrValuesContext)
  const currentResume = React.useContext(CurrentResumeContext)
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
            clearData()
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
  setArrValues: PropTypes.func,
  onClose: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func,
  clearData: PropTypes.func,
}

ConfirmationDelete.defaultProps = {
  setArrValues: () => {},
  setCurrentResume: () => {},
  clearData: () => {},
}

export default ConfirmationDelete
