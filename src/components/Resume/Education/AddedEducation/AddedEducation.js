import React from 'react'
import PropTypes from 'prop-types'
import './AddedEducation.scss'
import FormInput from '../../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../../ResumeComponents/PeriodInput/PeriodInput'
import PlusIcon from '../../../../img/plus-icon.svg'
import TrashIcon from '../../../../img/trash-icon.svg'

const AddedEducation = ({ addEducation, deleteEducation, i }) => {
  const handleDelete = () => deleteEducation(i)
  return (
    <>
      <div className="experience__job-container" id={i}>
        <FormInput label="Название вуза" />
        <PeriodInput
          labelOne="Год поступления"
          labelTwo="Год окончания"
          i="0"
          tillPresent
        />
        <FormInput label="Специальность" />
        <FormInput label="Степень" />
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
          onClick={addEducation}
        >
          <img src={PlusIcon} alt="plus-icon" />
          Добавить
        </button>
      </div>
    </>
  )
}

AddedEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  deleteEducation: PropTypes.func.isRequired,
  i: PropTypes.string.isRequired,
}

export default AddedEducation
