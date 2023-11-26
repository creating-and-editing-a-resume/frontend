import React from 'react'
import PropTypes from 'prop-types'
import './Project.scss'
import FormInput from '../../ResumeComponents/FormInput/FormInput'
import PlusIcon from '../../../../img/plus-icon.svg'
import TrashIcon from '../../../../img/trash-icon.svg'

const Project = ({ addProject, deleteProject, i }) => {
  const handleDelete = () => deleteProject(i)
  return (
    <>
      <div className="experience__job-container" id={i}>
        <FormInput label="Название проекта" />
        <FormInput
          label="Краткое описание проекта"
          extraInputClass="portfolio"
        />
        <FormInput label="Ссылка на проект" />
      </div>
      <div className="job__buttons-container">
        <button
          className="job__delete-button link"
          type="button"
          onClick={handleDelete}
        >
          <img src={TrashIcon} alt="trash-icon" />
          Удалить
        </button>
        <button
          className="job__add-button link"
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
}

export default Project
