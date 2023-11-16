import React from 'react'
import PropTypes from 'prop-types'
import './FormTitle.scss'

const FormTitle = ({ page, greeting, isOpen }) => (
	<div
		className={`form-title__container form-title__container_${page} ${
			isOpen && `form-title__container_popup`
		}`}
	>
		<h1 className="form-title__greeting">{greeting}</h1>
	</div>
)

FormTitle.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	page: PropTypes.string.isRequired,
	greeting: PropTypes.string.isRequired,
}

export default FormTitle
