import React from 'react'
import PropTypes from 'prop-types'
import './LinkInput.scss'
import Tip from '../Tip/Tip'

const LinkInput = ({
  firstLabel,
  secondLabel,
  disabled,
  tipFirst,
  tipTextFirst,
  deleteLink,
  addLink,
  i,
  values,
  handleLinkChange,
}) => {
  const handleDelete = () => deleteLink(i)

  const handleChange = evt => {
    const { name, value } = evt.target
    handleLinkChange({ i, name, value })
  }

  return (
    <div className="link-input">
      <div className="link-input__left-box">
        <div className="link-input__label-container">
          <label
            className="link-input__label"
            htmlFor="selected-link-input-first"
          >
            {firstLabel}
          </label>
          {tipFirst && <Tip text={tipTextFirst} />}
        </div>
        <input
          name={`link_name_${i}`}
          // defaultValue=""
          onChange={handleChange}
          value={values.link_name || ''}
          id={`link_name_${i}`}
          className="link-input__short-field"
          disabled={disabled}
        />
      </div>

      <div className="link-input__right-box">
        <div className="double-input__label-container">
          <label
            className="double-input__label"
            htmlFor="selected-input-second"
          >
            {secondLabel}
          </label>
        </div>
        <input
          name={`link_${i}`}
          onChange={handleChange}
          value={values.link || ''}
          className="link-input__short-field"
          disabled={disabled}
        />
      </div>
      <div className="link-input__button-container">
        <button
          className="link-input__button-delete link"
          type="button"
          aria-label="Удалить"
          onClick={handleDelete}
        />
        <button
          className="link-input__button-add link"
          type="button"
          aria-label="Добавить"
          onClick={addLink}
        />
      </div>
    </div>
  )
}
LinkInput.propTypes = {
  firstLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  tipFirst: PropTypes.bool,
  tipTextFirst: PropTypes.node,
  disabled: PropTypes.bool,
  deleteLink: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
  i: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  handleLinkChange: PropTypes.func.isRequired,
  // optionsInputFirst: PropTypes.arrayOf(PropTypes.string),
  // optionsInputSecond: PropTypes.arrayOf(PropTypes.string),
  // i: PropTypes.string.isRequired,
  // addLanguage: PropTypes.func,
  // deleteLanguage: PropTypes.func,
  // handleLanguageChange: PropTypes.func.isRequired,
  // handleLanguageLevelChange: PropTypes.func.isRequired,
  // handleLanguageChange: PropTypes.func.isRequired,
}

LinkInput.defaultProps = {
  firstLabel: '',
  secondLabel: '',
  tipFirst: false,
  tipTextFirst: '',
  disabled: false,
  // optionsInputFirst: [],
  // optionsInputSecond: [],
  // addLanguage: () => {},
  // deleteLanguage: () => {},
}

export default LinkInput
