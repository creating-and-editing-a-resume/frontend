import '../PersonalData/PersonalData.scss'
import React from 'react'
import './About.scss'
import PropTypes from 'prop-types'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import FormInput from '../ResumeComponents/FormInput/FormInput'

const About = ({ values, handleChangeWithValidation, setAbout }) => {
  const handleBackToBasicRecommend = () => {
    setAbout(false)
  }
  return (
    <section className="about personal-data">
      <ResumeTitle
        title="Обо мне"
        handleBackToBasicRecommend={handleBackToBasicRecommend}
      />
      <div className="experience__form-container">
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
  handleChangeWithValidation: PropTypes.func,
  setAbout: PropTypes.func,
}

About.defaultProps = {
  values: {},
  handleChangeWithValidation: () => {},
  setAbout: () => {},
}

export default About
