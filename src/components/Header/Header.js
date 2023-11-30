import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import './Header.scss'
import headerIcon from '../../logo.svg'
import ResumeLogo from '../../img/resume.svg'
import PlusLogo from '../../img/plus-logo.svg'
import ExitIcon from '../../img/exit-icon.svg'
import BackToProfileIcon from '../../img/back-to-profile.svg'
import LeftArrowIcon from '../../img/left-arrow.svg'
import RightArrowIcon from '../../img/right-arrow.svg'
import EditIcon from '../../img/edit-icon.svg'

function Header({
  isLoggedIn,
  nextPage,
  onOpenPopup,
  setCompletedSteps,
  onClick,
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  const isLogRegPage = () => !!(path === '/signin' || path === '/signup')

  const isMainPage = () => !!(path === '/')

  const isPersonDataPage = () => !!(path === '/resume/personal-data')

  const isResultPage = () => !!(path === '/resume/result')

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

  // на странице готового  резюме
  if (isResultPage()) {
    return (
      <header className="header">
        <div className="header__flex-container">
          <button
            className="header__button"
            type="button"
            label="button"
            onClick={onOpenPopup}
          >
            <img
              className="header__button-icon"
              alt="стрелка назад"
              src={BackToProfileIcon}
            />
            Личный кабинет
          </button>
          <div className="header__steps-buttons">
            <NavLink className="header__nav-link" to="/resume/personal-data">
              <button
                className="header__button header__button_black header__button_prev"
                type="button"
                label="button"
                onClick={() => navigate('/resume/personal-data')}
              >
                <img
                  className="header__button-icon"
                  alt="стрелка влево"
                  src={EditIcon}
                />
                Редактировать
              </button>
            </NavLink>

            <NavLink className="header__nav-link" to="/">
              <button
                className="header__button header__button_orange"
                type="button"
                label="button"
                onClick={() => {
                  setCompletedSteps()
                  navigate(`${nextPage}`)
                }}
              >
                Сохранить
              </button>
            </NavLink>
          </div>
        </div>
      </header>
    )
  }

  if (isNotFoundPage()) {
    return (
      <header className="header ">
        <button
          className="header__button"
          type="button"
          label="button"
          onClick={() => navigate('/')}
        >
          Главная страница
        </button>
      </header>
    )
  }

  // старт страница + залогинены
  if ((isMainPage() || isLogRegPage()) && isLoggedIn) {
    return (
      <header className="header">
        <NavLink className="header__link" to="/">
          <img src={headerIcon} alt="header logo" className="header__logo" />
        </NavLink>
        <div className="header__buttons-container">
          <button
            className="header__button"
            type="button"
            label="button"
            onClick={() => navigate('/resume')}
          >
            Создать резюме
          </button>
          <button
            className="header__button"
            type="button"
            label="button"
            onClick={() => navigate('/my-profile')}
          >
            Личный кабинет
          </button>
          <button
            className="header__button"
            type="button"
            label="button"
            onClick={() => navigate('/')}
          >
            Выйти
          </button>
        </div>
      </header>
    )
  }
  // страница авт или рег + НЕ залогинены
  if ((isMainPage() || isLogRegPage()) && !isLoggedIn) {
    return (
      <header className="header header_main">
        <div className="header__flex-container header__flex-container_main">
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
            <NavLink className="header__nav-link" to="/resume">
              <span className="header__main-button">Создать резюме</span>
            </NavLink>
            <NavLink className="header__nav-link" to="/signin">
              <div className="header__exit-button">
                <span className="header__main-button">Выйти</span>
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
  // Код Айшата:
  // if ((isMainPage() || isLogRegPage()) && !isLoggedIn) {
  //   return (
  //     <header className="header">
  //       <NavLink className="header__link" to="/">
  //         <img src={headerIcon} alt="header logo" className="header__logo" />
  //       </NavLink>
  //       <div className="header__buttons-container">
  //         <button
  //           className="header__button header__button_login"
  //           type="button"
  //           label="button"
  //           onClick={() => navigate('/resume')}
  //         >
  //           Создать резюме
  //         </button>
  //         <button
  //           className="header__button header__button_register"
  //           type="button"
  //           label="button"
  //           onClick={() => navigate('/signin')}
  //         >
  //           Войти
  //         </button>
  //       </div>
  //     </header>
  //   )
  // }

  // НЕ старт страница
  if (!(isMainPage() && isLogRegPage())) {
    return (
      <header className="header">
        <div className="header__flex-container">
          <button
            className="header__button"
            type="button"
            label="button"
            onClick={onOpenPopup}
          >
            <img
              className="header__button-icon"
              alt="стрелка назад"
              src={BackToProfileIcon}
            />
            Личный кабинет
          </button>
          <div className="header__steps-buttons">
            {!isPersonDataPage() && (
              <button
                className="header__button header__button_prev"
                type="button"
                label="button"
                onClick={() => navigate(-1)}
              >
                <img
                  className="header__button-icon"
                  alt="стрелка влево"
                  src={LeftArrowIcon}
                />
                Предыдущий шаг
              </button>
            )}
            <button
              className="header__button header__button_black header__button_next"
              type="button"
              label="button"
              onClick={() => {
                setCompletedSteps()
                onClick()
                navigate(`${nextPage}`)
              }}
            >
              Следующий шаг
              <img
                className="header__button-icon"
                alt="стрелка вправо"
                src={RightArrowIcon}
              />
            </button>
          </div>
        </div>
      </header>
      // <header className="header ">
      // <button
      //   className="header__button"
      //   type="button"
      //   label="button"
      //   onClick={onOpenPopup}
      // >
      //   Личный кабинет
      // </button>
      //   <div className="header__buttons-container">
      //     {!isPersonDataPage() && (
      //       <button
      //         className="header__button header__button_prev"
      //         type="button"
      //         label="button"
      //         onClick={() => navigate(-1)}
      //       >
      //         Предыдущий шаг
      //       </button>
      //     )}
      //     <button
      //       className="header__button header__button_next"
      //       type="button"
      //       label="button"
      //       onClick={() => {
      //         setCompletedSteps()
      //         navigate(`${nextPage}`)
      //       }}
      //     >
      //       Следующий шаг
      //     </button>
      //   </div>
      // </header>
    )
  }
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  nextPage: PropTypes.string,
  onOpenPopup: PropTypes.func,
  setCompletedSteps: PropTypes.func,
  onClick: PropTypes.func,
}
Header.defaultProps = {
  isLoggedIn: false,
  nextPage: '',
  onOpenPopup: () => {},
  setCompletedSteps: () => {},
  onClick: () => {},
}

export default Header
