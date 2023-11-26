import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './Qualification.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../ResumeComponents/PeriodInput/PeriodInput'
import AddedQualification from './AddedQualification/AddedQualification'

const Qualification = () => {
  // Если повышение квалицикации есть, поля активны. Если нет, поля деактивируются:
  const [hasQualification, setHasQualification] = useState(true)
  // Если появилась добавленная квалификация, основная кнопка "Добавить" удаляется
  const [noAddedQualification, setNoAddedQualification] = useState(true)
  const [addedQualification, setAddedQualification] = useState([])

  const handleTitleCheckboxClick = () => {
    setHasQualification(!hasQualification)
    setAddedQualification([])
    setNoAddedQualification(true)
  }

  const addQualification = () => {
    setNoAddedQualification(false)
    setAddedQualification([...addedQualification, { id: uuidv4() }])
  }

  const deleteQualification = qualificationId => {
    const qualificationToBeRemoved = addedQualification.find(
      m => qualificationId === m.id
    )
    setAddedQualification(
      addedQualification.filter(item => item.id !== qualificationToBeRemoved.id)
    )
  }

  // Если addedExperience пустой, то возвращается основная кнопка "Добавить"
  useEffect(() => {
    if (addedQualification.length === 0) {
      setNoAddedQualification(true)
    }
  }, [addedQualification.length])

  return (
    <section className="personal-data qualification">
      <ResumeTitle
        title="Повышение квалификации"
        checkbox
        checkboxText="Отсутствует"
        checkboxId="title-checkbox"
        onClick={handleTitleCheckboxClick}
      />
      <div className="experience__form-container">
        <FormInput
          label="Проводившая организация"
          disabled={!hasQualification}
        />
        <FormInput label="Название курса" disabled={!hasQualification} />
        <FormInput label="Специальность" disabled={!hasQualification} />
        <PeriodInput
          labelOne="Дата начала"
          labelTwo="Дата окончания"
          month
          disabled={!hasQualification}
          i="0"
        />
        <FormInput
          label="Описание полученного опыта"
          extraInputClass="qualification-experience"
          disabled={!hasQualification}
        />
        <FormInput
          label="Навыки"
          extraInputClass="qualification-skills"
          disabled={!hasQualification}
        />
        <FormInput
          label="Ссылка на дипломную работу"
          disabled={!hasQualification}
        />
        {addedQualification.map(qualification => (
          <AddedQualification
            hasQualification={hasQualification}
            deleteQualification={deleteQualification}
            addQualification={addQualification}
            i={qualification.id}
            key={qualification.id}
          />
        ))}
        {noAddedQualification && (
          <AddButton
            disabled={!hasQualification}
            handleClick={addQualification}
          />
        )}
      </div>
    </section>
  )
}

export default Qualification
