import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import './Experience.scss'
import PropTypes from 'prop-types'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../ResumeComponents/PeriodInput/PeriodInput'
import Job from './Job/Job'
import { JOB_TIP } from '../../../constants/tips'

const Experience = ({
  values,
  setValues,
  handleChange,
  handleCheckboxChange,
  checkboxValues,
  hasExperience,
  setHasExperience,
  setAllTillPresent,
  allTillPresent,
  setCheckboxValues,
  setDuties,
  errors,
  handleChangeWithValidation,
  setErrors,
}) => {
  // Если появился добавленный опыт, основная кнопка "Добавить" удаляется
  const [noAddedExperience, setNoAddedExperience] = useState(true)
  const [addedExperience, setAddedExperience] = React.useState([])
  const [number, setNumber] = useState(0)

  const handleTitleCheckboxClick = () => {
    setHasExperience(!hasExperience)
    setAddedExperience([])
    setNoAddedExperience(true)
    setErrors({})
  }

  const addExperience = () => {
    setNoAddedExperience(false)
    setAddedExperience([...addedExperience, { id: number + 1 }])
    setNumber(prevValue => prevValue + 1)
  }

  const deleteExperience = jobId => {
    setNumber(prevValue => prevValue - 1)
    const experienceToBeRemoved = addedExperience.find(m => jobId === m.id)
    setAddedExperience(
      addedExperience.filter(item => item.id !== experienceToBeRemoved.id)
    )
  }

  // Если addedExperience пустой, то возвращается основная кнопка "Добавить"
  useEffect(() => {
    if (addedExperience.length === 0) {
      setNoAddedExperience(true)
    }
  }, [addedExperience.length])

  return (
    <section className="personal-data">
      <ResumeTitle
        name="work_experience_checkbox"
        values={checkboxValues}
        handleCheckboxChange={handleCheckboxChange}
        title="Опыт работы"
        checkbox
        checkboxText="Нет опыта"
        checkboxId="title-checkbox"
        onClick={handleTitleCheckboxClick}
      />
      <div className="experience__form-container">
        <FormInput
          name="company"
          values={values}
          handleChange={handleChangeWithValidation}
          label="Название компании"
          disabled={!hasExperience}
          setValues={setValues}
          errors={errors}
        />
        <FormInput
          name="company_website"
          values={values}
          handleChange={handleChangeWithValidation}
          label="Сайт компании"
          disabled={!hasExperience}
          setValues={setValues}
          errors={errors}
        />
        <FormInput
          name="current_position"
          values={values}
          handleChange={handleChangeWithValidation}
          label="Должность"
          tip
          tipText={JOB_TIP}
          disabled={!hasExperience}
          setValues={setValues}
          errors={errors}
        />
        <PeriodInput
          labelOne="Дата начала работы"
          labelTwo="Дата окончания работы"
          month
          disabled={!hasExperience}
          i={Number('0')}
          tillPresent
          checkboxValues={checkboxValues}
          handleCheckboxChange={handleCheckboxChange}
          namePeriod="work_period_checkbox"
          monthPeriod={['month_work_start', 'month_work_end']}
          year={['year_work_start', 'year_work_end']}
          values={values}
          setValues={setValues}
          setAllTillPresent={setAllTillPresent}
          allTillPresent={allTillPresent}
          handleChange={handleChange}
          setCheckboxValues={setCheckboxValues}
        />
        <FormInput
          name="duties"
          values={values}
          handleChange={handleChangeWithValidation}
          label="Обязанности"
          extraInputClass="responsibilities"
          disabled={!hasExperience}
          setValues={setValues}
          setDuties={setDuties}
          errors={errors}
        />
        {addedExperience.map(experience => (
          <Job
            values={values}
            handleChange={handleChange}
            hasExperience={hasExperience}
            deleteExperience={deleteExperience}
            addExperience={addExperience}
            i={Number(experience.id)}
            key={experience.id}
            checkboxValues={checkboxValues}
            number={number}
            handleCheckboxChange={handleCheckboxChange}
            setValues={setValues}
            setAllTillPresent={setAllTillPresent}
            allTillPresent={allTillPresent}
            setCheckboxValues={setCheckboxValues}
            setDuties={setDuties}
          />
        ))}
        {noAddedExperience && (
          <AddButton disabled={!hasExperience} handleClick={addExperience} />
        )}
      </div>
    </section>
  )
}

Experience.propTypes = {
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  setValues: PropTypes.func,
  handleChange: PropTypes.func,
  handleCheckboxChange: PropTypes.func,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  hasExperience: PropTypes.bool.isRequired,
  setHasExperience: PropTypes.func,
  setAllTillPresent: PropTypes.func,
  allTillPresent: PropTypes.shape({
    value: PropTypes.bool,
  }),
  setCheckboxValues: PropTypes.func,
  setDuties: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  handleChangeWithValidation: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
}

Experience.defaultProps = {
  values: {},
  setValues: () => {},
  handleChange: () => {},
  handleCheckboxChange: () => {},
  checkboxValues: {},
  setHasExperience: () => {},
  setAllTillPresent: () => {},
  allTillPresent: {},
  setCheckboxValues: () => {},
}

export default Experience
