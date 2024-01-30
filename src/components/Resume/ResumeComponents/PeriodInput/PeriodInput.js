import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
  namePeriod,
  setValues,
  monthPeriod,
  year,
  values,
  handleCheckboxChange,
  handleChange,
  errors,
  allValues,
  education,
}) => {
  const location = useLocation()
  const [disabledMonthChoice, setDisabledMonthChoice] = useState(false)
  useEffect(() => {
    if (values[namePeriod] === true) {
      if (i === '0' || i === '1') {
        setValues(prevValue => ({
          ...prevValue,
          [monthPeriod[1]]: '',
          [year[1]]: '',
        }))
      } else {
        if (location.pathname === '/resume/experience') {
          const dateClear = allValues.jobs.map(job => {
            if (i === job.id) {
              return { ...job, [monthPeriod[1]]: '', [year[1]]: '' }
            }
            return job
          })
          setValues(prevValue => ({ ...prevValue, jobs: dateClear }))
        }

        if (location.pathname === '/resume/education') {
          const yearClear = allValues.educations.map(ed => {
            if (i === ed.id) {
              return { ...ed, [year[1]]: '' }
            }
            return ed
          })
          setValues(prevValue => ({ ...prevValue, educations: yearClear }))
        }
      }
    }
    if (disabled) {
      setValues(prevValues => ({ ...prevValues, [namePeriod]: false }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values[namePeriod]])

  useEffect(() => {
    if (disabled) {
      setValues({
        ...values,
        [monthPeriod[1]]: '',
        [monthPeriod[0]]: '',
        [year[0]]: '',
        [year[1]]: '',
      })
      setValues(prevValues => ({ ...prevValues, [namePeriod]: false }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

  const handleCheckboxToggle = () => {
    setValues(prevValues => ({
      ...prevValues,
      [namePeriod]: !prevValues.namePeriod,
    }))
  }

  useEffect(() => {
    setDisabledMonthChoice(disabled)
  }, [disabled])

  return (
    <div
      className={classNames(
        'period-input__container',
        !month && 'period-input__container_year-only',
        education && 'period-input__container_year-only-education'
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
            !month && 'period-input__inputs-container_year-only',
            education && 'period-input__inputs-container_year-only-first'
          )}
        >
          {month && (
            <MonthPicker
              name={monthPeriod[0]}
              values={values}
              setValues={setValues}
              disabled={disabled}
              id={i}
              allValues={allValues}
            />
          )}
          <input
            name={year[0]}
            value={values[year[0]] || ''}
            onChange={handleChange}
            type="text"
            placeholder="Год"
            id={i}
            className={classNames(
              'period-input__field form-input__field',
              !month && 'period-input__field_year-only',
              errors[year[0]] && 'form-input__field_error',
              education && 'period-input__field_year-only-education'
            )}
            disabled={disabled}
          />
        </div>
        {errors && (
          <span className="period-input__input-error form-input__input-error">
            {errors[year[0]]}
          </span>
        )}
      </div>

      <div className="period-input form-input">
        <div className="period-input__label-container form-input__label-container">
          <label
            className="period-input__label form-input__label"
            htmlFor="form-input"
          >
            {labelTwo}
          </label>
          {tip && <Tip text={tipText} />}
        </div>
        <div
          className={classNames(
            'period-input__inputs-container',
            !month && 'period-input__inputs-container_year-only',
            education && 'period-input__inputs-container_year-only-education'
          )}
        >
          {month && (
            <MonthPicker
              name={monthPeriod[1]}
              values={values}
              setValues={setValues}
              disabled={disabledMonthChoice || values[namePeriod] === true}
              id={i}
              allValues={allValues}
            />
          )}
          <input
            name={year[1]}
            value={values[year[1]] || ''}
            onChange={handleChange}
            type="text"
            placeholder="Год"
            id={i}
            className={classNames(
              'period-input__field form-input__field',
              !month && 'period-input__field_year-only',
              errors[year[1]] && 'form-input__field_error',
              education && 'period-input__field_year-only-education'
            )}
            disabled={disabled || values[namePeriod] === true}
          />
        </div>
        {errors && (
          <span className="period-input__input-error form-input__input-error">
            {errors[year[1]]}
          </span>
        )}
        {tillPresent && (
          <div className="period-input__checkbox-container">
            <Checkbox
              disabled={disabled}
              name={namePeriod}
              values={values}
              handleCheckboxChange={handleCheckboxChange}
              checkboxText="Настоящее время"
              checkboxId={`period-checkbox_${i}`}
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
  namePeriod: PropTypes.string,
  setValues: PropTypes.func.isRequired,
  monthPeriod: PropTypes.arrayOf(PropTypes.string),
  year: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.bool,
            ])
          ),
        ])
      ),
      PropTypes.objectOf(PropTypes.bool),
    ])
  ),
  handleChange: PropTypes.func,
  allTillPresent: PropTypes.shape({
    value: PropTypes.bool,
  }),
  errors: PropTypes.objectOf(PropTypes.string),
  allValues: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.bool,
            ])
          ),
        ])
      ),
      PropTypes.objectOf(PropTypes.bool),
    ])
  ),
  education: PropTypes.bool,
}

PeriodInput.defaultProps = {
  month: false,
  tip: false,
  tipText: '',
  disabled: false,
  tillPresent: false,
  checkboxValues: {},
  namePeriod: undefined,
  monthPeriod: [],
  year: [],
  values: {},
  handleChange: () => {},
  allTillPresent: {},
  allValues: {},
  errors: {},
  handleCheckboxChange: () => {},
  education: false,
}

export default PeriodInput
