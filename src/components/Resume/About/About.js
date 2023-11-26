import '../PersonalData/PersonalData.scss'
import React from 'react'
import './About.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import FormInput from '../ResumeComponents/FormInput/FormInput'

const About = () => (
  <section className="personal-data about">
    <ResumeTitle title="Обо мне" />
    <div className="experience__form-container">
      <FormInput extraInputClass="about" />
    </div>
  </section>
)

export default About
