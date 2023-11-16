/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import PropTypes from 'prop-types'
import './RegistrationField.scss'

const RegistrationField = ({
	name,
	placeholder,
	type,
	errors,
	handleChange,
	values,
	eye,
	isOpen,
}) => {
	const inputReference = React.createRef()

	const handleToggle = () => {
		if (inputReference && inputReference.current) {
			if (inputReference.current.type === 'text') {
				inputReference.current.type = 'password'
			} else {
				inputReference.current.type = 'text'
			}
		}
	}

	return (
		<div className="registration-field">
			<input
				className={`registration-field__input ${
					isOpen && 'registration-field__input_popup'
				}`}
				name={name}
				type={type}
				placeholder={placeholder}
				required
				onChange={handleChange}
				value={values[name] || ''}
				ref={inputReference}
			/>
			{eye && (
				<button
					type="button"
					className="registration-field__button link"
					onClick={handleToggle}
				/>
			)}
			{errors && (
				<span className="registration-field__input-error">
					{errors[name]}
				</span>
			)}
		</div>
	)
}

RegistrationField.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	errors: PropTypes.objectOf(PropTypes.string).isRequired,
	handleChange: PropTypes.func.isRequired,
	values: PropTypes.objectOf(PropTypes.string).isRequired,
	eye: PropTypes.bool,
	isOpen: PropTypes.bool.isRequired,
}

RegistrationField.defaultProps = {
	eye: false,
}

export default RegistrationField
