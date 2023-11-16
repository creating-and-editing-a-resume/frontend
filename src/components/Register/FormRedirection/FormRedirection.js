import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './FormRedirection.scss'

const FormRedirection = ({ page, text, button, path, isOpen }) => (
	<div
		className={`form-redirection__container form-redirection__container_${page} ${
			isOpen && 'form-redirection__container_popup'
		}`}
	>
		{text && <span className="form-redirection__text">{text}</span>}
		<Link className="form-redirection__button link" to={path}>
			{button}
		</Link>
	</div>
)

FormRedirection.propTypes = {
	page: PropTypes.string.isRequired,
	text: PropTypes.string,
	button: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
}

FormRedirection.defaultProps = {
	text: '',
}

export default FormRedirection
