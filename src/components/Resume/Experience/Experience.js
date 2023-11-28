/* eslint-disable react/prop-types */
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

const Experience = ({
  values,
  handleChange,
  handleCheckboxChange,
  checkboxValues,
  hasExperience,
  setHasExperience,
  isTillPresent,
  setIsTillPresent,
  chosenMonth,
  setChosenMonth,
}) => {
  // Если появился добавленный опыт, основная кнопка "Добавить" удаляется
  const [noAddedExperience, setNoAddedExperience] = useState(true)
  const [addedExperience, setAddedExperience] = React.useState([])
  const [number, setNumber] = useState(0)

  const handleTitleCheckboxClick = () => {
    setHasExperience(!hasExperience)
    setAddedExperience([])
    setNoAddedExperience(true)
  }

  const addExperience = () => {
    setNoAddedExperience(false)
    setAddedExperience([...addedExperience, { id: uuidv4() }])
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
        name="work_experience"
        checkboxValues={checkboxValues}
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
          handleChange={handleChange}
          label="Название компании"
          disabled={!hasExperience}
        />
        <FormInput
          name="company_website"
          values={values}
          handleChange={handleChange}
          label="Сайт компании"
          disabled={!hasExperience}
        />
        <FormInput
          name="current_position"
          values={values}
          handleChange={handleChange}
          label="Должность"
          tip
          tipText={JOB_TIP}
          disabled={!hasExperience}
        />
        <PeriodInput
          labelOne="Дата начала работы"
          labelTwo="Дата окончания работы"
          month
          disabled={!hasExperience}
          i="0"
          tillPresent
          checkboxValues={checkboxValues}
          handleCheckboxChange={handleCheckboxChange}
          isTillPresent={isTillPresent}
          setIsTillPresent={setIsTillPresent}
          namePeriod="work_period"
          monthPeriod={['work_start', 'work_end']}
          year={['year_start', 'year_end']}
          chosenMonth={chosenMonth}
          setChosenMonth={setChosenMonth}
        />
        <FormInput
          name="duties"
          values={values}
          handleChange={handleChange}
          label="Обязанности"
          extraInputClass="responsibilities"
          disabled={!hasExperience}
        />
        {addedExperience.map(experience => (
          <Job
            values={values}
            handleChange={handleChange}
            hasExperience={hasExperience}
            deleteExperience={deleteExperience}
            addExperience={addExperience}
            i={experience.id}
            key={experience.id}
            checkboxValues={checkboxValues}
            handleCheckboxChange={handleCheckboxChange}
            isTillPresent={isTillPresent}
            setIsTillPresent={setIsTillPresent}
            number={number}
            chosenMonth={chosenMonth}
            setChosenMonth={setChosenMonth}
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
  values: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func,
  handleCheckboxChange: PropTypes.func,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  hasExperience: PropTypes.bool.isRequired,
  setHasExperience: PropTypes.func,
  isTillPresent: PropTypes.bool.isRequired,
  setIsTillPresent: PropTypes.func,
}

Experience.defaultProps = {
  values: {},
  handleChange: () => {},
  handleCheckboxChange: () => {},
  checkboxValues: {},
  setHasExperience: () => {},
  setIsTillPresent: () => {},
}

export default Experience
