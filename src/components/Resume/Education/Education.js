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
import { CurrentValuesContext } from '../../../contexts/ValuesContext'

const Education = ({
  handleChangeWithValidation,
  setValues,
  handleCheckboxChange,
  handleAddEducationChange,
  handleAddEducationCheckboxChange,
}) => {
  // Если появился добавленное образование, основная кнопка "Добавить" удаляется
  const [noAddedEducation, setNoAddedEducation] = useState(true)
  const values = React.useContext(CurrentValuesContext)

  const addEducation = () => {
    setNoAddedEducation(false)
    setValues({
      ...values,
      educations: [
        ...values.educations,
        { id: uuidv4(), education_period_checkbox: false },
      ],
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
    if (values.educations?.length === 0) {
      setNoAddedEducation(true)
    }
  }, [values.educations?.length])

  const handleTitleCheckboxClick = () => {
    setValues({ ...values, educations: [] })
    setValues(prevValues => ({
      ...prevValues,
      educations: [],
      education_checkbox: !prevValues.education_checkbox,
    }))
    setNoAddedEducation(true)
  }

  useEffect(() => {
    if (values.education_checkbox === true) {
      setValues(prevValues => ({
        ...prevValues,
        education_period_checkbox: false,
      }))
    }
  }, [values.education_checkbox])

  return (
    <section className="education">
      <ResumeTitle
        title="Образование"
        checkbox
        name="education_checkbox"
        values={values}
        handleCheckboxChange={handleCheckboxChange}
        checkboxText="Отсутствует"
        onClick={handleTitleCheckboxClick}
        checkboxId="title-education-checkbox"
      />
      <div className="education__form-container">
        <FormInput
          values={values}
          handleChange={handleChangeWithValidation}
          name="university_name"
          label="Название вуза"
          disabled={values.education_checkbox}
          setValues={setValues}
        />
        <PeriodInput
          namePeriod="education_period_checkbox"
          year={['year_education_start', 'year_education_end']}
          monthPeriod={[]}
          education
          labelOne="Год поступления"
          labelTwo="Год окончания"
          i="1"
          tillPresent
          handleCheckboxChange={handleCheckboxChange}
          values={values}
          setValues={setValues}
          handleChange={handleChangeWithValidation}
          disabled={values.education_checkbox}
        />
        <FormInput
          values={values}
          handleChange={handleChangeWithValidation}
          name="university_specialization"
          label="Специальность"
          disabled={values.education_checkbox}
          setValues={setValues}
        />
        <FormInput
          values={values}
          handleChange={handleChangeWithValidation}
          name="education_level"
          label="Степень"
          disabled={values.education_checkbox}
          setValues={setValues}
        />
        {values.educations.map(education => (
          <AddedEducation
            values={education}
            deleteEducation={deleteEducation}
            addEducation={addEducation}
            i={education.id}
            key={education.id}
            handleChange={handleAddEducationChange}
            handleCheckboxChange={handleAddEducationCheckboxChange}
            setValues={setValues}
            allValues={values}
            disabled={values.education_checkbox}
          />
        ))}
        {noAddedEducation && values.educations?.length === 0 && (
          <AddButton
            handleClick={addEducation}
            disabled={values.education_checkbox}
          />
        )}
      </div>
    </section>
  )
}

Education.propTypes = {
  setValues: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  checkboxValues: PropTypes.shape({
    checkbox: PropTypes.bool,
  }),
  allTillPresent: PropTypes.shape({
    value: PropTypes.bool,
  }),
  handleChangeWithValidation: PropTypes.func.isRequired,
  handleAddEducationChange: PropTypes.func.isRequired,
  handleAddEducationCheckboxChange: PropTypes.func.isRequired,
}

Education.defaultProps = {
  checkboxValues: {},
  allTillPresent: {},
}

export default Education
