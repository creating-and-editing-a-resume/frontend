import '../PersonalData/PersonalData.scss'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import './Education.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import AddButton from '../ResumeComponents/AddButton/AddButton'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import PeriodInput from '../ResumeComponents/PeriodInput/PeriodInput'
import AddedEducation from './AddedEducation/AddedEducation'

const Education = ({
  values,
  handleChangeWithValidation,
  checkboxValues,
  setValues,
  handleCheckboxChange,
  setAllTillPresent,
  allTillPresent,
  setCheckboxValues,
  handleAddEducationChange,
}) => {
  // Если появился добавленное образование, основная кнопка "Добавить" удаляется
  const [noAddedEducation, setNoAddedEducation] = useState(true)

  const addEducation = () => {
    setNoAddedEducation(false)
    setValues({
      ...values,
      educations: [...values.educations, { id: uuidv4() }],
    })
  }

  const deleteEducation = educationId => {
    const educationToBeRemoved = values.educations.find(
      m => educationId === m.id
    )
    setValues({
      ...values,
      educations: values.educations.filter(
        item => item.id !== educationToBeRemoved.id
      ),
    })
  }

  // Если addedEducation пустой, то возвращается основная кнопка "Добавить"
  useEffect(() => {
    if (values.educations.length === 0) {
      setNoAddedEducation(true)
    }
  }, [values.educations.length])

  return (
    <section className="personal-data education">
      <ResumeTitle title="Образование" />
      <div className="experience__form-container">
        <FormInput
          values={values}
          handleChange={handleChangeWithValidation}
          name="university_name"
          label="Название вуза"
        />
        <PeriodInput
          namePeriod="education_period_checkbox"
          year={['year_education_start', 'year_education_end']}
          monthPeriod={[]}
          education
          labelOne="Год поступления"
          labelTwo="Год окончания"
          i="0"
          tillPresent
          checkboxValues={checkboxValues}
          handleCheckboxChange={handleCheckboxChange}
          values={values}
          setValues={setValues}
          setAllTillPresent={setAllTillPresent}
          allTillPresent={allTillPresent}
          handleChange={handleChangeWithValidation}
          setCheckboxValues={setCheckboxValues}
        />
        <FormInput
          values={values}
          handleChange={handleChangeWithValidation}
          name="university_specialization"
          label="Специальность"
        />
        <FormInput
          values={values}
          handleChange={handleChangeWithValidation}
          name="education_level"
          label="Степень"
        />
        {values.educations.map(education => (
          <AddedEducation
            values={education}
            deleteEducation={deleteEducation}
            addEducation={addEducation}
            i={education.id}
            key={education.id}
            handleChange={handleAddEducationChange}
            checkboxValues={checkboxValues}
            handleCheckboxChange={handleCheckboxChange}
            setValues={setValues}
            setAllTillPresent={setAllTillPresent}
            allTillPresent={allTillPresent}
            allValues={values}
          />
        ))}
        {noAddedEducation && values.educations.length === 0 && (
          <AddButton handleClick={addEducation} />
        )}
      </div>
    </section>
  )
}

Education.propTypes = {
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
  setValues: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  setAllTillPresent: PropTypes.func.isRequired,
  allTillPresent: PropTypes.shape({
    value: PropTypes.bool,
  }),
  setCheckboxValues: PropTypes.func.isRequired,
  handleChangeWithValidation: PropTypes.func.isRequired,
  handleAddEducationChange: PropTypes.func.isRequired,
}

Education.defaultProps = {
  values: {},
  checkboxValues: {},
  allTillPresent: {},
}

export default Education
