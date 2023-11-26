import React from 'react'
import PropTypes from 'prop-types'
import './AddedQualification.scss'
import FormInput from '../../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../../ResumeComponents/PeriodInput/PeriodInput'
import PlusIcon from '../../../../img/plus-icon.svg'
import TrashIcon from '../../../../img/trash-icon.svg'

const AddedQualification = ({
  hasQualification,
  addQualification,
  deleteQualification,
  i,
}) => {
  const handleDelete = () => deleteQualification(i)
  return (
    <>
      <div className="experience__job-container" id={i}>
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
          onClick={addQualification}
        >
          <img src={PlusIcon} alt="plus-icon" />
          Добавить
        </button>
      </div>
    </>
  )
}

AddedQualification.propTypes = {
  hasQualification: PropTypes.bool.isRequired,
  addQualification: PropTypes.func.isRequired,
  deleteQualification: PropTypes.func.isRequired,
  i: PropTypes.string.isRequired,
}

export default AddedQualification
