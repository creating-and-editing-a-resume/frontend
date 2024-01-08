import classNames from 'classnames'
import PropTypes from 'prop-types'
import './PopupCopyLink.scss'

function PopupCopyLink({ popupCopyLink }) {
  return (
    <div
      className={classNames(
        'popup-copy-link',
        popupCopyLink && 'popup-copy-link_opened'
      )}
    >
      <p className="popup-copy-link__text">Ссылка скопирована</p>
    </div>
  )
}

PopupCopyLink.propTypes = {
  popupCopyLink: PropTypes.bool.isRequired,
}

export default PopupCopyLink
