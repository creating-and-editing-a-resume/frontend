import React from 'react'
import PropTypes from 'prop-types'
import './FormTitle.scss'

const FormTitle = ({ page, greeting }) => (
  <div className={`form-title__container form-title__container_${page}`}>
    <h1 className="form-title__greeting">{greeting}</h1>
  </div>
)

FormTitle.propTypes = {
  page: PropTypes.string.isRequired,
  greeting: PropTypes.string.isRequired,
}

export default FormTitle
