/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import './App.scss'
import { v4 as uuidv4 } from 'uuid'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Main from '../Main/Main'
import Profession from '../Profession/Profession'
import Resume from '../Resume/Resume'
import NotFound from '../NotFound/NotFound'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Profile from '../Profile/Profile'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import { EMAIL_REGEX, BIRTHDAY_REGEX } from '../../constants/regex'
// import About from '../Resume/About/About'
// import Education from '../Resume/Education/Education'
import Experience from '../Resume/Experience/Experience'
// import Layouts from '../Resume/Layouts/Layouts'
import PersonalData from '../Resume/PersonalData/PersonalData'
// import Portfolio from '../Resume/Portfolio/Portfolio'
// import Qualification from '../Resume/Qualification/Qualification'
import Result from '../Resume/Result/Result'
import ResultResume from '../Resume/ResultResume/ResultResume'
// import Skills from '../Resume/Skills/Skills'

import PopupRegister from '../PopupRegister/PopupRegister'
import PopupConfirmation from '../PopupConfirmation/PopupConfirmation'
import PopupResumeName from '../PopupResumeName/PopupResumeName'
import PopupLogin from '../PopupLogin/PopupLogin'

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = React.useState(false) // Пользователь авторизован/неавторизован
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = React.useState({}) // Сохраняем данные пользователя

  // Переменные для защиты дочерних роутов компонента Resume
  // TODO: установить значение false для всех переменных ниже после сохранения резюме
  const [completedStepsPersonalData, setCompletedStepsPersonalData] =
    React.useState(false)
  const [completedStepsExperience, setCompletedStepsExperience] =
    React.useState(false)
  // const [completedStepsQualification, setCompletedStepsQualification] =
  //   React.useState(false)
  // const [completedStepsEducation, setCompletedStepsEducation] =
  //   React.useState(false)
  // const [completedStepsPortfolio, setCompletedStepsPortfolio] =
  //   React.useState(false)
  // const [completedStepsSkills, setCompletedStepsSkills] = React.useState(false)
  // const [completedStepsAbout, setCompletedStepsAbout] = React.useState(false)
  // const [completedLayouts, setCompletedLayouts] = React.useState(false)

  // --------------------------- Работа с данными через локальное хранилище -----------------------

  // Записываем в объект данные из полей
  const [values, setValues] = React.useState(
    JSON.parse(localStorage.getItem('formData')) || {
      languages: [{ id: uuidv4() }],
      jobs: {},
    }
    // {
    //   languages: [
    //     {
    //       id: '14fd7a7e-5c9d-4551-8a41-24a27be682bb',
    //       language: 'Английский',
    //       level: 'B1',
    //     },
    //     {
    //       id: '1842875f-cdce-422e-acad-157bfc6454ec',
    //       language: 'B1',
    //       level: 'B2',
    //     },
    //   ],
    //   jobs: {},
    //   month_work_end: '',
    //   month_work_start: 6,
    //   year_work_start: '2023',
    //   year_work_end: '',
    //   company: 'Яндекс Крауд / Специалист',
    //   company_website: 'https://yandex.ru/project/remote-work/',
    //   current_position: 'Специалист',
    //   duties: `Разметка видео и изображений; для обучения ИИ в в программах CVAT, Supervisely;
    //   Проверка разметки на наличие нарушений. Пользовательское тестирование.
    //   `,
    //   name: 'Павел',
    //   surname: 'Чурунов',
    //   birthday: '27.11.1987',
    //   city: 'г. Москва',
    //   desired_position: 'Аналитик',
    //   email: 'ChPavel@mail.ru',
    //   telegram: 't.me/chpavel',
    //   githab: 'https://github.com/cakamup1',
    //   level_knowledge: 'Middle',
    //   work_status: 'Принимаю предложения',
    //   phone: '+7(916)545-43-32',
    // }
  )

  // LANGUAGES:
  const addLanguage = () => {
    setValues({
      ...values,
      languages: [...values.languages, { id: uuidv4() }],
    })
  }
  const [languagesAfterChanges, setLanguagesChanges] = useState(
    values.languages
  )

  useEffect(() => {
    setValues({ ...values, languages: languagesAfterChanges })
  }, [languagesAfterChanges])

  // const handleLanguageChange = evt => {
  //   const { name, value } = evt.target
  //   const index = name.slice(9)
  //   const languageToBeChanged = values.languages.find(m => m.id === index)
  //   languageToBeChanged.language = value
  // }

  // const handleLanguageLevelChange = evt => {
  //   const { name, value } = evt.target
  //   const index = name.slice(15)
  //   const languageToBeChanged = values.languages.find(m => m.id === index)
  //   languageToBeChanged.level = value
  // }

  const [languagesAfterDeleting, setLanguagesAfterDeleting] = useState(
    values.languages
  )

  useEffect(() => {
    if (languagesAfterDeleting.length === 0) {
      setValues({ ...values, languages: [{ id: uuidv4() }] })
    } else {
      setValues({ ...values, languages: languagesAfterDeleting })
    }
  }, [languagesAfterDeleting])

  // RECOMMENDATIONS:
  const [duties, setDuties] = useState(false)

  // // Если опыт есть, поля активны. Если нет, поля деактивируются:
  const [hasExperience, setHasExperience] = React.useState(
    JSON.parse(localStorage.getItem('hasExperience') || true)
  )
  // Записываем в объект данные чекбоксов
  const [checkboxValues, setCheckboxValues] = React.useState(
    JSON.parse(localStorage.getItem('checkboxData')) || {}
  )
  // Записываем данные isTillPresent в один объект
  const [allTillPresent, setAllTillPresent] = React.useState(
    JSON.parse(localStorage.getItem('isTillPresent')) || {}
  )

  // Функция, которая записывает данные чекбоксов
  const handleCheckboxChange = evt => {
    const { name } = evt.target
    setCheckboxValues(prevValues => ({
      ...prevValues,
      [name]: !prevValues[name],
    }))
  }
  const [errors, setErrors] = useState({})
  function deleteNonLatin(text) {
    return text.replace(/[^A-Za-z0-9:_//.]/gi, '')
  }
  function checkTgInput(name, value) {
    const cleanValue = deleteNonLatin(value)
    if (cleanValue === '') {
      setValues({ ...values, [name]: '' })
    } else if (cleanValue === 'https://t.me/') {
      setValues({ ...values, [name]: '' })
    } else if (cleanValue.includes('https://t.me/')) {
      setValues({ ...values, [name]: cleanValue })
    } else {
      setValues({ ...values, [name]: `https://t.me/${cleanValue}` })
    }
  }
  // Функция, которая записывает данные полей форм
  const handleChange = evt => {
    const { name, value } = evt.target
    console.log(evt.target.select)
    const cleanValue = deleteNonLatin(value)
    if (name === 'telegram') {
      checkTgInput(name, cleanValue)
    } else {
      setValues({ ...values, [name]: value })
    }
    setErrors({ ...errors, [name]: evt.target.validationMessage })
  }
  // INPUTS  VALIDATION:
  const handleChangeWithValidation = evt => {
    handleChange(evt)
    const { name, value } = evt.target
    if (name === 'email' && !EMAIL_REGEX.test(value)) {
      setErrors({
        ...errors,
        email: 'Введите email в формате address@domain.com',
      })
    }
    if (name === 'email' && evt.target.value.length > 55) {
      setErrors({
        ...errors,
        email: 'Email должен быть длиной от 5 до 50 символов',
      })
    }
    if (name === 'birthday' && !BIRTHDAY_REGEX.test(value)) {
      setErrors({
        ...errors,
        birthday: 'Дата рождения введена некорректно',
      })
    }
  }

  // Сохраняем данные полей в локалное хранилище
  const handleClick = () => {
    const checkboxData = { ...checkboxValues }
    const formData = { ...values }
    localStorage.setItem('checkboxData', JSON.stringify(checkboxData))
    localStorage.setItem('formData', JSON.stringify(formData))
    localStorage.setItem('hasExperience', JSON.stringify(hasExperience))
    localStorage.setItem('isTillPresent', JSON.stringify(allTillPresent))
  }

  /* ----------------------------------------- Popup -----------------------------------------------------*/
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false)
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)
  const [isResumeNamePopupOpen, setIsResumeNamePopupOpen] =
    React.useState(false)

  // закрытие попапа
  const closeAllPopup = () => {
    setIsLoginPopupOpen(false)
    setIsRegisterPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsResumeNamePopupOpen(false)
  }

  // открытие попапа
  // eslint-disable-next-line no-unused-vars
  const handleResumeNamePopupOpen = () => {
    setIsResumeNamePopupOpen(true)
  }
  // eslint-disable-next-line no-unused-vars
  const handleLoginPopupOpen = () => {
    setIsLoginPopupOpen(true)
  }
  // eslint-disable-next-line no-unused-vars
  const handleRegisterPopupOpen = () => {
    setIsRegisterPopupOpen(true)
  }
  const handleConfirmPopupOpen = () => {
    setIsConfirmPopupOpen(true)
  }

  // /* убрать эти консоли */
  // // eslint-disable-next-line no-console
  // console.log(handleLoginPopupOpen)
  // // eslint-disable-next-line no-console
  // console.log(handleRegisterPopupOpen)
  // // eslint-disable-next-line no-console
  // console.log(handleResumeNamePopupOpen)
  // // eslint-disable-next-line no-console
  // console.log(handleConfirmPopupOpen)
  // /* --------- для Popup ---------*/

  // Объект для защиты дочерних роутов Resume
  const routesResumeArr = [
    {
      path: 'personal-data',
      element: (
        <PersonalData
          values={values}
          handleChange={handleChange}
          // handleLanguageChange={handleLanguageChange}
          // handleLanguageLevelChange={handleLanguageLevelChange}
          setLanguagesChanges={setLanguagesChanges}
          setValues={setValues}
          addLanguage={addLanguage}
          setLanguagesAfterDeleting={setLanguagesAfterDeleting}
          errors={errors}
          handleChangeWithValidation={handleChangeWithValidation}
        />
      ),
      id: 1,
      completedSteps: completedStepsPersonalData,
    },
    {
      path: 'experience',
      element: (
        <Experience
          values={values}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          checkboxValues={checkboxValues}
          hasExperience={hasExperience}
          setCheckboxValues={setCheckboxValues}
          setHasExperience={setHasExperience}
          setValues={setValues}
          setAllTillPresent={setAllTillPresent}
          allTillPresent={allTillPresent}
          setDuties={setDuties}
        />
      ),
      id: 2,
      completedSteps: completedStepsExperience,
    },
    // {
    //   path: 'qualification',
    //   element: <Qualification />,
    //   id: 3,
    //   completedSteps: completedStepsQualification,
    // },
    // {
    //   path: 'education',
    //   element: <Education />,
    //   id: 4,
    //   completedSteps: completedStepsEducation,
    // },
    // {
    //   path: 'portfolio',
    //   element: <Portfolio />,
    //   id: 5,
    //   completedSteps: completedStepsPortfolio,
    // },
    // {
    //   path: 'skills',
    //   element: <Skills />,
    //   id: 6,
    //   completedSteps: completedStepsSkills,
    // },
    // {
    //   path: 'about',
    //   element: <About />,
    //   id: 7,
    //   completedSteps: completedStepsAbout,
    // },
    // {
    //   path: 'layouts',
    //   element: <Layouts />,
    //   id: 8,
    //   completedSteps: completedLayouts,
    // },
    {
      path: 'result',
      element: <Result values={values} checkboxValues={checkboxValues} />,
      id: 9,
      completedSteps: completedStepsPersonalData,
    },
  ]

  // TODO: добавить описание функции регистрации по готовности Api
  // eslint-disable-next-line no-unused-vars
  const handleRegister = (name, email, password) => {
    // eslint-disable-next-line no-console
    console.log('try register')
  }

  // TODO: добавить описание функции авторизации по готовности Api
  // eslint-disable-next-line no-unused-vars
  const handleLogin = (email, password) => {
    // eslint-disable-next-line no-console
    console.log('try to login')
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register
                  onRegister={handleRegister}
                  isOpen={isRegisterPopupOpen}
                />
              )
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login
                  onLogin={handleLogin}
                  isOpen={isLoginPopupOpen}
                  isLoggedIn={isLoggedIn}
                />
              )
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                onOpenPopup={handleConfirmPopupOpen}
              />
            }
          />
          <Route
            path="/profession"
            element={
              <Profession
                isLoggedIn={isLoggedIn}
                onOpenPopup={handleConfirmPopupOpen}
              />
            }
          />
          <Route
            path="/resume"
            element={
              <Resume
                isLoggedIn={isLoggedIn}
                onOpenPopup={handleConfirmPopupOpen}
                setCompletedStepsPersonalData={setCompletedStepsPersonalData}
                setCompletedStepsExperience={setCompletedStepsExperience}
                // setCompletedStepsQualification={setCompletedStepsQualification}
                // setCompletedStepsEducation={setCompletedStepsEducation}
                // setCompletedStepsPortfolio={setCompletedStepsPortfolio}
                // setCompletedStepsSkills={setCompletedStepsSkills}
                // setCompletedStepsAbout={setCompletedStepsAbout}
                // setCompletedLayouts={setCompletedLayouts}
                onClick={handleClick}
                duties={duties}
              />
            }
          >
            <Route index element={<Navigate to="personal-data" />} />
            {routesResumeArr.map((route, i) => (
              <Route
                path={route.path}
                element={
                  i === 0 || routesResumeArr[i - 1].completedSteps ? (
                    route.element
                  ) : (
                    <Navigate to="/resume" replace />
                  )
                }
                key={route.id}
              />
            ))}
          </Route>
          {/* может быть включить в состав роутов  resume?  */}
          <Route
            path="/result-resume"
            element={
              <ResultResume
                values={values}
                checkboxValues={checkboxValues}
                isLoggedIn={isLoggedIn}
                onOpenPopup={handleConfirmPopupOpen}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Попап регистрации */}
        <PopupRegister
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopup}
          onRegister={handleRegister}
        />
        {/* Попап авторизации */}
        <PopupLogin
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopup}
          onLogin={handleLogin}
        />
        {/* Попап подтверждения */}
        <PopupConfirmation
          setCheckboxValues={setCheckboxValues}
          setValues={setValues}
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopup}
        />
        {/* попап добавления имени резюме */}
        <PopupResumeName
          isOpen={isResumeNamePopupOpen}
          onClose={closeAllPopup}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
