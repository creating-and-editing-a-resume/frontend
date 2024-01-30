import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './AddButton.scss'
import PlusIcon from '../../../../img/plus-icon.svg'

const AddButton = ({ disabled, handleClick }) => (
  <button
    className={classNames(
      'add-button',
      disabled ? 'add-button_inactive' : 'link'
    )}
    type="button"
    disabled={disabled}
    onClick={handleClick}
  >
    <img
      alt="плюс"
      src={PlusIcon}
      className={classNames(
        disabled ? 'add-button__plus-icon_disabled' : 'add-button__plus-icon'
      )}
    />
    Добавить
  </button>
)

AddButton.propTypes = {
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
}

AddButton.defaultProps = {
  handleClick: () => {},
  disabled: false,
}

export default AddButton
