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

import PopupRegister from '../PopupRegister/PopupRegister'
import PopupConfirmation from '../PopupConfirmation/PopupConfirmation'
import PopupResumeName from '../PopupResumeName/PopupResumeName'
import PopupLogin from '../PopupLogin/PopupLogin'

function App() {
	/* --------- Popup ---------*/
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
	const handleResumeNamePopupOpen = () => {
		setIsResumeNamePopupOpen(true)
	}
	const handleLoginPopupOpen = () => {
		setIsLoginPopupOpen(true)
	}
	const handleRegisterPopupOpen = () => {
		setIsRegisterPopupOpen(true)
	}
	const handleConfirmPopupOpen = () => {
		setIsConfirmPopupOpen(true)
	}

	/* убрать эти консоли */
	// eslint-disable-next-line no-console
	console.log(handleLoginPopupOpen)
	// eslint-disable-next-line no-console
	console.log(handleRegisterPopupOpen)
	// eslint-disable-next-line no-console
	console.log(handleResumeNamePopupOpen)
	// eslint-disable-next-line no-console
	console.log(handleConfirmPopupOpen)
	/* --------- для Popup ---------*/

	// eslint-disable-next-line no-unused-vars
	const [isLoggedIn, setIsLoggedIn] = React.useState(false) // Пользователь авторизован/неавторизован
	// eslint-disable-next-line no-unused-vars
	const [currentUser, setCurrentUser] = React.useState({}) // Сохраняем данные пользователя

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
								<Login
									onLogin={handleLogin}
									isOpen={isLoginPopupOpen}
								/>
							)
						}
					/>
					<Route
						path="/my-profile"
						element={
							<ProtectedRoute
								element={Profile}
								isLoggedIn={isLoggedIn}
								// onOpenPopup={handleConfirmPopupOpen}
							/>
						}
					/>
					<Route
						path="/"
						element={
							<Main
								isLoggedIn={isLoggedIn}
								onOpenPopup={handleResumeNamePopupOpen}
							/>
						}
					/>
					<Route
						path="/profession"
						element={
							<Profession
								isLoggedIn={isLoggedIn}
								onOpenPopup={handleConfirmPopupOpen}
								// onOpenPopup={handleLoginPopupOpen}
							/>
						}
					/>
					<Route
						path="/resume"
						element={
							<Resume
								isLoggedIn={isLoggedIn}
								onOpenPopup={handleLoginPopupOpen}
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
