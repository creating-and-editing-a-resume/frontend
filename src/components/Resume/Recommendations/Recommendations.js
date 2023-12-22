import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import './Recommendations.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
// import RecommedationImage from '../../../img/recommendations.png'
import AboutImg from '../../../img/recomendation-about.png'
import {
  EXPERIENCE_RECOMMENDATIONS,
  EXPERIENCE_DUTIES_RECOMMENDATIONS,
  RESULT_RECOMMENDATIONS,
  ABOUT_RECOMMENDATIONS,
  ABOUT_MYSELF_RECOMMENDATIONS,
  SKILLS_RECOMMENDATIONS,
  SKILLS_ABILITY_RECOMMENDATIONS,
  PORTFOLIO_RECOMMENDATIONS,
  PORTFOLIO_PROJECTDESCRIPTION_RECOMMENDATIONS,
  QUALIFICATION_RECOMMENDATIONS,
  EDUCATION_RECOMMENDATIONS,
} from '../../../constants/recommendations'
// import Skills from '../Skills/Skills'

const Recommendations = ({ duties, ability, projecDescription, myself }) => {
  const location = useLocation()
  const path = location.pathname

  const isPersonalDataPage = () => !!(path === '/resume/personal-data')
  const isExperiencePage = () => !!(path === '/resume/experience')
  const isResultPage = () => !!(path === '/resume/result')
  const isAboutPage = () => !!(path === '/resume/about')
  const isSkillsPage = () => !!(path === '/resume/skills')
  const isPortfolioPage = () => !!(path === '/resume/portfolio')
  const isQualificationPage = () => !!(path === '/resume/qualification')
  const isEducationPage = () => !!(path === '/resume/education')

  return (
    <section className="recommend">
      <ResumeTitle title="Рекомендации" />
      {isPersonalDataPage() && (
        <>
          {/* <img
            className="recommend__image"
            alt="девушка и конструктор"
            src={RecommedationImage}
          /> */}
          <img
            className="recommend__image-about"
            alt="мужчина и монитор с резюме"
            src={AboutImg}
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
      {isPortfolioPage() && !projecDescription && (
        <>
          <img
            className="recommend__image-about"
            alt="мужчина и монитор с резюме"
            src={AboutImg}
          />
          <div className="recommend__container">
            {PORTFOLIO_RECOMMENDATIONS}
          </div>
        </>
      )}
      {isPortfolioPage() && projecDescription && (
        <div className="recommend__container">
          {PORTFOLIO_PROJECTDESCRIPTION_RECOMMENDATIONS}
        </div>
      )}
      {isAboutPage() && !myself && (
        <>
          <img
            className="recommend__image-about"
            alt="мужчина и монитор с резюме"
            src={AboutImg}
          />
          <div className="recommend__container">{ABOUT_RECOMMENDATIONS}</div>
        </>
      )}
      {isAboutPage() && myself && (
        <div className="recommend__container">
          {ABOUT_MYSELF_RECOMMENDATIONS}
        </div>
      )}
      {isSkillsPage() && !ability && (
        <>
          <img
            className="recommend__image-about"
            alt="мужчина и монитор с резюме"
            src={AboutImg}
          />
          <div className="recommend__container">{SKILLS_RECOMMENDATIONS}</div>
        </>
      )}
      {isSkillsPage() && ability && (
        <div className="recommend__container">
          {SKILLS_ABILITY_RECOMMENDATIONS}
        </div>
      )}
      {isQualificationPage() && (
        <>
          <img
            className="recommend__image-about"
            alt="мужчина и монитор с резюме"
            src={AboutImg}
          />
          <div className="recommend__container">
            {QUALIFICATION_RECOMMENDATIONS}
          </div>
        </>
      )}
      {isEducationPage() && (
        <>
          <img
            className="recommend__image-about"
            alt="мужчина и монитор с резюме"
            src={AboutImg}
          />
          <div className="recommend__container">
            {EDUCATION_RECOMMENDATIONS}
          </div>
        </>
      )}
    </section>
  )
}
Recommendations.propTypes = {
  duties: PropTypes.bool,
  ability: PropTypes.bool,
  projecDescription: PropTypes.bool,
  myself: PropTypes.bool,
}
Recommendations.defaultProps = {
  duties: false,
  ability: false,
  projecDescription: false,
  myself: false,
}

export default Recommendations
