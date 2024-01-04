import './ConfirmationDelete.scss'
// import { useNavigate } from 'react-router'
import PropTypes from 'prop-types'
import TrashIcon from '../../../../img/popups/trash-icon-red.svg'
import CloseIcon from '../../../../img/popups/close-icon-black.svg'

function ConfirmationDelete({
  onClose,
  arrValues,
  setArrValues,
  // eslint-disable-next-line no-unused-vars
  currentResume,
  setCurrentResume,
}) {
  const currentResumeName = currentResume
    ? arrValues.find(item => item.id === currentResume.id)
    : ''

  const handleDeleteResume = () => {
    setArrValues(arrValues.filter(item => item.id !== currentResumeName?.id))
    setCurrentResume({})
  }

  return (
    <div className="confirmation-delete">
      <p className="confirmation-delete__text">
        {`Вы действительно хотите удалить резюме ${currentResumeName?.resume_name} без возможности восстановления?`}
      </p>
      <div className="confirmation-delete__buttons">
        <button
          className="confirmation-delete__button confirmation-delete__button_delete"
          type="button"
          label="button"
          onClick={() => {
            handleDeleteResume()
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
      <button
        type="button"
        onClick={onClose}
        className="confirmation-delete__close-button link"
      >
        <img
          src={CloseIcon}
          alt="крестик"
          className="confirmation-delete__close-button-icon"
        />
      </button>
    </div>
  )
}

ConfirmationDelete.propTypes = {
  arrValues: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.objectOf(
              PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.bool,
              ])
            ),
          ])
        ),
      ])
    )
  ),
  setArrValues: PropTypes.func,
  currentResume: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.bool,
            ])
          ),
        ])
      ),
    ])
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func,
}

ConfirmationDelete.defaultProps = {
  arrValues: [],
  setArrValues: () => {},
  setCurrentResume: () => {},
}

export default ConfirmationDelete
