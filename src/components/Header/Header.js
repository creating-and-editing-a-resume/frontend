/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import './Header.scss'
// import headerIcon from '../../logo.svg'
import ResumeLogo from '../../img/resume.svg'
import PlusLogo from '../../img/plus-logo.svg'
import ExitIcon from '../../img/exit-icon.svg'
import BackToProfileIcon from '../../img/back-to-profile.svg'
import LeftArrowIcon from '../../img/left-arrow.svg'
import RightArrowIcon from '../../img/right-arrow.svg'
import EditIcon from '../../img/edit-icon.svg'
import ResumeLogoBlack from '../../img/resume-logo-black.svg'
import { handleOpenPopup, cleanLocalStorage } from '../Utils/Utils'
import { CurrentValuesContext } from '../../contexts/ValuesContext'
import { CurrentArrValuesContext } from '../../contexts/ArrValuesContext'

function Header({
  setIsLoggedIn,
  setArrValues,
  setIsEditMod,
  isEditMod,
  isLoggedIn,
  nextPage,
  onOpenPopup,
  setCompletedSteps,
  onClick,
  handleResumeNamePopupOpen,
  isValid,
  inputsAreNotEmpty,
  onClickMyProfile,
  handleRegisterPopupOpen,
  clearData,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname
  const values = React.useContext(CurrentValuesContext)
  const arrValues = React.useContext(CurrentArrValuesContext)

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

  const handleSave = async () => {
    if (!isEditMod) {
      handleResumeNamePopupOpen()
    } else {
      updateResume()
      setIsEditMod(false)
      navigate('/my-profile')
      await clearData()
      await cleanLocalStorage()
    }
  }

  const isLogRegPage = () => !!(path === '/signin' || path === '/signup')

  const isMainPage = () => !!(path === '/')

  const isPersonDataPage = () => !!(path === '/resume/personal-data')

  const isResultPage = () => !!(path === '/resume/result')

  const isProfilePage = () => !!(path === '/my-profile')

  const isNotFoundPage = () =>
    !!(
      path !== '/' &&
      path !== '/my-profile' &&
      path !== '/signin' &&
      path !== '/signup' &&
      path !== '/resume/personal-data' &&
      path !== '/resume/qualification' &&
      path !== '/resume/experience' &&
      path !== '/resume/education' &&
      path !== '/resume/portfolio' &&
      path !== '/resume/skills' &&
      path !== '/resume/about' &&
      path !== '/resume/layouts' &&
      path !== '/profession'
    )
  // Личный кабинет
  if (isProfilePage()) {
    return (
      <header className="header header_main">
        <div className="header__flex-container">
          <NavLink className="header__nav-link" to="/">
            <div className="header__logo">
              <img
                alt="резюме "
                src={ResumeLogo}
                className="header__logo-resume"
              />
              <img alt="плюс" src={PlusLogo} className="header__logo-plus" />
            </div>
          </NavLink>
          <div className="header__main-buttons">
            <button
              className="header__button header__button_transparent"
              type="button"
              label="button"
              onClick={() => {
                cleanLocalStorage()
                setIsEditMod(false)
                handleOpenPopup(navigate, isLoggedIn, onOpenPopup)
                clearData()
              }}
            >
              Создать резюме
            </button>
            <button
              className="header__main-button header__logout-button"
              type="button"
              label="button"
              onClick={() => {
                cleanLocalStorage()
                clearData()
                setIsLoggedIn(false)
                navigate('/')
              }}
            >
              Выйти
              <div className="header__button-icon_flex-container">
                <img
                  className="header__button-icon header__button-icon_exit"
                  alt="стрелка назад"
                  src={ExitIcon}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
    )
  }
  // на странице готового  резюме
  if (isResultPage()) {
    return (
      <header className="header">
        <div className="header__flex-container header__flex-container_main">
          <button
            className="header__button"
            type="button"
            label="button"
            onClick={onOpenPopup}
          >
            <div className="header__button-icon_flex-container">
              <img
                className="header__button-icon header__button-icon_personal"
                alt="стрелка назад"
                src={BackToProfileIcon}
              />
            </div>
            {isLoggedIn ? 'Личный кабинет' : 'Главная страница'}
          </button>
          <div className="header__steps-buttons">
            <button
              className="header__button header__button_black"
              type="button"
              label="button"
              onClick={() => navigate('/resume/personal-data')}
            >
              <div className="header__button-icon_flex-container">
                <img
                  className="header__button-icon header__button-icon_edit"
                  alt="стрелка влево"
                  src={EditIcon}
                />
              </div>
              Редактировать
            </button>
            <button
              className="header__button header__button_orange"
              type="button"
              label="button"
              onClick={() => {
                if (isLoggedIn) {
                  handleSave()
                } else {
                  handleRegisterPopupOpen()
                }
              }}
            >
              Сохранить
            </button>
          </div>
        </div>
      </header>
    )
  }

  if (isNotFoundPage()) {
    return (
      <header className="header">
        <button
          className="header__button header__button_margin"
          type="button"
          label="button"
          onClick={() => {
            navigate('/')
            cleanLocalStorage()
            clearData()
          }}
        >
          <div className="header__button-icon_flex-container">
            <img
              className="header__button-icon header__button-icon_personal"
              alt="стрелка назад"
              src={BackToProfileIcon}
            />
          </div>
          Главная страница
        </button>
      </header>
    )
  }

  // старт страница + залогинены
  if (isMainPage() && isLoggedIn) {
    return (
      <header className="header header_main">
        <div className="header__flex-container">
          <NavLink className="header__nav-link" to="/">
            <div className="header__logo">
              <img
                alt="резюме "
                src={ResumeLogo}
                className="header__logo-resume"
              />
              <img alt="плюс" src={PlusLogo} className="header__logo-plus" />
            </div>
          </NavLink>
          <div className="header__main-buttons">
            <NavLink className="header__nav-link" to="/my-profile">
              <span className="header__main-button">Личный кабинет</span>
            </NavLink>
            <button
              className="header__button header__button_transparent"
              type="button"
              label="button"
              onClick={() => {
                cleanLocalStorage()
                setIsEditMod(false)
                handleOpenPopup(navigate, isLoggedIn, onOpenPopup)
                clearData()
              }}
            >
              Создать резюме
            </button>
            <button
              className="header__main-button header__logout-button"
              type="button"
              label="button"
              onClick={() => {
                cleanLocalStorage()
                clearData()
                setIsLoggedIn(false)
                navigate('/')
              }}
            >
              Выйти
              <div className="header__button-icon_flex-container">
                <img
                  className="header__button-icon header__button-icon_exit"
                  alt="стрелка назад"
                  src={ExitIcon}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
    )
  }
  // страница авт или рег + НЕ залогинены
  if (isMainPage() && !isLoggedIn) {
    return (
      <header className="header header_main">
        <div className="header__flex-container">
          <NavLink className="header__nav-link" to="/">
            <div className="header__logo">
              <img
                alt="резюме"
                src={ResumeLogo}
                className="header__logo-resume"
              />
              <img alt="плюс" src={PlusLogo} className="header__logo-plus" />
            </div>
          </NavLink>
          <div className="header__main-buttons">
            <button
              className="header__button header__button_transparent"
              type="button"
              label="button"
              onClick={() => {
                cleanLocalStorage()
                setIsEditMod(false)
                handleOpenPopup(navigate, isLoggedIn, onOpenPopup)
                clearData()
              }}
            >
              Создать резюме
            </button>
            <NavLink className="header__nav-link" to="/signin">
              <div className="header__exit-button">
                <span className="header__main-button">Войти</span>
                <img
                  className="header__exit-icon"
                  alt="Кнопка выхода"
                  src={ExitIcon}
                />
              </div>
            </NavLink>
          </div>
        </div>
      </header>
    )
  }

  // Логин и регистрация
  if (isLogRegPage()) {
    return (
      <header className="header header_white">
        <div className="header__container">
          <NavLink className="header__nav-link" to="/">
            <img
              alt="логотип компании"
              src={ResumeLogoBlack}
              className="header__logo-resume_plus"
            />
          </NavLink>
        </div>
      </header>
    )
  }
  // НЕ старт страница
  if (!(isMainPage() && isLogRegPage())) {
    return (
      <header className="header">
        <div className="header__flex-container header__flex-container_main">
          {isLoggedIn ? (
            <button
              className="header__button"
              type="button"
              label="button"
              onClick={() => {
                onClickMyProfile()
                clearData()
                navigate('/my-profile')
              }}
            >
              <div className="header__button-icon_flex-container">
                <img
                  className="header__button-icon header__button-icon_personal"
                  alt="стрелка назад"
                  src={BackToProfileIcon}
                />
              </div>
              Личный кабинет
            </button>
          ) : (
            <button
              className="header__button"
              type="button"
              label="button"
              onClick={() => {
                navigate('/')
                cleanLocalStorage()
                clearData()
              }}
            >
              <div className="header__button-icon_flex-container">
                <img
                  className="header__button-icon header__button-icon_personal"
                  alt="стрелка назад"
                  src={BackToProfileIcon}
                />
              </div>
              Главная страница
            </button>
          )}
          <div className="header__steps-buttons header__steps-buttons_end">
            {!isPersonDataPage() && (
              <button
                className="header__button"
                type="button"
                label="button"
                onClick={() => navigate(-1)}
              >
                <div className="header__button-icon_flex-container">
                  <img
                    className="header__button-icon header__button-icon_previous"
                    alt="стрелка влево"
                    src={LeftArrowIcon}
                  />
                </div>
                Предыдущий шаг
              </button>
            )}
            <button
              className="header__button header__button_orange header__button_next"
              type="button"
              label="button"
              onClick={e => {
                e.preventDefault()
                setCompletedSteps()
                onClick(e)
                if (inputsAreNotEmpty) {
                  navigate(`${nextPage}`)
                }
              }}
              disabled={!isValid}
            >
              Следующий шаг
              <div className="header__button-icon_flex-container">
                <img
                  className="header__button-icon header__button-icon_next"
                  alt="стрелка вправо"
                  src={RightArrowIcon}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  setIsEditMod: PropTypes.func,
  isEditMod: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  nextPage: PropTypes.string,
  onOpenPopup: PropTypes.func,
  setCompletedSteps: PropTypes.func,
  onClick: PropTypes.func,
  handleResumeNamePopupOpen: PropTypes.func,
  setArrValues: PropTypes.func,
  isValid: PropTypes.bool,
  inputsAreNotEmpty: PropTypes.bool,
  setIsLoggedIn: PropTypes.func,
  handleRegisterPopupOpen: PropTypes.func,
  onClickMyProfile: PropTypes.func,
  clearData: PropTypes.func,
}
Header.defaultProps = {
  setIsLoggedIn: () => {},
  setArrValues: () => {},
  isEditMod: false,
  isLoggedIn: true,
  nextPage: '',
  onOpenPopup: () => {},
  setCompletedSteps: () => {},
  onClick: () => {},
  handleResumeNamePopupOpen: () => {},
  setIsEditMod: () => {},
  isValid: undefined,
  inputsAreNotEmpty: undefined,
  handleRegisterPopupOpen: () => {},
  onClickMyProfile: () => {},
  clearData: () => {},
}

export default Header
