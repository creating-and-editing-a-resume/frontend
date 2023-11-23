/* eslint-disable array-callback-return */
import React from 'react'
import './App.scss'
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
import About from '../Resume/About/About'
import Education from '../Resume/Education/Education'
import Expirience from '../Resume/Experience/Experience'
import Layouts from '../Resume/Layouts/Layouts'
import PersonalData from '../Resume/PersonalData/PersonalData'
import Portfolio from '../Resume/Portfolio/Portfolio'
import Qualification from '../Resume/Qualification/Qualification'
import Result from '../Resume/Result/Result'
import Skills from '../Resume/Skills/Skills'

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
  const [completedStepsQualification, setCompletedStepsQualification] =
    React.useState(false)
  const [completedStepsEducation, setCompletedStepsEducation] =
    React.useState(false)
  const [completedStepsPortfolio, setCompletedStepsPortfolio] =
    React.useState(false)
  const [completedStepsSkills, setCompletedStepsSkills] = React.useState(false)
  const [completedStepsAbout, setCompletedStepsAbout] = React.useState(false)
  const [completedLayouts, setCompletedLayouts] = React.useState(false)

  // Объект для защиты дочерних роутов Resume
  const routesResumeArr = [
    {
      path: 'personal-data',
      element: (
        <PersonalData setCompletedSteps={setCompletedStepsPersonalData} />
      ),
      id: 1,
      completedSteps: completedStepsPersonalData,
    },
    {
      path: 'experience',
      element: <Expirience setCompletedSteps={setCompletedStepsExperience} />,
      id: 2,
      completedSteps: completedStepsExperience,
    },
    {
      path: 'qualification',
      element: (
        <Qualification setCompletedSteps={setCompletedStepsQualification} />
      ),
      id: 3,
      completedSteps: completedStepsQualification,
    },
    {
      path: 'education',
      element: <Education setCompletedSteps={setCompletedStepsEducation} />,
      id: 4,
      completedSteps: completedStepsEducation,
    },
    {
      path: 'portfolio',
      element: <Portfolio setCompletedSteps={setCompletedStepsPortfolio} />,
      id: 5,
      completedSteps: completedStepsPortfolio,
    },
    {
      path: 'skills',
      element: <Skills setCompletedSteps={setCompletedStepsSkills} />,
      id: 6,
      completedSteps: completedStepsSkills,
    },
    {
      path: 'about',
      element: <About setCompletedSteps={setCompletedStepsAbout} />,
      id: 7,
      completedSteps: completedStepsAbout,
    },
    {
      path: 'layouts',
      element: <Layouts setCompletedSteps={setCompletedLayouts} />,
      id: 8,
      completedSteps: completedLayouts,
    },
    {
      path: 'result',
      element: <Result />,
      id: 9,
      completedSteps: completedStepsPersonalData,
      setCompletedSteps: null,
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
                <Register onRegister={handleRegister} />
              )
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} />
            }
          />
          <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
          <Route
            path="/profession"
            element={<Profession isLoggedIn={isLoggedIn} />}
          />
          <Route path="/resume" element={<Resume isLoggedIn={isLoggedIn} />}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
