import React from 'react'
import PropTypes from 'prop-types'
import IMask from 'imask'
import classNames from 'classnames'
import './FormInput.scss'
import { useLocation } from 'react-router-dom'
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
  setDuties,
  setQualifications,
  setPortfolio,
  setAbout,
  errors,
  id,
  placeholder,
  setValues,
}) => {
  const location = useLocation()
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

  const handleFocus = () => {
    setDuties(true)
    setQualifications(true)
    setAbout(true)
    setPortfolio(true)
  }

  React.useEffect(() => {
    if (disabled === true && location.pathname === '/resume/experience') {
      setValues(prevValues => ({
        ...prevValues,
        company: '',
        company_website: '',
        current_position: '',
        duties: '',
      }))
    }

    if (disabled === true && location.pathname === '/resume/qualification') {
      setValues(prevValues => ({
        ...prevValues,
        organization: '',
        course_name: '',
        work_specialization: '',
        description_experience: '',
        skills: '',
        diploma_link: '',
      }))
    }

    if (disabled === true && location.pathname === '/resume/education') {
      setValues(prevValues => ({
        ...prevValues,
        university_name: '',
        university_specialization: '',
        education_level: '',
      }))
    }

    if (disabled === true && location.pathname === '/resume/portfolio') {
      setValues(prevValues => ({
        ...prevValues,
        project_name: '',
        project_description: '',
        project_link: '',
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled])

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
        disabled={disabled === true}
        placeholder={placeholder}
        id={id}
        className={classNames(
          'form-input__field',
          extraInputClass && `form-input__field_${extraInputClass}`,
          errors[name] && 'form-input__field_error'
        )}
        onFocus={handleFocus}
        mask={dataMask}
      />
      {errors && (
        <span className="form-input__input-error">{errors[name]}</span>
      )}
    </div>
  )
}
FormInput.propTypes = {
  label: PropTypes.string,
  tip: PropTypes.bool,
  tipText: PropTypes.node,
  placeholder: PropTypes.node,
  extraInputClass: PropTypes.string,
  disabled: PropTypes.bool,
  values: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func.isRequired,
  dataMask: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  setDuties: PropTypes.func,
  setPortfolio: PropTypes.func,
  setAbout: PropTypes.func,
  setQualifications: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string,
  setValues: PropTypes.func,
}

FormInput.defaultProps = {
  tip: false,
  tipText: '',
  placeholder: '',
  extraInputClass: '',
  disabled: false,
  values: {},
  dataMask: '',
  setDuties: () => {},
  errors: {},
  id: '',
  setQualifications: () => {},
  setPortfolio: () => {},
  setAbout: () => {},
  label: undefined,
  setValues: () => {},
}

export default FormInput
