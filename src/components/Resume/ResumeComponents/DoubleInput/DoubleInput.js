import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import IMask from 'imask'
import classNames from 'classnames'
import './DoubleInput.scss'
import Tip from '../Tip/Tip'

const DoubleInput = ({
  firstLabel,
  tipFirst,
  tipTextFirst,
  tipSecond,
  tipTextSecond,
  dataMaskFirst,
  doubleLongInput,
  doubleShortInput,
  disabled,
  doubleInput,
  secondLabel,
  placeholderFirst,
  placeholderSecond,
  selectedInputFirst,
  ordinaryInputFirst,
  selectedInputSecond,
  ordinaryInputSecond,
  optionsInputFirst,
  optionsInputSecond,
  values,
  handleChange,
  name,
  errors,
}) => {
  const maskInput = (dataValue, options) => {
    const inputElements = document.querySelectorAll(`[mask="${dataValue}"]`) // ищем поля ввода по селектору с переданным значением data-атрибута
    if (!inputElements) return // если таких полей ввода нет, прерываем функцию
    inputElements.forEach(el => {
      // для каждого из полей ввода
      IMask(el, options) // инициализируем плагин imask для необходимых полей ввода с переданными параметрами маски
    })
  }
  const maskOptionsPhone = {
    mask: '+{7}(000)000-00-00',
  }

  useEffect(() => {
    maskInput('phone', maskOptionsPhone)
  })

  return (
    <div className="double-input">
      {doubleLongInput && (
        <>
          <div className="double-input__left-box">
            <div className="double-input__label-container">
              <label
                className="double-input__label"
                htmlFor="selected-input-first"
              >
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
                    <option
                      value={value}
                      className="double-input__field"
                      key={value}
                    >
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {ordinaryInputFirst && (
              <input
                name={name[0]}
                onChange={handleChange}
                value={values[name[0]] || ''}
                className={classNames(
                  'double-input__field',
                  // name[0] === 'phone' && 'double-input__field_phone',
                  errors[name[0]] && 'double-input__field_error'
                )}
                disabled={disabled}
                placeholder={placeholderFirst}
                mask={dataMaskFirst}
                type="text"
              />
            )}
            {errors && (
              <span className="form-input__input-error">{errors[name[0]]}</span>
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
                      value={values[name[1]] || ''}
                      id={values[name[1]]}
                      className="double-input__field double-input__field_selected"
                    >
                      <option
                        value=""
                        className="double-input__option"
                        disabled
                        hidden
                        aria-label="Выберите нужную опцию"
                      />
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
                  <input
                    name={name[1]}
                    onChange={handleChange}
                    value={values[name[1]] || ''}
                    className={classNames(
                      'double-input__field double-input__field_short',
                      // name[0] === 'phone' && 'double-input__field_telegram',
                      errors[name[1]] && 'double-input__field_error'
                    )}
                    disabled={disabled}
                    placeholder={placeholderSecond}
                  />
                )}
                {errors && (
                  <span className="form-input__input-error">
                    {errors[name[1]]}
                  </span>
                )}
              </>
            )}
          </div>
        </>
      )}
      {doubleShortInput && (
        <>
          <div className="double-input__short-left-box">
            <div className="double-input__label-container">
              <label
                className="double-input__label"
                htmlFor="selected-input-first"
              >
                {firstLabel}
              </label>
            </div>
            <input
              name={name[0]}
              onChange={handleChange}
              value={values[name[0]] || ''}
              className={classNames(
                'double-input__short-field',
                errors[name[0]] && 'double-input__field_error'
              )}
              disabled={disabled}
              placeholder={placeholderFirst}
              mask={dataMaskFirst}
              type="text"
            />
            {errors && (
              <span className="form-input__input-error">{errors[name[0]]}</span>
            )}
          </div>
          <div className="double-input__short-right-box">
            <div className="double-input__label-container">
              <label
                className="double-input__label"
                htmlFor="selected-input-second"
              >
                {secondLabel}
              </label>
            </div>
            <input
              name={name[1]}
              onChange={handleChange}
              value={values[name[1]] || ''}
              className={classNames(
                'double-input__short-field double-input__short-field_long',
                errors[name[1]] && 'double-input__field_error'
              )}
              disabled={disabled}
              placeholder={placeholderSecond}
            />
            {errors && (
              <span className="double-input__input-error form-input__input-error">
                {errors[name[1]]}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  )
}

DoubleInput.propTypes = {
  firstLabel: PropTypes.string.isRequired,
  secondLabel: PropTypes.string,
  tipFirst: PropTypes.bool,
  tipTextFirst: PropTypes.node,
  tipSecond: PropTypes.bool,
  tipTextSecond: PropTypes.node,
  disabled: PropTypes.bool,
  doubleInput: PropTypes.bool,
  placeholderFirst: PropTypes.node,
  placeholderSecond: PropTypes.node,
  selectedInputFirst: PropTypes.bool,
  ordinaryInputFirst: PropTypes.bool,
  selectedInputSecond: PropTypes.bool,
  ordinaryInputSecond: PropTypes.bool,
  optionsInputFirst: PropTypes.arrayOf(PropTypes.string),
  optionsInputSecond: PropTypes.arrayOf(PropTypes.string),
  dataMaskFirst: PropTypes.string,
  errors: PropTypes.objectOf(PropTypes.string),
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
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.arrayOf(PropTypes.string).isRequired,
  doubleShortInput: PropTypes.bool,
  doubleLongInput: PropTypes.bool,
}

DoubleInput.defaultProps = {
  tipFirst: false,
  tipTextFirst: '',
  tipSecond: false,
  tipTextSecond: '',
  disabled: false,
  doubleInput: false,
  placeholderFirst: '',
  placeholderSecond: '',
  secondLabel: '',
  selectedInputFirst: false,
  ordinaryInputFirst: false,
  selectedInputSecond: false,
  ordinaryInputSecond: false,
  optionsInputFirst: [],
  optionsInputSecond: [],
  dataMaskFirst: '',
  errors: {},
  values: {},
  doubleShortInput: false,
  doubleLongInput: false,
}

export default DoubleInput
