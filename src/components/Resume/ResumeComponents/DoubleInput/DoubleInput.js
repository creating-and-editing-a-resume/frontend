import React from 'react'
import PropTypes from 'prop-types'
import './DoubleInput.scss'
import Tip from '../Tip/Tip'

const DoubleInput = ({
  firstLabel,
  tip,
  tipText,
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
}) => (
  <div className="double-input">
    <div className="double-input__left-box">
      <div className="double-input__label-container">
        <label className="double-input__label" htmlFor="selected-input-first">
          {firstLabel}
        </label>
        {tip && <Tip text={tipText} />}
      </div>
      {selectedInputFirst && (
        <div className="double-input__select-wrapper">
          <select
            id="selected-input-first"
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
            {tip && <Tip text={tipText} />}
          </div>
          {selectedInputSecond && (
            <div className="double-input__select-wrapper">
              <select
                id="selected-input-second"
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
  tip: PropTypes.bool,
  tipText: PropTypes.node,
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
  tip: false,
  tipText: '',
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
