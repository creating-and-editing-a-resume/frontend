import './ResumeName.scss'
import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router'
import { cleanLocalStorage } from '../../../Utils/Utils'
import TrashLogo from '../../../../img/trash-icon-red.svg'

function PopupResumeName({
  values,
  setValues,
  setArrValues,
  onClose,
  arrValues,
  setIsEditMod,
  currentResume,
  setCurrentResume,
}) {
  const navigate = useNavigate()
  const location = useLocation()

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
      await setValues({})
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
      await setValues({})
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
      </form>
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
      </div>
    </div>
  )
}

PopupResumeName.propTypes = {
  setIsEditMod: PropTypes.func,
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
  setValues: PropTypes.func.isRequired,
  setArrValues: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
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
  ),
  setCurrentResume: PropTypes.func.isRequired,
}

PopupResumeName.defaultProps = {
  values: {},
  arrValues: [],
  setIsEditMod: () => {},
  currentResume: {},
}

export default PopupResumeName
