import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './Experience.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../ResumeComponents/PeriodInput/PeriodInput'
import Job from './Job/Job'
import { JOB_TIP } from '../../../constants/tips'

const Experience = () => {
  // Если опыт есть, поля активны. Если нет, поля деактивируются:
  const [hasExperience, setHasExperience] = useState(true)
  // Если появился добавленный опыт, основная кнопка "Добавить" удаляется
  const [noAddedExperience, setNoAddedExperience] = useState(true)
  const [addedExperience, setAddedExperience] = useState([])

  const handleTitleCheckboxClick = () => {
    setHasExperience(!hasExperience)
    setAddedExperience([])
    setNoAddedExperience(true)
  }

  const addExperience = () => {
    setNoAddedExperience(false)
    setAddedExperience([...addedExperience, { id: uuidv4() }])
  }

  const deleteExperience = jobId => {
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
        title="Опыт работы"
        checkbox
        checkboxText="Нет опыта"
        checkboxId="title-checkbox"
        onClick={handleTitleCheckboxClick}
      />
      <div className="experience__form-container">
        <FormInput label="Название компании" disabled={!hasExperience} />
        <FormInput label="Сайт компании" disabled={!hasExperience} />
        <FormInput
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
        />
        <FormInput
          label="Обязанности"
          extraInputClass="responsibilities"
          disabled={!hasExperience}
        />
        {addedExperience.map(experience => (
          <Job
            hasExperience={hasExperience}
            deleteExperience={deleteExperience}
            addExperience={addExperience}
            i={experience.id}
            key={experience.id}
          />
        ))}
        {noAddedExperience && (
          <AddButton disabled={!hasExperience} handleClick={addExperience} />
        )}
      </div>
    </section>
  )
}

export default Experience
