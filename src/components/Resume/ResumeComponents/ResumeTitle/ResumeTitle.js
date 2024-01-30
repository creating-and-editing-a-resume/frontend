/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
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
  handleBackToBasicRecommend,
}) => (
  <div
    className="resume-title__container"
    onClick={handleBackToBasicRecommend}
    onKeyDown={handleBackToBasicRecommend}
    onFocus={handleBackToBasicRecommend}
  >
    <h2 className="resume-title__text">{title}</h2>
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
  handleBackToBasicRecommend: PropTypes.func,
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
  handleBackToBasicRecommend: () => {},
}

export default ResumeTitle
