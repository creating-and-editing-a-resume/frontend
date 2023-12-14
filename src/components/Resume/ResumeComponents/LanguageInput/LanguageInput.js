import React from 'react'
import PropTypes from 'prop-types'
import './LanguageInput.scss'

const LanguageInput = ({
  firstLabel,
  secondLabel,
  optionsInputFirst,
  optionsInputSecond,
  i,
  addLanguage,
  deleteLanguage,
  values,
  // handleLanguageChange,
  // handleLanguageLevelChange,
  handleLanguageChange,
}) => {
  const handleDelete = () => deleteLanguage(i)
  const handleChange = evt => {
    const { name, value } = evt.target
    handleLanguageChange({ i, name, value })
  }

  return (
    <div className="language-input" id={i} key={i}>
      <div className="language-input__left-box">
        <div className="language-input__label-container">
          <label
            className="language-input__label"
            htmlFor="selected-lang-input-first"
          >
            {firstLabel}
          </label>
        </div>
        <div className="language-input__select-wrapper">
          <select
            name={`language_${i}`}
            onChange={handleChange}
            value={values.language || ''}
            id={`language_${i}`}
            className="language-input__field"
          >
            <option
              value=""
              className="language-input__option double-input__option"
              disabled
              hidden
              aria-label="Выберите язык"
            />
            {optionsInputFirst.map(value => (
              <option
                value={value}
                className="language-input__field"
                key={value}
              >
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="language-input__right-box">
        <div className="language-input__label-container double-input__label-container">
          <label
            className="language-input__label double-input__label"
            htmlFor="selected-input-second"
          >
            {secondLabel}
          </label>
        </div>
        <div className="language-input__select-wrapper">
          <select
            name={`language_level_${i}`}
            onChange={handleChange}
            value={values.level || ''}
            id={`language_level_${i}`}
            className="language-input__field"
          >
            <option
              value=""
              className="language-input__option double-input__option"
              disabled
              hidden
              aria-label="Выберите уровень знания языка"
            />
            {optionsInputSecond.map(value => (
              <option
                value={value}
                className="language-input__option double-input__option"
                key={value}
              >
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="language-input__button-container">
        <button
          className="language-input__button-delete link"
          type="button"
          aria-label="Удалить"
          onClick={handleDelete}
        />
        <button
          className="language-input__button-add link"
          type="button"
          aria-label="Добавить"
          onClick={addLanguage}
        />
      </div>
    </div>
  )
}
LanguageInput.propTypes = {
  firstLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  optionsInputFirst: PropTypes.arrayOf(PropTypes.string),
  optionsInputSecond: PropTypes.arrayOf(PropTypes.string),
  i: PropTypes.string.isRequired,
  addLanguage: PropTypes.func.isRequired,
  deleteLanguage: PropTypes.func.isRequired,
  // handleLanguageChange: PropTypes.func.isRequired,
  // handleLanguageLevelChange: PropTypes.func.isRequired,
  handleLanguageChange: PropTypes.func.isRequired,
  values: PropTypes.objectOf(PropTypes.string),
}

LanguageInput.defaultProps = {
  firstLabel: '',
  secondLabel: '',
  optionsInputFirst: [],
  optionsInputSecond: [],
  values: {},
}

export default LanguageInput
