import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './Education.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../ResumeComponents/PeriodInput/PeriodInput'
import AddedEducation from './AddedEducation/AddedEducation'

const Education = () => {
  // Если появился добавленное образование, основная кнопка "Добавить" удаляется
  const [noAddedEducation, setNoAddedEducation] = useState(true)
  const [addedEducation, setAddedEducation] = useState([])

  const addEducation = () => {
    setNoAddedEducation(false)
    setAddedEducation([...addedEducation, { id: uuidv4() }])
  }

  const deleteEducation = educationId => {
    const educationToBeRemoved = addedEducation.find(m => educationId === m.id)
    setAddedEducation(
      addedEducation.filter(item => item.id !== educationToBeRemoved.id)
    )
  }

  // Если addedEducation пустой, то возвращается основная кнопка "Добавить"
  useEffect(() => {
    if (addedEducation.length === 0) {
      setNoAddedEducation(true)
    }
  }, [addedEducation.length])

  return (
    <section className="personal-data education">
      <ResumeTitle title="Образование" />
      <div className="experience__form-container">
        <FormInput label="Название вуза" />
        <PeriodInput
          labelOne="Год поступления"
          labelTwo="Год окончания"
          i="0"
          tillPresent
        />
        <FormInput label="Специальность" />
        <FormInput label="Степень" />
        {addedEducation.map(education => (
          <AddedEducation
            deleteEducation={deleteEducation}
            addEducation={addEducation}
            i={education.id}
            key={education.id}
          />
        ))}
        {noAddedEducation && <AddButton handleClick={addEducation} />}
      </div>
    </section>
  )
}

export default Education
