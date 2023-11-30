import React from 'react'
import PropTypes from 'prop-types'
import './ResumeTitle.scss'
import Toggle from './Toggle/Toggle'

const ResumeTitle = ({
  title,
  checkbox,
  checkboxText,
  checkboxId,
  onClick,
  name,
  values,
  handleCheckboxChange,
}) => (
  <div className="resume-title__container">
    <h1 className="resume-title__text">{title}</h1>
    {checkbox && (
      <Toggle
        name={name}
        values={values}
        handleCheckboxChange={handleCheckboxChange}
        checkboxText={checkboxText}
        checkboxId={checkboxId}
        onClick={onClick}
      />
    )}
  </div>
)
ResumeTitle.propTypes = {
  title: PropTypes.node.isRequired,
  checkbox: PropTypes.bool,
  checkboxText: PropTypes.string,
  checkboxId: PropTypes.string,
  onClick: PropTypes.func,
  handleCheckboxChange: PropTypes.func,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  name: PropTypes.string,
  values: PropTypes.shape({
    value: PropTypes.bool,
  }),
}

ResumeTitle.defaultProps = {
  checkbox: false,
  checkboxText: '',
  checkboxId: '',
  onClick: () => {},
  handleCheckboxChange: () => {},
  checkboxValues: {},
  name: '',
  values: {},
}

export default ResumeTitle
