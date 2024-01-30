/* eslint-disable react/prop-types */
import classNames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import './Checkbox.scss'

const Checkbox = ({
  checkboxText,
  checkboxId,
  onClick,
  name,
  values,
  handleCheckboxChange,
  disabled,
}) => (
  <div className="checkbox__container">
    <label className="checkbox__label" htmlFor={checkboxId}>
      <input
        name={name}
        type="checkbox"
        onClick={onClick}
        id={checkboxId}
        disabled={disabled === true}
        className="checkbox__input"
        onChange={handleCheckboxChange}
        checked={values[name]}
      />
      <span
        className={classNames(
          'checkbox__text',
          disabled && 'checkbox__text_inactive'
        )}
      >
        {checkboxText}
      </span>
    </label>
  </div>
)

Checkbox.propTypes = {
  checkboxText: PropTypes.string.isRequired,
  checkboxId: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  handleCheckboxChange: PropTypes.func,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  name: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
}

Checkbox.defaultProps = {
  onClick: () => {},
  handleCheckboxChange: () => {},
  checkboxValues: {},
  name: '',
}

export default Checkbox
