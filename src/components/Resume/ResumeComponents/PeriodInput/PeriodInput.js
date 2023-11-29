import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './PeriodInput.scss'
import classNames from 'classnames'
import Tip from '../Tip/Tip'
import Checkbox from '../Checkbox/Checkbox'
import MonthPicker from './MonthPicker/MonthPicker'

const PeriodInput = ({
  labelOne,
  labelTwo,
  month,
  tip,
  tipText,
  disabled,
  i,
  tillPresent,
  isTillPresent,
  setIsTillPresent,
  namePeriod,
  setValues,
  monthPeriod,
  year,
  values,
  handleCheckboxChange,
  checkboxValues,
}) => {
  const [disabledMonthChoice, setDisabledMonthChoice] = useState(false)

  const handleCheckboxToggle = () => {
    setIsTillPresent(!isTillPresent)
  }

  const handleYearChange = evt => {
    const { name, value } = evt.target
    setValues({ ...values, [name]: value })
  }

  useEffect(() => {
    setDisabledMonthChoice(disabled)
  }, [disabled])

  return (
    <div
      className={classNames(
        'period-input__container',
        !month && 'period-input__container_year-only'
      )}
    >
      <div className="form-input">
        <div className="form-input__label-container">
          <label className="form-input__label" htmlFor="form-input">
            {labelOne}
          </label>
          {tip && <Tip text={tipText} />}
        </div>
        <div
          className={classNames(
            'period-input__inputs-container',
            !month && 'period-input__inputs-container_year-only'
          )}
        >
          {month && (
            <MonthPicker
              name={monthPeriod[0]}
              values={values}
              setValues={setValues}
              disabled={disabled}
            />
          )}
          <input
            name={year[0]}
            value={values[year[0]] ? values[year[0]] : ''}
            onChange={handleYearChange}
            type="text"
            placeholder="Год"
            id={year[0]}
            className={classNames(
              'period-input__field form-input__field',
              !month && 'period-input__field_year-only'
            )}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="form-input">
        <div className="form-input__label-container">
          <label className="form-input__label" htmlFor="form-input">
            {labelTwo}
          </label>
          {tip && <Tip text={tipText} />}
        </div>
        <div
          className={classNames(
            'period-input__inputs-container',
            !month && 'period-input__inputs-container_year-only'
          )}
        >
          {month && (
            <MonthPicker
              name={monthPeriod[1]}
              values={values}
              setValues={setValues}
              disabled={disabledMonthChoice || isTillPresent}
            />
          )}
          <input
            name={year[1]}
            value={values[year[1]] ? values[year[1]] : ''}
            onChange={handleYearChange}
            type="text"
            placeholder="Год"
            id={year[1]}
            className={classNames(
              'period-input__field form-input__field',
              !month && 'period-input__field_year-only'
            )}
            disabled={disabled || isTillPresent}
          />
        </div>

        {tillPresent && (
          <div className="period-input__checkbox-container">
            <Checkbox
              disabled={disabled}
              name={namePeriod}
              values={checkboxValues}
              handleCheckboxChange={handleCheckboxChange}
              checkboxText="Настоящее время"
              checkboxId={`period-checkbox${i}`}
              onClick={handleCheckboxToggle}
            />
          </div>
        )}
      </div>
    </div>
  )
}

PeriodInput.propTypes = {
  labelOne: PropTypes.string.isRequired,
  labelTwo: PropTypes.string.isRequired,
  month: PropTypes.bool,
  tip: PropTypes.bool,
  tipText: PropTypes.node,
  disabled: PropTypes.bool,
  i: PropTypes.string.isRequired,
  tillPresent: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  isTillPresent: PropTypes.bool,
  setIsTillPresent: PropTypes.func,
  namePeriod: PropTypes.string,
  setValues: PropTypes.func,
  monthPeriod: PropTypes.arrayOf(PropTypes.string),
  year: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
}

PeriodInput.defaultProps = {
  month: false,
  tip: false,
  tipText: '',
  disabled: false,
  tillPresent: false,
  handleCheckboxChange: () => {},
  checkboxValues: {},
  setIsTillPresent: () => {},
  isTillPresent: undefined,
  namePeriod: undefined,
  setValues: () => {},
  monthPeriod: [],
  year: [],
  values: {},
}

export default PeriodInput
