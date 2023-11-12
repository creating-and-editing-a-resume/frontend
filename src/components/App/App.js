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

function App() {
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
	// eslint-disable-next-line no-unused-vars
	const handleLogin = (email, password) => {
		// eslint-disable-next-line no-console
		console.log('try to sign in')
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
							<ProtectedRoute
								element={Profile}
								isLoggedIn={isLoggedIn}
							/>
						}
					/>
					<Route path="/" element={<Main />} />
					<Route path="/profession" element={<Profession />} />
					<Route path="/resume" element={<Resume />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</CurrentUserContext.Provider>
		</div>
	)
}

export default App
