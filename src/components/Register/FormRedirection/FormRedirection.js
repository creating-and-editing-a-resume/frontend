import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './FormRedirection.scss'
import classNames from 'classnames'

const FormRedirection = ({ page, text, button, path, whiteText }) => (
  <div
    className={`form-redirection__container form-redirection__container_${page}`}
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
  whiteText: PropTypes.bool,
}

FormRedirection.defaultProps = {
  text: '',
  whiteText: false,
}

export default FormRedirection
