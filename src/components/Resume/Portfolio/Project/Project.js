/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
import './Project.scss'
import FormInput from '../../ResumeComponents/FormInput/FormInput'
import PlusIcon from '../../../../img/plus-icon.svg'
import TrashIcon from '../../../../img/trash-icon-red.svg'

const Project = ({
  addProject,
  deleteProject,
  i,
  values,
  handleChange,
  setPortfolio,
  handleBackToBasicRecommend,
}) => {
  const handleDelete = () => deleteProject(i)
  return (
    <>
      {/* <div className="project__container experience__job-container" id={i}>
        <FormInput label="Название проекта" />
      </div> */}
      <div className="project__container experience__job-container" id={i}>
        <div
          className="portfolio__basic-recommend"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            values={values}
            handleChange={handleChange}
            id={i}
            name="project_name"
            label="Название проекта"
          />
        </div>
        <FormInput
          values={values}
          handleChange={handleChange}
          id={i}
          name="project_description"
          label="Краткое описание проекта"
          extraInputClass="portfolio"
          setPortfolio={setPortfolio}
        />
        <div
          className="portfolio__basic-recommend"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            values={values}
            handleChange={handleChange}
            id={i}
            name="project_link"
            label="Ссылка на проект"
          />
        </div>
      </div>
      <div className="project__buttons-container job__buttons-container">
        <button
          className="project__delete-button job__delete-button link"
          type="button"
          onClick={handleDelete}
        >
          <img src={TrashIcon} alt="trash-icon" />
          Удалить
        </button>
        <button
          className="project__add-button job__add-button link"
          type="button"
          onClick={addProject}
        >
          <img src={PlusIcon} alt="plus-icon" />
          Добавить
        </button>
      </div>
    </>
  )
}

Project.propTypes = {
  addProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  i: PropTypes.string.isRequired,
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
  handleChange: PropTypes.func.isRequired,
  handleBackToBasicRecommend: PropTypes.func.isRequired,
  setPortfolio: PropTypes.func.isRequired,
}

Project.defaultProps = {
  values: {},
}

export default Project
