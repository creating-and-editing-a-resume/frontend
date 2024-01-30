import React from 'react'
import PropTypes from 'prop-types'
import './AddedEducation.scss'
import FormInput from '../../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../../ResumeComponents/PeriodInput/PeriodInput'
import PlusIcon from '../../../../img/plus-icon.svg'
import TrashIcon from '../../../../img/trash-icon-red.svg'

const AddedEducation = ({
  addEducation,
  deleteEducation,
  i,
  values,
  handleChange,
  handleCheckboxChange,
  setValues,
  allValues,
  disabled,
}) => {
  const handleDelete = () => deleteEducation(i)
  return (
    <>
      <div className="added-education__container" id={i}>
        <FormInput
          name="university_name"
          values={values}
          handleChange={handleChange}
          label="Название вуза"
          id={i}
          disabled={disabled}
        />
        <PeriodInput
          education
          namePeriod="education_period_checkbox"
          year={['year_education_start', 'year_education_end']}
          monthPeriod={[]}
          labelOne="Год поступления"
          labelTwo="Год окончания"
          i={i}
          tillPresent
          values={values}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          setValues={setValues}
          allValues={allValues}
          disabled={disabled}
        />
        <FormInput
          name="university_specialization"
          values={values}
          handleChange={handleChange}
          label="Специальность"
          id={i}
          disabled={disabled}
        />
        <FormInput
          name="education_level"
          values={values}
          handleChange={handleChange}
          label="Степень"
          id={i}
          disabled={disabled}
        />
      </div>
      <div className="added-education__buttons-container">
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
  allTillPresent: PropTypes.shape({
    value: PropTypes.bool,
  }),
  allValues: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.bool,
            ])
          ),
          PropTypes.string,
        ])
      ),
    ])
  ),
  disabled: PropTypes.bool.isRequired,
}

AddedEducation.defaultProps = {
  values: {},
  checkboxValues: {},
  allTillPresent: {},
  allValues: {},
}

export default AddedEducation
