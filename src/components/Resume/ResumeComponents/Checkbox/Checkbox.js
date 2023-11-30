/* eslint-disable react/prop-types */
import PropTypes from 'prop-types'
import React from 'react'
import './Checkbox.scss'

const Checkbox = ({
  checkboxText,
  checkboxId,
  onClick,
  name,
  checkboxValues,
  handleCheckboxChange,
  disabled,
  setCheckboxValues,
}) => {
  React.useEffect(() => {
    if (disabled) {
      setCheckboxValues({
        ...checkboxValues,
        work_period_checkbox: false,
        work_period_checkbox_1: false,
        work_period_checkbox_2: false,
        [name]: false,
      })
    }
  }, [disabled])
  return (
    <div className="checkbox__container">
      <label className="checkbox__label" htmlFor={checkboxId}>
        <input
          name={name}
          type="checkbox"
          onClick={onClick}
          id={checkboxId}
          disabled={disabled}
          className="checkbox__input"
          onChange={handleCheckboxChange}
          checked={checkboxValues[name] ? checkboxValues[name] : false}
        />
        <span className="checkbox__text">{checkboxText}</span>
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  checkboxText: PropTypes.string.isRequired,
  checkboxId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  handleCheckboxChange: PropTypes.func,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  name: PropTypes.string,
  disabled: PropTypes.bool,
}

Checkbox.defaultProps = {
  onClick: () => {},
  handleCheckboxChange: () => {},
  checkboxValues: {},
  name: '',
  disabled: undefined,
}

export default Checkbox
