import './Result.scss'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import linkIcon from '../../../img/linkImage.svg'
import DownloadIcon from '../../../img/download-icon.svg'
import ResultResume from '../ResultResume/ResultResume'
import { handleGeneratePdf } from '../../Utils/Utils'
import PopupCopyLink from '../../Popups/PopupCopyLink/PopupCopyLink'

function Result({ values, setIsTempResume }) {
  const [popupCopyLink, setPopupCopyLink] = React.useState(false)
  const navigate = useNavigate()
  const resumePath = `/resume/result/${values.id}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000${resumePath}`)
    // TODO после соединения с сервером заменить указанный выше код на закомментированный
    // navigator.clipboard.writeText(
    //   `http://dev.acceleratorpracticum.ru${resumePath}`
    // )
    setPopupCopyLink(true)
    setTimeout(() => {
      setPopupCopyLink(false)
    }, 2500)
  }

  return (
    <section className="result">
      <div className="result__header">
        <h1 className="result__title">Готовое резюме</h1>
        <div className="result__buttons-container">
          <button
            className="result__button"
            type="button"
            label="button"
            onClick={() => {
              setIsTempResume(true)
              copyToClipboard()
            }}
          >
            <img
              className="result__button-icon"
              alt="стрелка вниз"
              src={linkIcon}
            />
            Скопировать ссылку
          </button>
          <button
            className="result__button"
            type="button"
            label="button"
            onClick={() => {
              setIsTempResume(true)
              handleGeneratePdf(navigate, resumePath)
            }}
          >
            <img
              className="result__button-icon"
              alt="стрелка вниз"
              src={DownloadIcon}
            />
            PDF
          </button>
        </div>
      </div>
      <div className="result__content">
        <ResultResume values={values} />
      </div>
      <PopupCopyLink popupCopyLink={popupCopyLink} />
    </section>
  )
}

Result.propTypes = {
  setIsTempResume: PropTypes.func,
  values: PropTypes.objectOf(
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
  ),
}

Result.defaultProps = { values: {}, setIsTempResume: () => {} }

export default Result
