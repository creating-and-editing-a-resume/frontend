/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import './Job.scss'
import FormInput from '../../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../../ResumeComponents/PeriodInput/PeriodInput'
import { JOB_TIP } from '../../../../constants/tips'
import PlusIcon from '../../../../img/plus-icon.svg'
import TrashIcon from '../../../../img/trash-icon-red.svg'

const Job = ({
  hasExperience,
  addExperience,
  deleteExperience,
  i,
  values,
  handleChange,
  handleCheckboxChange,
  setValues,
  setAllTillPresent,
  allTillPresent,
  setDuties,
  allValues,
  handleBackToBasicRecommend,
}) => {
  const handleDelete = () => deleteExperience(i)

  return (
    <>
      <div className="job__job-container experience__job-container" id={i}>
        <div
          className="job__job-container-basic-rec"
          onClick={handleBackToBasicRecommend}
        >
          <FormInput
            name="company"
            values={values}
            handleChange={handleChange}
            label="Название компании"
            disabled={!hasExperience}
            id={i}
          />
          <FormInput
            name="company_website"
            values={values}
            handleChange={handleChange}
            label="Сайт компании"
            disabled={!hasExperience}
            id={i}
          />
          <FormInput
            name="current_position"
            values={values}
            handleChange={handleChange}
            label="Должность"
            tipText={JOB_TIP}
            disabled={!hasExperience}
            id={i}
          />
          <PeriodInput
            labelOne="Дата начала работы"
            labelTwo="Дата окончания работы"
            month
            disabled={!hasExperience}
            i={i}
            tillPresent
            values={values}
            handleChange={handleChange}
            namePeriod="work_period_experience_checkbox"
            monthPeriod={['month_work_start', 'month_work_end']}
            year={['year_work_start', 'year_work_end']}
            handleCheckboxChange={handleCheckboxChange}
            setValues={setValues}
            setAllTillPresent={setAllTillPresent}
            allTillPresent={allTillPresent}
            allValues={allValues}
          />
        </div>
        <FormInput
          name="duties"
          values={values}
          handleChange={handleChange}
          label="Обязанности"
          extraInputClass="responsibilities"
          disabled={!hasExperience}
          setDuties={setDuties}
          id={i}
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
  setDuties: PropTypes.func.isRequired,
  allValues: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.bool,
            ])
          ),
        ])
      ),
    ])
  ),
  handleBackToBasicRecommend: PropTypes.func.isRequired,
}

Job.defaultProps = {
  values: {},
  checkboxValues: {},
  allTillPresent: {},
  allValues: {},
}

export default Job
