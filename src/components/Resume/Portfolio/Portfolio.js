import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import './Portfolio.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import Project from './Project/Project'

const Portfolio = ({
  values,
  setValues,
  handleChangeWithValidation,
  handleAddPortfolioChange,
}) => {
  // Если появился добавленное образование, основная кнопка "Добавить" удаляется
  const [noAddedProjects, setNoAddedProjects] = useState(true)

  const addProject = () => {
    setNoAddedProjects(false)
    setValues({ ...values, portfolio: [...values.portfolio, { id: uuidv4() }] })
  }

  const deleteProject = projectId => {
    const projectToBeRemoved = values.portfolio.find(m => projectId === m.id)
    setValues({
      ...values,
      portfolio: values.portfolio.filter(
        item => item.id !== projectToBeRemoved.id
      ),
    })
  }

  // Если addedEducation пустой, то возвращается основная кнопка "Добавить"
  useEffect(() => {
    if (values.portfolio.length === 0) {
      setNoAddedProjects(true)
    }
  }, [values.portfolio.length])

  return (
    <section className="portfolio personal-data">
      <ResumeTitle title="Проекты и портфолио" />
      <div className="eportfolio__form-container xperience__form-container">
        <FormInput
          name="project_name"
          values={values}
          handleChange={handleChangeWithValidation}
          label="Название проекта"
        />
        <FormInput
          name="project_description"
          values={values}
          handleChange={handleChangeWithValidation}
          label="Краткое описание проекта"
          extraInputClass="portfolio"
        />
        <FormInput
          name="project_link"
          values={values}
          handleChange={handleChangeWithValidation}
          label="Ссылка на проект"
        />
        {values.portfolio.map(project => (
          <Project
            values={project}
            deleteProject={deleteProject}
            addProject={addProject}
            i={project.id}
            key={project.id}
            handleChange={handleAddPortfolioChange}
          />
        ))}
        {noAddedProjects && values.portfolio.length === 0 && (
          <AddButton handleClick={addProject} />
        )}
      </div>
    </section>
  )
}

Portfolio.propTypes = {
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
  setValues: PropTypes.func.isRequired,
  handleChangeWithValidation: PropTypes.func.isRequired,
  handleAddPortfolioChange: PropTypes.func.isRequired,
}

Portfolio.defaultProps = {
  values: {},
}

export default Portfolio
