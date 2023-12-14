import './ConfirmationDelete.scss'
import PropTypes from 'prop-types'
import TrashIcon from '../../../../img/popups/trash-icon-red.svg'

function ConfirmationDelete({ onClose }) {
  const resumeNumber = 1 // эту переменную надо привязать в конкретным резюме

  return (
    <div className="confirmation-delete">
      <p className="confirmation-delete__text">
        {`Вы действительно хотите удалить резюме ${resumeNumber} без возможности восстановления?`}
      </p>
      <div className="confirmation-delete__buttons">
        <button
          className="confirmation-delete__button confirmation-delete__button_delete"
          type="button"
          label="button"
          onClick={() => {
            onClose()
          }}
        >
          <img src={TrashIcon} alt="trash-icon" />
          Удалить
        </button>

        <button
          className="confirmation-delete__button confirmation-delete__button_cancel"
          type="button"
          label="button"
          onClick={() => {
            onClose()
          }}
        >
          Отменить
        </button>
      </div>
    </div>
  )
}

ConfirmationDelete.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default ConfirmationDelete
