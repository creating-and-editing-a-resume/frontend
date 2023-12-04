import React from 'react'
import PropTypes from 'prop-types'
import IMask from 'imask'
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
  dataMask,
  setValues,
  setDuties,
  errors,
  id,
  placeholder,
}) => {
  const maskInput = (dataValue, options) => {
    const inputElements = document.querySelectorAll(`[mask="${dataValue}"]`) // ищем поля ввода по селектору с переданным значением data-атрибута
    if (!inputElements) return // если таких полей ввода нет, прерываем функцию
    inputElements.forEach(el => {
      // для каждого из полей ввода
      IMask(el, options) // инициализируем плагин imask для необходимых полей ввода с переданными параметрами маски
    })
  }
  const maskOptionsDate = {
    mask: Date,
    min: new Date(1900, 0, 1),
  }
  React.useEffect(() => {
    maskInput('date', maskOptionsDate)
  })

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
        value={values[name]}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        id={id}
        className={classNames(
          'form-input__field',
          extraInputClass && `form-input__field_${extraInputClass}`,
          errors[name] && 'form-input__field_error'
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        mask={dataMask}
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
  placeholder: PropTypes.node,
  extraInputClass: PropTypes.string,
  disabled: PropTypes.bool,
  values: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func,
  dataMask: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  setValues: PropTypes.func,
  setDuties: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string,
}

FormInput.defaultProps = {
  tip: false,
  tipText: '',
  placeholder: '',
  extraInputClass: '',
  disabled: false,
  values: {},
  handleChange: () => {},
  dataMask: '',
  name: [],
  setValues: () => {},
  setDuties: () => {},
  errors: {},
  id: '',
}

export default FormInput
