/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'
import './AddedQualification.scss'
import FormInput from '../../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../../ResumeComponents/PeriodInput/PeriodInput'
import PlusIcon from '../../../../img/plus-icon.svg'
import TrashIcon from '../../../../img/trash-icon-red.svg'

const AddedQualification = ({
  addQualification,
  deleteQualification,
  i,
  values,
  handleChange,
  setValues,
  allValues,
  setQualifications,
  handleBackToBasicRecommend,
  disabled,
}) => {
  const handleDelete = () => deleteQualification(i)
  return (
    <>
      <div className="added-qualification__container" id={i}>
        <div
          className="added-qualification__basic-recommend"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            name="organization"
            values={values}
            handleChange={handleChange}
            label="Проводившая организация"
            disabled={disabled}
            id={i}
          />
          <FormInput
            name="course_name"
            values={values}
            handleChange={handleChange}
            label="Название курса"
            disabled={disabled}
            id={i}
          />
          <FormInput
            name="specialization"
            values={values}
            handleChange={handleChange}
            label="Специальность"
            disabled={disabled}
            id={i}
          />
          <PeriodInput
            labelOne="Дата начала"
            labelTwo="Дата окончания"
            month
            disabled={disabled}
            i={i}
            values={values}
            handleChange={handleChange}
            namePeriod={`qual_period_checkbox_${i}`}
            monthPeriod={['month_qual_start', 'month_qual_end']}
            year={['year_qual_start', 'year_qual_end']}
            setValues={setValues}
            allValues={allValues}
          />
          <FormInput
            name="description_experience"
            values={values}
            handleChange={handleChange}
            label="Описание полученного опыта"
            extraInputClass="qualification-experience"
            disabled={disabled}
            id={i}
          />
        </div>
        <FormInput
          name="skills"
          values={values}
          handleChange={handleChange}
          label="Навыки"
          extraInputClass="qualification-skills"
          disabled={disabled}
          id={i}
          setQualifications={setQualifications}
        />
        <div
          className="added-qualification__basic-recommend"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            name="diploma_link"
            values={values}
            handleChange={handleChange}
            label="Ссылка на дипломную работу"
            disabled={disabled}
            id={i}
          />
        </div>
      </div>
      <div className="added-qualification__buttons-container">
        <button
          className="added-qualification__delete-button link"
          type="button"
          onClick={handleDelete}
        >
          <img src={TrashIcon} alt="trash-icon" />
          Удалить
        </button>
        <button
          className="added-qualification__add-button job__add-button link"
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
  addQualification: PropTypes.func.isRequired,
  deleteQualification: PropTypes.func.isRequired,
  i: PropTypes.string.isRequired,
  values: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  handleChange: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  setQualifications: PropTypes.func.isRequired,
  handleBackToBasicRecommend: PropTypes.func.isRequired,
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
  disabled: PropTypes.bool.isRequired,
}

AddedQualification.defaultProps = {
  values: {},
  allValues: {},
}

export default AddedQualification
