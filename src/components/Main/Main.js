import React from 'react'
import PropTypes from 'prop-types'
import './Main.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Main({ isLoggedIn, onOpenPopup }) {
	const nextPage = '/resume'
	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				nextPage={nextPage}
				onOpenPopup={onOpenPopup}
			/>
			<main className="main">Main</main>
			<Footer />
		</>
	)
}

Main.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	onOpenPopup: PropTypes.func.isRequired,
}

export default Main
