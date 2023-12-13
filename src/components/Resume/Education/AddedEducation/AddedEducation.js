import React from 'react'
import PropTypes from 'prop-types'
import './AddedEducation.scss'
import FormInput from '../../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../../ResumeComponents/PeriodInput/PeriodInput'
import PlusIcon from '../../../../img/plus-icon.svg'
import TrashIcon from '../../../../img/trash-icon.svg'

const AddedEducation = ({
  addEducation,
  deleteEducation,
  i,
  values,
  handleChange,
  checkboxValues,
  handleCheckboxChange,
  setValues,
  setAllTillPresent,
  allTillPresent,
  allValues,
}) => {
  const handleDelete = () => deleteEducation(i)
  return (
    <>
      <div
        className="added-education__container experience__job-container"
        id={i}
      >
        <FormInput
          name={`university_name_${i}`}
          values={values}
          handleChange={handleChange}
          label="Название вуза"
          id={i}
        />
        <PeriodInput
          education
          namePeriod={`education_period_checkbox_${i}`}
          year={[`year_education_start_${i}`, `year_education_end_${i}`]}
          monthPeriod={[]}
          labelOne="Год поступления"
          labelTwo="Год окончания"
          i={i}
          tillPresent
          values={values}
          checkboxValues={checkboxValues}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          setValues={setValues}
          setAllTillPresent={setAllTillPresent}
          allTillPresent={allTillPresent}
          allValues={allValues}
        />
        <FormInput
          name={`university_specialization_${i}`}
          values={values}
          handleChange={handleChange}
          label="Специальность"
          id={i}
        />
        <FormInput
          name={`education_level_${i}`}
          values={values}
          handleChange={handleChange}
          label="Степень"
          id={i}
        />
      </div>
      <div className="added-education__buttons-container job__buttons-container">
        <button
          className="added-education__delete-button job__delete-button link"
          type="button"
          onClick={handleDelete}
        >
          <img src={TrashIcon} alt="trash-icon" />
          Удалить
        </button>
        <button
          className="added-education__add-button job__add-button link"
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
  values: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func.isRequired,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  handleCheckboxChange: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setAllTillPresent: PropTypes.func.isRequired,
  allTillPresent: PropTypes.shape({
    value: PropTypes.bool,
  }),
  allValues: PropTypes.objectOf(
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
}

AddedEducation.defaultProps = {
  values: {},
  checkboxValues: {},
  allTillPresent: {},
  allValues: {},
}

export default AddedEducation
