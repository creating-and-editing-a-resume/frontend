import '../PersonalData/PersonalData.scss'
import React from 'react'
import './About.scss'
import PropTypes from 'prop-types'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import { CurrentValuesContext } from '../../../contexts/ValuesContext'

const About = ({ handleChangeWithValidation, setAbout }) => {
  const values = React.useContext(CurrentValuesContext)
  const handleBackToBasicRecommend = () => {
    setAbout(false)
  }
  return (
    <section className="about">
      <ResumeTitle
        title="Обо мне"
        handleBackToBasicRecommend={handleBackToBasicRecommend}
      />
      <div className="about-me__form-container">
        <FormInput
          name="about"
          values={values}
          handleChange={handleChangeWithValidation}
          extraInputClass="about"
          setAbout={setAbout}
        />
      </div>
    </section>
  )
}

About.propTypes = {
  handleChangeWithValidation: PropTypes.func,
  setAbout: PropTypes.func,
}

About.defaultProps = {
  handleChangeWithValidation: () => {},
  setAbout: () => {},
}

export default About
