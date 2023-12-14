/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './RegistrationField.scss'
import classNames from 'classnames'

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

  const [eyeClosed, setEyeClosed] = useState(false)

  const handleToggle = () => {
    if (inputReference && inputReference.current) {
      if (inputReference.current.type === 'text') {
        inputReference.current.type = 'password'
        setEyeClosed(false)
      } else {
        inputReference.current.type = 'text'
        setEyeClosed(true)
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
          className={classNames(
            'registration-field__eye link',
            eyeClosed && 'registration-field__eye_closed'
          )}
          onClick={handleToggle}
        />
      )}
      {errors && (
        <span className="registration-field__input-error">{errors[name]}</span>
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
  isOpen: PropTypes.bool,
}

RegistrationField.defaultProps = {
  eye: false,
  isOpen: false,
}

export default RegistrationField
