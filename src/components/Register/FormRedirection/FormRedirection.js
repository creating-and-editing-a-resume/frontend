import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './FormRedirection.scss'
import classNames from 'classnames'

const FormRedirection = ({ page, text, button, path, isOpen, whiteText }) => (
  <div
    className={`form-redirection__container form-redirection__container_${page} ${
      isOpen && 'form-redirection__container_popup'
    }`}
  >
    {text && (
      <span
        className={classNames(
          'form-redirection__text',
          whiteText && 'form-redirection__text_white'
        )}
      >
        {text}
      </span>
    )}
    <Link
      className={classNames(
        'form-redirection__button link',
        whiteText && 'form-redirection__button_white'
      )}
      to={path}
    >
      {button}
    </Link>
  </div>
)

FormRedirection.propTypes = {
  page: PropTypes.string.isRequired,
  text: PropTypes.string,
  button: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  whiteText: PropTypes.string,
}

FormRedirection.defaultProps = {
  text: '',
  whiteText: 'false',
}

export default FormRedirection
