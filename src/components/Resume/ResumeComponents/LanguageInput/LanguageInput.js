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
}) => {
  const handleDelete = () => deleteLanguage(i)
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
            id="selected-lang-input-first"
            className="language-input__field"
          >
            {optionsInputFirst.map(value => (
              <option
                value={value || ''}
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
        <div className="double-input__label-container">
          <label
            className="double-input__label"
            htmlFor="selected-input-second"
          >
            {secondLabel}
          </label>
        </div>
        <div className="language-input__select-wrapper">
          <select
            id="selected-lang-input-second"
            className="language-input__field"
          >
            {optionsInputSecond.map(value => (
              <option
                value={value || ''}
                className="double-input__option"
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
          className="language-input__button-delete"
          type="button"
          aria-label="Удалить"
          onClick={handleDelete}
        />
        <button
          className="language-input__button-add"
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
  addLanguage: PropTypes.func,
  deleteLanguage: PropTypes.func,
}

LanguageInput.defaultProps = {
  firstLabel: '',
  secondLabel: '',
  optionsInputFirst: [],
  optionsInputSecond: [],
  addLanguage: () => {},
  deleteLanguage: () => {},
}

export default LanguageInput
