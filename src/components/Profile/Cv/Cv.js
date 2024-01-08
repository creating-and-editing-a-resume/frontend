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
import { handleGeneratePdf } from '../../Utils/Utils'

const Cv = ({
  // isEditMod,
  cv,
  deletePopupSetState,
  currentResume,
  setCurrentResume,
  setIsEditMod,
  // setArrValues,
  arrValues,
  setIsResumeNamePopupOpen,
  setPopupCopyLink,
}) => {
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
      if (e.target.classList.contains('profile__bcg')) {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${resumePath}`)
    // TODO после соединения с сервером заменить указанный выше код на закомментированный
    // navigator.clipboard.writeText(
    //   `http://dev.acceleratorpracticum.ru${resumePath}`
    // )
    setPopupCopyLink(true)
    setTimeout(() => {
      setPopupCopyLink(false)
    }, 2500)
    setIsEditCvPopupOpen(false)
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
  }

  useEffect(() => {
    localStorage.setItem('allData', JSON.stringify(arrValues))
  }, [arrValues])

  return (
    <div className="profile__cv-container">
      <div className="profile__cv-image-container">
        <div className="profile__cv-content">
          <ResultResume values={cv} />
        </div>
        <button
          type="button"
          className="profile__cv-changes-button link"
          onClick={openCvMenu}
        >
          <img src={ellipsesIcon} alt="многоточие" className="link" />
        </button>
      </div>
      <span className="profile__cv-name">{cv.resume_name}</span>
      <div
        className={classNames(
          'profile__bcg',
          isEditCvPopupOpen ? 'profile__bcg_opened' : ''
        )}
      />
      <div
        className={classNames(
          'profile__cv-menu',
          isEditCvPopupOpen ? 'profile__cv-menu_opened' : ''
        )}
      >
        <button
          className="profile__cv-menu-option link"
          type="button"
          onClick={handleEditResume}
        >
          <img
            src={EditIcon}
            alt="карандашик"
            className="profile__cv-menu-icon"
          />
          Редактировать
        </button>
        <button
          className="profile__cv-menu-option link"
          type="button"
          onClick={handleDownload}
        >
          <img
            src={DownloadIcon}
            alt="скачивание"
            className="profile__cv-menu-icon"
          />
          Скачать в PDF
        </button>
        <button
          className="profile__cv-menu-option link"
          type="button"
          onClick={copyToClipboard}
        >
          <img
            src={linkIcon}
            alt="скачивание"
            className="profile__cv-menu-icon"
          />
          Скопировать ссылку
        </button>
        <button
          className="profile__cv-menu-option link"
          type="button"
          onClick={() => {
            setIsEditCvPopupOpen(false)
            setIsResumeNamePopupOpen(true)
            handleEditName()
          }}
        >
          <img
            src={EditIcon}
            alt="карандашик"
            className="profile__cv-menu-icon"
          />
          Переименовать
        </button>
        <button
          className="profile__cv-menu-option profile__cv-menu-option_red link"
          type="button"
          onClick={handleDelete}
        >
          <img
            src={DeleteIcon}
            alt="скачивание"
            className="profile__cv-menu-icon"
          />
          Удалить резюме
        </button>
      </div>
    </div>
  )
}

Cv.propTypes = {
  // isEditMod: PropTypes.bool.isRequired,
  // values: PropTypes.objectOf(
  //   PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.number,
  //     PropTypes.bool,
  //     PropTypes.arrayOf(
  //       PropTypes.oneOfType([
  //         PropTypes.string,
  //         PropTypes.objectOf(
  //           PropTypes.oneOfType([
  //             PropTypes.string,
  //             PropTypes.number,
  //             PropTypes.bool,
  //           ])
  //         ),
  //       ])
  //     ),
  //   ])
  // ),
  // setValues: PropTypes.func.isRequired,
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
    ])
  ),
  deletePopupSetState: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func,
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
  ).isRequired,
  setIsResumeNamePopupOpen: PropTypes.func.isRequired,
  setPopupCopyLink: PropTypes.func.isRequired,
}

Cv.defaultProps = {
  cv: {},
  setCurrentResume: () => {},
  setIsEditMod: () => {},
}

export default Cv
