import React from 'react'
import { useLocation } from 'react-router-dom'
import './Recommendations.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import RecommedationImage from '../../../img/recommendations.png'
import {
  EXPERIENCE_RECOMMENDATIONS,
  RESULT_RECOMMENDATIONS,
} from '../../../constants/recommendations'

const Recommendations = () => {
  const location = useLocation()
  const path = location.pathname

  const isPersonalDataPage = () => !!(path === '/resume/personal-data')
  const isExperiencePage = () => !!(path === '/resume/experience')
  const isResultPage = () => !!(path === '/resume/result')

  return (
    <section className="recommend">
      <ResumeTitle title="Рекоммендации" />
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
      {isExperiencePage() && (
        <div className="recommend__container">{EXPERIENCE_RECOMMENDATIONS}</div>
      )}
      {isResultPage() && (
        <div className="recommend__container">{RESULT_RECOMMENDATIONS}</div>
      )}
    </section>
  )
}

export default Recommendations
