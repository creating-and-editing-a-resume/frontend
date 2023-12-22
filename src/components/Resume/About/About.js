import '../PersonalData/PersonalData.scss'
import React from 'react'
import './About.scss'
import PropTypes from 'prop-types'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import FormInput from '../ResumeComponents/FormInput/FormInput'

const About = ({ values, handleChangeWithValidation, setMyself }) => (
  <section className="about personal-data">
    <ResumeTitle title="Обо мне" />
    <div className="experience__form-container">
      <FormInput
        name="myself"
        values={values}
        handleChange={handleChangeWithValidation}
        extraInputClass="about"
        setMyself={setMyself}
      />
    </div>
  </section>
)

About.propTypes = {
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.objectOf(
            PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          ),
        ])
      ),
    ])
  ),
  handleChangeWithValidation: PropTypes.func.isRequired,
  setMyself: PropTypes.func.isRequired,
}

About.defaultProps = {
  values: {},
}

export default About
