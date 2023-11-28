import React from 'react'
import PropTypes from 'prop-types'
import './ResumeTitle.scss'
import Checkbox from '../Checkbox/Checkbox'

const ResumeTitle = ({
  title,
  checkbox,
  checkboxText,
  checkboxId,
  onClick,
  name,
  checkboxValues,
  handleCheckboxChange,
}) => (
  <div className="resume-title__container">
    <h1 className="resume-title__text">{title}</h1>
    {checkbox && (
      <Checkbox
        name={name}
        checkboxValues={checkboxValues}
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
}

ResumeTitle.defaultProps = {
  checkbox: false,
  checkboxText: '',
  checkboxId: '',
  onClick: () => {},
  handleCheckboxChange: () => {},
  checkboxValues: {},
  name: '',
}

export default ResumeTitle
