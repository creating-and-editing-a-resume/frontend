import React from 'react'
import PropTypes from 'prop-types'
import './Resume.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Resume({ isLoggedIn, onOpenPopup }) {
	const nextPage = '/profession'
	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				nextPage={nextPage}
				onOpenPopup={onOpenPopup}
			/>
			<main className="resume">Resume</main>
			<Footer />
		</>
	)
}
Resume.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	onOpenPopup: PropTypes.func.isRequired,
}

export default Resume
