/* eslint-disable jsx-a11y/no-static-element-interactions */
import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import './Portfolio.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import Project from './Project/Project'
import { CurrentValuesContext } from '../../../contexts/ValuesContext'

const Portfolio = ({
  setValues,
  handleChangeWithValidation,
  handleAddPortfolioChange,
  setPortfolio,
  handleCheckboxChange,
}) => {
  // Если появился добавленное образование, основная кнопка "Добавить" удаляется
  const [noAddedProjects, setNoAddedProjects] = useState(true)
  const values = React.useContext(CurrentValuesContext)

  const handleTitleCheckboxClick = () => {
    setValues(prevValues => ({
      ...prevValues,
      portfolio: [],
      portfolio_checkbox: !prevValues.portfolio_checkbox,
    }))
    setNoAddedProjects(true)
  }

  const addProject = () => {
    setNoAddedProjects(false)
    setValues(prevValues => ({
      ...prevValues,
      portfolio: [...prevValues.portfolio, { id: uuidv4() }],
    }))
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

  const handleBackToBasicRecommend = () => {
    setPortfolio(false)
  }
  // Если addedEducation пустой, то возвращается основная кнопка "Добавить"
  useEffect(() => {
    if (values.portfolio?.length === 0) {
      setNoAddedProjects(true)
    }
  }, [values.portfolio?.length])

  return (
    <section className="portfolio">
      <ResumeTitle
        title="Проекты и портфолио"
        name="portfolio_checkbox"
        values={values}
        handleCheckboxChange={handleCheckboxChange}
        checkbox
        checkboxText="Отсутствует"
        checkboxId="title-portfolio-checkbox"
        onClick={handleTitleCheckboxClick}
        handleBackToBasicRecommend={handleBackToBasicRecommend}
      />
      <div className="portfolio__form-container">
        <div
          className="portfolio__basic-recommend"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            name="project_name"
            values={values}
            handleChange={handleChangeWithValidation}
            label="Название проекта"
            disabled={values.portfolio_checkbox}
            setValues={setValues}
          />
        </div>
        <FormInput
          name="project_description"
          values={values}
          handleChange={handleChangeWithValidation}
          label="Краткое описание проекта"
          extraInputClass="portfolio"
          setPortfolio={setPortfolio}
          disabled={values.portfolio_checkbox}
          setValues={setValues}
        />
        <div
          className="portfolio__basic-recommend"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            name="project_link"
            values={values}
            handleChange={handleChangeWithValidation}
            label="Ссылка на проект"
            disabled={values.portfolio_checkbox}
            setValues={setValues}
          />
        </div>
        {values.portfolio.map(project => (
          <Project
            values={project}
            deleteProject={deleteProject}
            addProject={addProject}
            i={project.id}
            key={project.id}
            handleChange={handleAddPortfolioChange}
            setPortfolio={setPortfolio}
            handleBackToBasicRecommend={handleBackToBasicRecommend}
            disabled={values.portfolio_checkbox}
          />
        ))}
        {noAddedProjects && values.portfolio?.length === 0 && (
          <AddButton
            handleClick={addProject}
            disabled={values.portfolio_checkbox}
          />
        )}
      </div>
    </section>
  )
}

Portfolio.propTypes = {
  setValues: PropTypes.func.isRequired,
  handleChangeWithValidation: PropTypes.func.isRequired,
  handleAddPortfolioChange: PropTypes.func.isRequired,
  setPortfolio: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
}

export default Portfolio
