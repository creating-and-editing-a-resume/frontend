import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './Portfolio.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import Project from './Project/Project'

const Portfolio = () => {
  // Если появился добавленное образование, основная кнопка "Добавить" удаляется
  const [noAddedProjects, setNoAddedProjects] = useState(true)
  const [addedProjects, setAddedProjects] = useState([])

  const addProject = () => {
    setNoAddedProjects(false)
    setAddedProjects([...addedProjects, { id: uuidv4() }])
  }

  const deleteProject = projectId => {
    const projectToBeRemoved = addedProjects.find(m => projectId === m.id)
    setAddedProjects(
      addedProjects.filter(item => item.id !== projectToBeRemoved.id)
    )
  }

  // Если addedEducation пустой, то возвращается основная кнопка "Добавить"
  useEffect(() => {
    if (addedProjects.length === 0) {
      setNoAddedProjects(true)
    }
  }, [addedProjects.length])

  return (
    <section className="personal-data portfolio">
      <ResumeTitle title="Проекты и портфолио" />
      <div className="experience__form-container">
        <FormInput label="Название проекта" />
        <FormInput
          label="Краткое описание проекта"
          extraInputClass="portfolio"
        />
        <FormInput label="Ссылка на проект" />
        {addedProjects.map(project => (
          <Project
            deleteProject={deleteProject}
            addProject={addProject}
            i={project.id}
            key={project.id}
          />
        ))}
        {noAddedProjects && <AddButton handleClick={addProject} />}
      </div>
    </section>
  )
}

export default Portfolio
