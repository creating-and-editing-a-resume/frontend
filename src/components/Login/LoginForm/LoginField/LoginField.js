import React from 'react'
import './LoginField.scss'

const LoginField = ({
	label,
	name,
	placeholder,
	type,
	errors,
	handleChange,
	values,
}) => (
	<div className="login-field">
		<label className="login-field__label" htmlFor={name}>
			{label}
		</label>
		<input
			id={name}
			className="login-field__input"
			name={name}
			type={type}
			placeholder={placeholder}
			required
			onChange={handleChange}
			value={values[name] || ''}
		/>
		{errors && (
			<span className="login-field__input-error">{errors[name]}</span>
		)}
	</div>
)

export default LoginField
