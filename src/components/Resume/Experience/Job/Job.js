import React from 'react'
import PropTypes from 'prop-types'
import './Job.scss'
import FormInput from '../../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../../ResumeComponents/PeriodInput/PeriodInput'
import { JOB_TIP } from '../../../../constants/tips'
import PlusIcon from '../../../../img/plus-icon.svg'
import TrashIcon from '../../../../img/trash-icon.svg'

const Job = ({
  hasExperience,
  addExperience,
  deleteExperience,
  i,
  values,
  handleChange,
  number,
  handleCheckboxChange,
  checkboxValues,
  setValues,
  setAllTillPresent,
  allTillPresent,
}) => {
  const handleDelete = () => deleteExperience(i)
  return (
    <>
      <div className="experience__job-container" id={i}>
        <FormInput
          name={`company_${number}`}
          values={values}
          handleChange={handleChange}
          label="Название компании"
          disabled={!hasExperience}
          setValues={setValues}
        />
        <FormInput
          name={`company_website_${number}`}
          values={values}
          handleChange={handleChange}
          label="Сайт компании"
          disabled={!hasExperience}
          setValues={setValues}
        />
        <FormInput
          name={`current_position_${number}`}
          values={values}
          handleChange={handleChange}
          label="Должность"
          tipText={JOB_TIP}
          disabled={!hasExperience}
          setValues={setValues}
        />
        <PeriodInput
          labelOne="Дата начала работы"
          labelTwo="Дата окончания работы"
          month
          disabled={!hasExperience}
          i={i}
          tillPresent
          values={values}
          checkboxValues={checkboxValues}
          handleChange={handleChange}
          namePeriod={`work_period_checkbox_${number}`}
          monthPeriod={[
            `month_work_start_${number}`,
            `month_work_end_${number}`,
          ]}
          year={[`year_work_start_${number}`, `year_work_end_${number}`]}
          handleCheckboxChange={handleCheckboxChange}
          setValues={setValues}
          setAllTillPresent={setAllTillPresent}
          allTillPresent={allTillPresent}
        />
        <FormInput
          name={`duties_${number}`}
          values={values}
          handleChange={handleChange}
          label="Обязанности"
          extraInputClass="responsibilities"
          disabled={!hasExperience}
          setValues={setValues}
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
          onClick={addExperience}
        >
          <img src={PlusIcon} alt="plus-icon" />
          Добавить
        </button>
      </div>
    </>
  )
}

Job.propTypes = {
  hasExperience: PropTypes.bool.isRequired,
  addExperience: PropTypes.func.isRequired,
  deleteExperience: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
  values: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  number: PropTypes.number,
  handleCheckboxChange: PropTypes.func,
  setValues: PropTypes.func,
  setAllTillPresent: PropTypes.func,
  allTillPresent: PropTypes.shape({
    value: PropTypes.bool,
  }),
}

Job.defaultProps = {
  values: {},
  handleChange: () => {},
  checkboxValues: {},
  number: undefined,
  handleCheckboxChange: () => {},
  setValues: () => {},
  setAllTillPresent: () => {},
  allTillPresent: {},
}

export default Job
