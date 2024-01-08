import React from 'react'
import PropTypes from 'prop-types'
import './Tip.scss'
import TipIcon from '../../../../img/tip-icon.svg'

// Текст подсказок с нужной разметкой хранится в константах в файле tips.js

const Tip = ({ text }) => (
  <div className="tip__container">
    <img className="tip__icon" src={TipIcon} alt="tip-icon" />
    <div className="tip__text-container">
      <div className="tip__container-triangle" />
      <span className="tip__text">{text}</span>
    </div>
  </div>
)

Tip.propTypes = {
  text: PropTypes.node.isRequired,
}

export default Tip
