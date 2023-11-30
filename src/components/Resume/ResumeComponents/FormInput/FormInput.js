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
}) => (
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
      disabled={disabled || false}
      id="form-input"
      className={classNames(
        'form-input__field',
        extraInputClass && `form-input__field_${extraInputClass}`
      )}
    />
  </div>
)
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
  name: PropTypes.string,
}

FormInput.defaultProps = {
  tip: false,
  tipText: '',
  extraInputClass: '',
  disabled: false,
  values: {},
  handleChange: () => {},
  name: '',
}

export default FormInput
