import './Result.scss'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import linkIcon from '../../../img/linkImage.svg'
import DownloadIcon from '../../../img/download-icon.svg'
import ResultResume from '../ResultResume/ResultResume'
import { handleGeneratePdf, copyToClipboard } from '../../Utils/Utils'
import PopupCopyLink from '../../Popups/PopupCopyLink/PopupCopyLink'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'

function Result({ values, setIsTempResume }) {
  const [popupCopyLink, setPopupCopyLink] = React.useState(false)
  const [popupCopyLinkText, setPopupCopyLinkText] = React.useState('')
  const navigate = useNavigate()
  const resumePath = `/resume/result/${values.id}`

  return (
    <section className="result">
      <div className="result__header">
        <ResumeTitle title="Готовое резюме" />
        <div className="result__buttons-container">
          <button
            className="result__button"
            type="button"
            label="button"
            onClick={() => {
              // navigate(`${resumePath}`)
              setIsTempResume(true)
              copyToClipboard(
                resumePath,
                setPopupCopyLink,
                setPopupCopyLinkText
              )
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
            className="result__button result__button_right"
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
      <PopupCopyLink popupCopyLink={popupCopyLink} text={popupCopyLinkText} />
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
      PropTypes.objectOf(PropTypes.bool),
    ])
  ),
}

Result.defaultProps = { values: {}, setIsTempResume: () => {} }

export default Result
