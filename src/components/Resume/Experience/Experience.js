/* eslint-disable jsx-a11y/no-static-element-interactions */
import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './Experience.scss'
import PropTypes from 'prop-types'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../ResumeComponents/PeriodInput/PeriodInput'
import Job from './Job/Job'
import { JOB_TIP } from '../../../constants/tips'
import { CurrentValuesContext } from '../../../contexts/ValuesContext'

const Experience = ({
  setValues,
  handleCheckboxChange,
  setDuties,
  errors,
  handleChangeWithValidation,
  setErrors,
  handleAddJobChange,
  handleAddJobCheckboxChange,
}) => {
  // Если появился добавленный опыт, основная кнопка "Добавить" удаляется
  const [noAddedExperience, setNoAddedExperience] = useState(true)
  const values = React.useContext(CurrentValuesContext)

  const handleTitleCheckboxClick = () => {
    setValues(prevValues => ({
      ...prevValues,
      jobs: [],
      work_experience_checkbox: !prevValues.work_experience_checkbox,
    }))
    setNoAddedExperience(true)
    setErrors({})
  }

  useEffect(() => {
    if (values.work_experience_checkbox === true) {
      setValues(prevValues => ({
        ...prevValues,
        work_period_experience_checkbox: false,
      }))
    }
  }, [values.work_experience_checkbox])

  const addExperience = () => {
    setNoAddedExperience(false)
    setValues(prevValues => ({
      ...prevValues,
      jobs: [
        ...prevValues.jobs,
        { id: uuidv4(), work_period_experience_checkbox: false },
      ],
    }))
  }

  const deleteExperience = jobId => {
    const experienceToBeRemoved = values.jobs.find(m => jobId === m.id)
    setValues(prevValues => ({
      ...prevValues,
      jobs: prevValues.jobs.filter(
        item => item.id !== experienceToBeRemoved.id
      ),
    }))
  }

  // Если addedExperience пустой, то возвращается основная кнопка "Добавить"
  useEffect(() => {
    if (values.jobs?.length === 0) {
      setNoAddedExperience(true)
    }
  }, [values.jobs])

  const handleBackToBasicRecommend = () => {
    setDuties(false)
  }

  return (
    <section className="experience">
      <ResumeTitle
        name="work_experience_checkbox"
        values={values}
        handleCheckboxChange={handleCheckboxChange}
        title="Опыт работы"
        checkbox
        checkboxText="Нет опыта"
        checkboxId="title-experience-checkbox"
        onClick={handleTitleCheckboxClick}
        handleBackToBasicRecommend={handleBackToBasicRecommend}
      />
      <div className="experience__form-container">
        <div
          className="experience__basic-recommend"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            name="company"
            values={values}
            handleChange={handleChangeWithValidation}
            label="Название компании"
            disabled={values.work_experience_checkbox}
            errors={errors}
            id="0"
            setValues={setValues}
          />
          <FormInput
            name="company_website"
            values={values}
            handleChange={handleChangeWithValidation}
            label="Сайт компании"
            disabled={values.work_experience_checkbox}
            errors={errors}
            id="0"
            setValues={setValues}
          />
          <FormInput
            name="current_position"
            values={values}
            handleChange={handleChangeWithValidation}
            label="Должность"
            tip
            tipText={JOB_TIP}
            disabled={values.work_experience_checkbox}
            errors={errors}
            id="0"
            setValues={setValues}
          />
          <PeriodInput
            labelOne="Дата начала работы"
            labelTwo="Дата окончания работы"
            month
            disabled={values.work_experience_checkbox}
            i="0"
            tillPresent
            handleCheckboxChange={handleCheckboxChange}
            namePeriod="work_period_experience_checkbox"
            monthPeriod={['month_work_start', 'month_work_end']}
            year={['year_work_start', 'year_work_end']}
            values={values}
            handleChange={handleChangeWithValidation}
            errors={errors}
            allValues={values}
            setValues={setValues}
          />
        </div>
        <FormInput
          name="duties"
          values={values}
          handleChange={handleChangeWithValidation}
          label="Обязанности"
          extraInputClass="responsibilities"
          disabled={values.work_experience_checkbox}
          setValues={setValues}
          setDuties={setDuties}
          errors={errors}
          id="0"
        />
        {values.jobs.map(experience => (
          <Job
            values={experience}
            allValues={values}
            handleChange={handleAddJobChange}
            disabled={values.work_experience_checkbox}
            deleteExperience={deleteExperience}
            addExperience={addExperience}
            i={experience.id}
            key={experience.id}
            handleCheckboxChange={handleAddJobCheckboxChange}
            setValues={setValues}
            setDuties={setDuties}
            handleBackToBasicRecommend={handleBackToBasicRecommend}
          />
        ))}
        {noAddedExperience && values.jobs?.length === 0 && (
          <AddButton
            disabled={values.work_experience_checkbox}
            handleClick={addExperience}
          />
        )}
      </div>
    </section>
  )
}

Experience.propTypes = {
  setValues: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  allTillPresent: PropTypes.shape({
    value: PropTypes.bool,
  }),
  setDuties: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  handleChangeWithValidation: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  handleAddJobChange: PropTypes.func.isRequired,
  handleAddJobCheckboxChange: PropTypes.func.isRequired,
}

Experience.defaultProps = {
  checkboxValues: {},
  allTillPresent: {},
}

export default Experience
