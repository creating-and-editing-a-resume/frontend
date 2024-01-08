/* eslint-disable jsx-a11y/no-static-element-interactions */
import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import './Qualification.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../ResumeComponents/PeriodInput/PeriodInput'
import AddedQualification from './AddedQualification/AddedQualification'

const Qualification = ({
  handleCheckboxChange,
  setHasQualification,
  hasQualification,
  values,
  handleChangeWithValidation,
  setValues,
  handleAddQualificationChange,
  setQualifications,
}) => {
  // Если появилась добавленная квалификация, основная кнопка "Добавить" удаляется
  const [noAddedQualification, setNoAddedQualification] = useState(true)

  const handleTitleCheckboxClick = () => {
    setHasQualification(!hasQualification)
    setValues({ ...values, qualifications: [] })
    setNoAddedQualification(true)
  }

  const addQualification = () => {
    setNoAddedQualification(false)
    setValues({
      ...values,
      qualifications: [...values.qualifications, { id: uuidv4() }],
    })
  }

  const deleteQualification = qualificationId => {
    const qualificationToBeRemoved = values.qualifications.find(
      m => qualificationId === m.id
    )
    setValues({
      ...values,
      qualifications: values.qualifications.filter(
        item => item.id !== qualificationToBeRemoved.id
      ),
    })
  }

  // Если addedExperience пустой, то возвращается основная кнопка "Добавить"
  useEffect(() => {
    if (values.qualifications?.length === 0) {
      setNoAddedQualification(true)
    }
  }, [values.qualifications?.length])

  const handleBackToBasicRecommend = () => {
    setQualifications(false)
  }

  return (
    <section className="qualification personal-data">
      <ResumeTitle
        title="Повышение квалификации"
        checkbox
        checkboxText="Отсутствует"
        checkboxId="title-checkbox"
        onClick={handleTitleCheckboxClick}
        handleCheckboxChange={handleCheckboxChange}
        name="qualification_checkbox"
        values={values}
        handleBackToBasicRecommend={handleBackToBasicRecommend}
      />
      <div className="qualification__form-container experience__form-container">
        <div
          className="qualification__basic-recommend"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            name="organization"
            values={values}
            label="Проводившая организация"
            disabled={!hasQualification}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
          <FormInput
            name="course_name"
            values={values}
            label="Название курса"
            disabled={!hasQualification}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
          <FormInput
            name="work_specialization"
            values={values}
            label="Специальность"
            disabled={!hasQualification}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
          <PeriodInput
            monthPeriod={['month_qual_start', 'month_qual_end']}
            year={['year_qual_start', 'year_qual_end']}
            labelOne="Дата начала"
            labelTwo="Дата окончания"
            month
            disabled={!hasQualification}
            i="0"
            values={values}
            setValues={setValues}
            handleChange={handleChangeWithValidation}
          />
          <FormInput
            label="Описание полученного опыта"
            name="description_experience"
            values={values}
            extraInputClass="qualification-experience"
            disabled={!hasQualification}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
        </div>
        <FormInput
          label="Навыки"
          name="skills"
          values={values}
          extraInputClass="qualification-skills"
          disabled={!hasQualification}
          handleChange={handleChangeWithValidation}
          setValues={setValues}
          setQualifications={setQualifications}
        />
        <div
          className="qualification__basic-recommend"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            name="diploma_link"
            values={values}
            label="Ссылка на дипломную работу"
            disabled={!hasQualification}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
        </div>
        {values.qualifications.map(qualification => (
          <AddedQualification
            values={qualification}
            hasQualification={hasQualification}
            handleChange={handleAddQualificationChange}
            deleteQualification={deleteQualification}
            addQualification={addQualification}
            i={qualification.id}
            key={qualification.id}
            setValues={setValues}
            allValues={values}
            setQualifications={setQualifications}
            handleBackToBasicRecommend={handleBackToBasicRecommend}
          />
        ))}
        {noAddedQualification && values.qualifications?.length === 0 && (
          <AddButton
            disabled={!hasQualification}
            handleClick={addQualification}
          />
        )}
      </div>
    </section>
  )
}

Qualification.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  setHasQualification: PropTypes.func.isRequired,
  hasQualification: PropTypes.bool.isRequired,
  values: PropTypes.objectOf(
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
  handleChangeWithValidation: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  handleAddQualificationChange: PropTypes.func.isRequired,
  setQualifications: PropTypes.func,
}

Qualification.defaultProps = {
  values: {},
  setQualifications: () => {},
}

export default Qualification
