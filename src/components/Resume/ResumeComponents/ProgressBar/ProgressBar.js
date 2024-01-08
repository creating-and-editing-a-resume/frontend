/* eslint-disable prettier/prettier */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import './ProgressBar.scss'

const ProgressBar = ({ step, totalSteps }) => (
  <div className="progress-bar">
    {[...Array(totalSteps)].map((_, index) => {
      const stepClass =
        index < step - 1
          ? 'completed'
          : index === step - 1
          ? 'active'
          : 'future'

      return (
        <div
          key={index}
          className={`progress-bar_step ${stepClass}`}
          style={{ width: `${100 / totalSteps}%` }}
        />
      )
    })}
  </div>
)

ProgressBar.propTypes = {
  step: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
}

export default ProgressBar
