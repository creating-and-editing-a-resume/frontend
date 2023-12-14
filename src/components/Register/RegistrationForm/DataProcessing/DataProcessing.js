import React from 'react'
import PropTypes from 'prop-types'
import './DataProcessing.scss'

const DataProcessing = ({ handleChange }) => (
  <div className="data-processing">
    <label className="data-processing__checkbox-label" htmlFor="dataProcessing">
      <input
        name="dataProcessing"
        type="checkbox"
        id="dataProcessing"
        className="data-processing__checkbox"
        onClick={handleChange}
        required
      />
      <span className="data-processing__checkbox-text">
        Я даю согласие на обработку данных
      </span>
    </label>
  </div>
)

DataProcessing.propTypes = {
  handleChange: PropTypes.func.isRequired,
}

export default DataProcessing
