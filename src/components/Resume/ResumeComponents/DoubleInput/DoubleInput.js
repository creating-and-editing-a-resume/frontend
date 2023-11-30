/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import './DoubleInput.scss'
import Tip from '../Tip/Tip'

const DoubleInput = ({
  firstLabel,
  tipFirst,
  tipTextFirst,
  tipSecond,
  tipTextSecond,
  disabled,
  doubleInput,
  secondLabel,
  placeholder,
  selectedInputFirst,
  ordinaryInputFirst,
  selectedInputSecond,
  ordinaryInputSecond,
  optionsInputFirst,
  optionsInputSecond,
  values,
  handleChange,
  name,
}) => (
  <div className="double-input">
    <div className="double-input__left-box">
      <div className="double-input__label-container">
        <label className="double-input__label" htmlFor="selected-input-first">
          {firstLabel}
        </label>
        {tipFirst && <Tip text={tipTextFirst} />}
      </div>
      {selectedInputFirst && (
        <div className="double-input__select-wrapper">
          <select
            id={values[name[1]]}
            name={name[1]}
            onChange={handleChange}
            value={values[name[1]]}
            className="double-input__field double-input__field_selected"
          >
            {optionsInputFirst.map(value => (
              <option value={value} className="double-input__field" key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      )}
      {ordinaryInputFirst && (
        <textarea
          name={name[0]}
          onChange={handleChange}
          value={values[name[0]]}
          className="double-input__field"
          disabled={disabled}
          //   id="ordinary-input-first"
          placeholder={placeholder}
        />
      )}
    </div>
    <div className="double-input__right-box">
      {doubleInput && (
        <>
          <div className="double-input__label-container">
            <label
              className="double-input__label"
              htmlFor="selected-input-second"
            >
              {secondLabel}
            </label>
            {tipSecond && <Tip text={tipTextSecond} />}
          </div>
          {selectedInputSecond && (
            <div className="double-input__select-wrapper">
              <select
                name={name[1]}
                onChange={handleChange}
                value={values[name[1]]}
                id={values[name[1]]}
                className="double-input__field double-input__field_selected"
              >
                {optionsInputSecond.map(value => (
                  <option
                    value={value}
                    className="double-input__option"
                    key={value}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </div>
          )}
          {ordinaryInputSecond && (
            <textarea
              name={name[1]}
              onChange={handleChange}
              value={values[name[1]]}
              className="double-input__field double-input__field_short"
              disabled={disabled}
              //   id="ordinary-input-second"
            />
          )}
        </>
      )}
    </div>
  </div>
)
DoubleInput.propTypes = {
  firstLabel: PropTypes.string.isRequired,
  secondLabel: PropTypes.string,
  tipFirst: PropTypes.bool,
  tipTextFirst: PropTypes.node,
  tipSecond: PropTypes.bool,
  tipTextSecond: PropTypes.node,
  disabled: PropTypes.bool,
  doubleInput: PropTypes.bool,
  placeholder: PropTypes.node,
  selectedInputFirst: PropTypes.bool,
  ordinaryInputFirst: PropTypes.bool,
  selectedInputSecond: PropTypes.bool,
  ordinaryInputSecond: PropTypes.bool,
  optionsInputFirst: PropTypes.arrayOf(PropTypes.string),
  optionsInputSecond: PropTypes.arrayOf(PropTypes.string),
}

DoubleInput.defaultProps = {
  tipFirst: false,
  tipTextFirst: '',
  tipSecond: false,
  tipTextSecond: '',
  disabled: false,
  doubleInput: false,
  placeholder: '',
  secondLabel: '',
  selectedInputFirst: false,
  ordinaryInputFirst: false,
  selectedInputSecond: false,
  ordinaryInputSecond: false,
  optionsInputFirst: [],
  optionsInputSecond: [],
}

export default DoubleInput
