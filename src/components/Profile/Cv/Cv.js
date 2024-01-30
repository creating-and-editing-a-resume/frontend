import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Cv.scss'
import classNames from 'classnames'
import EditIcon from '../../../img/edit-icon-black.svg'
import DownloadIcon from '../../../img/download-icon.svg'
import linkIcon from '../../../img/linkImage.svg'
import DeleteIcon from '../../../img/trash-icon-red.svg'
import ellipsesIcon from '../../../img/ellipses-icon.svg'
import ResultResume from '../../Resume/ResultResume/ResultResume'
import { handleGeneratePdf, copyToClipboard } from '../../Utils/Utils'
import { CurrentArrValuesContext } from '../../../contexts/ArrValuesContext'
import { CurrentResumeContext } from '../../../contexts/CurrentResumeContext'

const Cv = ({
  cv,
  deletePopupSetState,
  setCurrentResume,
  setIsEditMod,
  setIsResumeNamePopupOpen,
  setPopupCopyLink,
  setPopupCopyLinkText,
}) => {
  const arrValues = React.useContext(CurrentArrValuesContext)
  const currentResume = React.useContext(CurrentResumeContext)
  const resumePath = `/resume/result/${cv.id}`
  const navigate = useNavigate()
  const [isEditCvPopupOpen, setIsEditCvPopupOpen] = useState(false)

  useEffect(() => {
    const closeEsc = e => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setIsEditCvPopupOpen(false)
      }
    }

    const closeMouseDown = e => {
      if (e.target.classList.contains('cv-container__bcg')) {
        setIsEditCvPopupOpen(false)
      }
    }

    window.addEventListener('keydown', closeEsc)
    window.addEventListener('mousedown', closeMouseDown)
    return () => {
      window.removeEventListener('keydown', closeEsc)
      window.removeEventListener('mousedown', closeMouseDown)
    }
  }, [isEditCvPopupOpen])

  const openCvMenu = () => {
    setIsEditCvPopupOpen(!isEditCvPopupOpen)
  }

  const handleDownload = () => {
    handleGeneratePdf(navigate, resumePath)
  }

  const handleEditResume = async () => {
    await setIsEditMod(true)
    await setCurrentResume(prevValue => ({ ...prevValue, ...cv }))
    navigate('/resume')
  }

  const handleEditName = async () => {
    await setIsEditMod(true)
    await setCurrentResume(prevValue => ({ ...prevValue, ...cv }))
  }

  const handleDelete = () => {
    setCurrentResume({ ...currentResume, ...cv })
    deletePopupSetState(true)
    setIsEditCvPopupOpen(false)
    navigate('/my-profile')
  }

  useEffect(() => {
    localStorage.setItem('allData', JSON.stringify(arrValues))
  }, [arrValues])

  return (
    <div className="cv-container">
      <div className="cv-containe__image">
        <div className="cv-container__content">
          <ResultResume values={cv} />
        </div>
        <button
          type="button"
          className="cv-container__change-button link"
          onClick={openCvMenu}
        >
          <img src={ellipsesIcon} alt="многоточие" className="link" />
        </button>
      </div>
      <span className="cv-container__name">{cv.resume_name}</span>
      <div
        className={classNames(
          'cv-container__bcg',
          isEditCvPopupOpen ? 'cv-container__bcg_opened' : ''
        )}
      />
      <div
        className={classNames(
          'cv-container__menu',
          isEditCvPopupOpen ? 'cv-container__menu_opened' : ''
        )}
      >
        <button
          className="cv-container__menu-option link"
          type="button"
          onClick={handleEditResume}
        >
          <img src={EditIcon} alt="карандашик" className="cv-container__icon" />
          Редактировать
        </button>
        <button
          className="cv-container__menu-option link"
          type="button"
          onClick={handleDownload}
        >
          <img
            src={DownloadIcon}
            alt="скачивание"
            className="cv-container__icon"
          />
          Скачать в PDF
        </button>
        <button
          className="cv-container__menu-option link"
          type="button"
          onClick={() => {
            copyToClipboard(resumePath, setPopupCopyLink, setPopupCopyLinkText)
          }}
        >
          <img src={linkIcon} alt="скачивание" className="cv-container__icon" />
          Скопировать ссылку
        </button>
        <button
          className="cv-container__menu-option link"
          type="button"
          onClick={() => {
            setIsEditCvPopupOpen(false)
            setIsResumeNamePopupOpen(true)
            handleEditName()
          }}
        >
          <img src={EditIcon} alt="карандашик" className="cv-container__icon" />
          Переименовать
        </button>
        <button
          className="cv-container__menu-option cv-container__menu-option_red link"
          type="button"
          onClick={handleDelete}
        >
          <img
            src={DeleteIcon}
            alt="скачивание"
            className="cv-container__icon"
          />
          Удалить резюме
        </button>
      </div>
    </div>
  )
}

Cv.propTypes = {
  setIsEditMod: PropTypes.func,
  cv: PropTypes.objectOf(
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
  ),
  deletePopupSetState: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func,
  setIsResumeNamePopupOpen: PropTypes.func.isRequired,
  setPopupCopyLink: PropTypes.func.isRequired,
  setPopupCopyLinkText: PropTypes.func.isRequired,
}

Cv.defaultProps = {
  cv: {},
  setCurrentResume: () => {},
  setIsEditMod: () => {},
}

export default Cv
