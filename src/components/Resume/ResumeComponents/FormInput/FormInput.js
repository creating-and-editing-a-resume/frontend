import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './FormInput.scss'
import Tip from '../Tip/Tip'

const FormInput = ({
  label,
  tip,
  tipText,
  extraInputClass,
  disabled,
  name,
  values,
  handleChange,
  setValues,
  setDuties,
  errors,
}) => {
  // console.log(`${name}: ${values[name]}`)
  // console.log(name)
  // console.log(values)
  React.useEffect(() => {
    if (disabled) {
      setValues(prevValues => ({
        ...prevValues,
        company: '',
        company_website: '',
        current_position: '',
        [name]: '',
      }))
    }
  }, [disabled])

  const handleFocus = () => {
    setDuties(true)
  }

  const handleBlur = () => {
    setDuties(false)
  }

  return (
    <div className="form-input">
      <div className="form-input__label-container">
        <label className="form-input__label" htmlFor="form-input">
          {label}
        </label>
        {tip && <Tip text={tipText} />}
      </div>
      <textarea
        name={name}
        value={values[name] || ''}
        onChange={handleChange}
        disabled={disabled}
        id="form-input"
        className={classNames(
          'form-input__field',
          extraInputClass && `form-input__field_${extraInputClass}`
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {errors && (
        <span className="form-input__input-error">{errors[name]}</span>
      )}
    </div>
  )
}
FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  tip: PropTypes.bool,
  tipText: PropTypes.node,
  extraInputClass: PropTypes.string,
  disabled: PropTypes.bool,
  values: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func,
  name: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  setValues: PropTypes.func,
  setDuties: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
}

FormInput.defaultProps = {
  tip: false,
  tipText: '',
  extraInputClass: '',
  disabled: false,
  values: {},
  handleChange: () => {},
  name: [],
  setValues: () => {},
  setDuties: () => {},
}

export default FormInput
