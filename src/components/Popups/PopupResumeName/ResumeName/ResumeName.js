import './ResumeName.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router'
import { cleanLocalStorage } from '../../../Utils/Utils'
import TrashLogo from '../../../../img/trash-icon-red.svg'
import { CurrentValuesContext } from '../../../../contexts/ValuesContext'
import { CurrentArrValuesContext } from '../../../../contexts/ArrValuesContext'
import { CurrentResumeContext } from '../../../../contexts/CurrentResumeContext'

function PopupResumeName({
  setValues,
  setArrValues,
  onClose,
  setIsEditMod,
  setCurrentResume,
  clearData,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const values = React.useContext(CurrentValuesContext)
  const arrValues = React.useContext(CurrentArrValuesContext)
  const currentResume = React.useContext(CurrentResumeContext)

  // добавление имени резюме
  function handleChange(evt) {
    const { name, value } = evt.target

    if (location.pathname === '/my-profile') {
      setCurrentResume(prevValues => ({ ...prevValues, [name]: value }))
    }
    setValues(prevValues => ({ ...prevValues, [name]: value }))
  }

  async function handleSubmit() {
    if (location.pathname === '/resume/result') {
      const newValues = [...arrValues, values]
      setArrValues(newValues)
      localStorage.setItem('allData', JSON.stringify(newValues))
      await clearData()
      setIsEditMod(false)
      onClose()
      navigate('/my-profile')
      cleanLocalStorage()
    }

    if (location.pathname === '/my-profile') {
      const newValues = arrValues.map(el => {
        if (el.id === currentResume.id) {
          return currentResume
        }
        return el
      })
      setArrValues(newValues)
      await localStorage.setItem('allData', JSON.stringify(newValues))
      onClose()
      await clearData()
    }
  }

  function handleClick() {
    setValues(prevValues => ({ ...prevValues, resume_name: '' }))
  }

  return (
    <div className="resume-name">
      <form action="submit" className="resume-name__form">
        <p className="resume-name__description">
          Для удобства организации ваших резюме предлагаем добавить уникальное
          название
        </p>
        <input
          name="resume_name"
          id="resume-name-input"
          type="text"
          className="resume-name__input"
          placeholder="Название резюме"
          value={values.resume_name || ''}
          onChange={handleChange}
        />
        <div className="resume-name__buttons">
          <button
            className="resume-name__button resume-name__button_delete"
            type="button"
            label="button"
            onClick={handleClick}
          >
            <img alt="корзина" src={TrashLogo} />
            Удалить
          </button>

          <button
            className="resume-name__button resume-name__button_save"
            type="button"
            label="button"
            onClick={handleSubmit}
          >
            Сохранить
          </button>
          <button
            className="resume-name__btn-close"
            type="button"
            onClick={onClose}
            label="button"
          />
        </div>
      </form>
    </div>
  )
}

PopupResumeName.propTypes = {
  setIsEditMod: PropTypes.func,
  setValues: PropTypes.func.isRequired,
  setArrValues: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
}

PopupResumeName.defaultProps = {
  setIsEditMod: () => {},
}

export default PopupResumeName
