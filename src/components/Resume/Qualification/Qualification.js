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
import { CurrentValuesContext } from '../../../contexts/ValuesContext'

const Qualification = ({
  handleCheckboxChange,
  handleChangeWithValidation,
  setValues,
  handleAddQualificationChange,
  setQualifications,
}) => {
  // Если появилась добавленная квалификация, основная кнопка "Добавить" удаляется
  const [noAddedQualification, setNoAddedQualification] = useState(true)
  const values = React.useContext(CurrentValuesContext)

  const handleTitleCheckboxClick = () => {
    setValues(prevValues => ({
      ...prevValues,
      qualifications: [],
      qualification_checkbox: !prevValues.qualification_checkbox,
    }))
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
    <section className="qualification">
      <ResumeTitle
        title="Повышение квалификации"
        checkbox
        checkboxText="Отсутствует"
        checkboxId="title-qualification-checkbox"
        onClick={handleTitleCheckboxClick}
        handleCheckboxChange={handleCheckboxChange}
        name="qualification_checkbox"
        values={values}
        handleBackToBasicRecommend={handleBackToBasicRecommend}
      />
      <div className="qualification__form-container">
        <div
          className="qualification__basic-recommend qualification__basic-recommend_top"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            name="organization"
            values={values}
            label="Проводившая организация"
            disabled={values.qualification_checkbox}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
          <FormInput
            name="course_name"
            values={values}
            label="Название курса"
            disabled={values.qualification_checkbox}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
          <FormInput
            name="work_specialization"
            values={values}
            label="Специальность"
            disabled={values.qualification_checkbox}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
          <PeriodInput
            monthPeriod={['month_qual_start', 'month_qual_end']}
            year={['year_qual_start', 'year_qual_end']}
            labelOne="Дата начала"
            labelTwo="Дата окончания"
            month
            disabled={values.qualification_checkbox}
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
            disabled={values.qualification_checkbox}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
        </div>
        <FormInput
          label="Навыки"
          name="skills"
          values={values}
          extraInputClass="qualification-skills"
          disabled={values.qualification_checkbox}
          handleChange={handleChangeWithValidation}
          setQualifications={setQualifications}
          setValues={setValues}
        />
        <div
          className="qualification__basic-recommend qualification__basic-recommend_bottom"
          onClick={handleBackToBasicRecommend}
          onKeyDown={handleBackToBasicRecommend}
          onFocus={handleBackToBasicRecommend}
        >
          <FormInput
            name="diploma_link"
            values={values}
            label="Ссылка на дипломную работу"
            disabled={values.qualification_checkbox}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
          />
        </div>
        {values.qualifications.map(qualification => (
          <AddedQualification
            values={qualification}
            disabled={values.qualification_checkbox}
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
            disabled={values.qualification_checkbox}
            handleClick={addQualification}
          />
        )}
      </div>
    </section>
  )
}

Qualification.propTypes = {
  handleCheckboxChange: PropTypes.func.isRequired,
  handleChangeWithValidation: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  handleAddQualificationChange: PropTypes.func.isRequired,
  setQualifications: PropTypes.func,
}

Qualification.defaultProps = {
  setQualifications: () => {},
}

export default Qualification
