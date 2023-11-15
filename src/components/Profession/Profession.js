import React from 'react'
import PropTypes from 'prop-types'
import './Profession.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Profession({ isLoggedIn, onOpenPopup }) {
	const nextPage = '/my-profile'
	return (
		<>
			<Header
				isLoggedIn={isLoggedIn}
				nextPage={nextPage}
				onOpenPopup={onOpenPopup}
			/>
			<main className="profession">Profession</main>
			<Footer />
		</>
	)
}

Profession.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	onOpenPopup: PropTypes.func.isRequired,
}
export default Profession
