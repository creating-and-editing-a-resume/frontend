import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import './Recommendations.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import RecommedationImage from '../../../img/recommendations.png'
import {
  EXPERIENCE_RECOMMENDATIONS,
  EXPERIENCE_DUTIES_RECOMMENDATIONS,
  RESULT_RECOMMENDATIONS,
} from '../../../constants/recommendations'

const Recommendations = ({ duties }) => {
  const location = useLocation()
  const path = location.pathname

  const isPersonalDataPage = () => !!(path === '/resume/personal-data')
  const isExperiencePage = () => !!(path === '/resume/experience')
  const isResultPage = () => !!(path === '/resume/result')

  return (
    <section className="recommend">
      <ResumeTitle title="Рекомендации" />
      {isPersonalDataPage() && (
        <>
          <img
            className="recommend__image"
            alt="девушка и конструктор"
            src={RecommedationImage}
          />
          <p className="recommend__comment">
            Чтобы повысить шансы успешного трудоустройства, предлагаем следовать
            нашим рекомендациям.
          </p>
        </>
      )}
      {isExperiencePage() && !duties && (
        <div className="recommend__container">{EXPERIENCE_RECOMMENDATIONS}</div>
      )}
      {isExperiencePage() && duties && (
        <div className="recommend__container">
          {EXPERIENCE_DUTIES_RECOMMENDATIONS}
        </div>
      )}
      {isResultPage() && (
        <div className="recommend__container">{RESULT_RECOMMENDATIONS}</div>
      )}
    </section>
  )
}

Recommendations.propTypes = {
  duties: PropTypes.bool,
}
Recommendations.defaultProps = {
  duties: false,
}

export default Recommendations
