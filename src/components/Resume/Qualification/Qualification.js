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
  checkboxValues,
  setHasQualification,
  hasQualification,
  values,
  handleChangeWithValidation,
  setValues,
  handleAddQualificationChange,
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
    if (values.qualifications.length === 0) {
      setNoAddedQualification(true)
    }
  }, [values.qualifications.length])

  return (
    <section className="qualification personal-data">
      <ResumeTitle
        title="Повышение квалификации"
        checkbox
        checkboxText="Отсутствует"
        checkboxId="title-checkbox"
        onClick={handleTitleCheckboxClick}
        handleCheckboxChange={handleCheckboxChange}
        name="qualification-checkbox"
        values={checkboxValues}
      />
      <div className="qualification__form-container experience__form-container">
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
          monthPeriod={['qual_start', 'qual_end']}
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
        <FormInput
          label="Навыки"
          name="skills"
          values={values}
          extraInputClass="qualification-skills"
          disabled={!hasQualification}
          handleChange={handleChangeWithValidation}
          setValues={setValues}
        />
        <FormInput
          name="diploma_link"
          values={values}
          label="Ссылка на дипломную работу"
          disabled={!hasQualification}
          handleChange={handleChangeWithValidation}
          setValues={setValues}
        />
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
          />
        ))}
        {noAddedQualification && values.qualifications.length === 0 && (
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
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  setHasQualification: PropTypes.func.isRequired,
  hasQualification: PropTypes.bool.isRequired,
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
  handleChangeWithValidation: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  handleAddQualificationChange: PropTypes.func.isRequired,
}

Qualification.defaultProps = {
  checkboxValues: {},
  values: {},
}

export default Qualification
