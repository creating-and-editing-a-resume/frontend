import React from 'react'
import './MonthPicker.scss'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { months } from '../../../../../constants/months'

const MonthPicker = ({ disabled, setValues, values, name }) => {
  const chooseMonth = month => {
    console.log(`${name}:${month.id}`)
    setValues(prevValues => ({ ...prevValues, [name]: month.id }))
  }

  return (
    <div className="month__container">
      <input
        name={name}
        type="text"
        placeholder="Месяц"
        id={name}
        className={classNames(
          'month__input',
          disabled && 'month__input_disabled'
        )}
        value={values[name] ? months.find(m => values[name] === m.id).long : ''}
        readOnly
        disabled={disabled}
      />
      {!disabled && (
        <div className="month__container-list">
          <div className="month__grid-list">
            {months.map(month => {
              const chooseThisMonth = () => {
                chooseMonth(month)
              }
              return (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <span
                  key={month.id}
                  className={classNames(
                    'month__button link',
                    values[name] === month.id && 'month__button_active'
                  )}
                  onClick={chooseThisMonth}
                >
                  {month.short}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

MonthPicker.propTypes = {
  disabled: PropTypes.bool,
  setValues: PropTypes.func,
  values: PropTypes.shape({
    value: PropTypes.number,
  }),
  name: PropTypes.string,
}

MonthPicker.defaultProps = {
  disabled: false,
  setValues: () => {},
  values: {},
  name: '',
}

export default MonthPicker
