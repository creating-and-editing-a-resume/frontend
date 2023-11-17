import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './AddButton.scss'

const AddButton = ({ disabled, handleClick }) => (
	<button
		className={classNames(
			'add-button',
			disabled ? 'add-button_inactive' : 'link'
		)}
		type="button"
		disabled={disabled}
		onClick={handleClick}
	>
		+ Добавить
	</button>
)

AddButton.propTypes = {
	disabled: PropTypes.bool,
	handleClick: PropTypes.func.isRequired,
}

AddButton.defaultProps = {
	disabled: false,
}

export default AddButton
