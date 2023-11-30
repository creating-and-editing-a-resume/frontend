/* eslint-disable react/prop-types */
import './PersonalData.scss'
import React, { useState } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import DoubleInput from '../ResumeComponents/DoubleInput/DoubleInput'
import {
  CAREER_OBJECTIVE_TIP,
  ACTUAL_STATUS_TIP,
  EMAIL_TIP,
  OTHER__SITE_LINK_TIP,
} from '../../../constants/tips'
import {
  ACTUAL_STATUS_OPTIONS,
  LEVEL_OPTIONS,
  LANGUAGE_OPTIONS,
  LANGUAGE_LEVEL_OPTIONS,
} from '../../../constants/input-options'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import LanguageInput from '../ResumeComponents/LanguageInput/LanguageInput'

const PersonalData = ({ values, handleChange, setValues }) => {
  const [number, setNumber] = useState(1)
  const [languages, setLanguages] = useState([{ id: number }])
  console.log(number)

  const addLanguage = () => {
    setNumber(number + 1)
    setLanguages([...languages, { id: number }])
  }

  const deleteLanguage = langId => {
    if (languages.length === 1) {
      setNumber(prevValue => prevValue + 1)
      setLanguages([{ id: number }])
    } else {
      const languageToBeRemoved = languages.find(m => langId === m.id)
      setLanguages(languages.filter(item => item.id !== languageToBeRemoved.id))
    }
  }

  return (
    <section className="personal-data">
      <div className="personal-data__container">
        <ResumeTitle title="Персональные данные" />
        <div className="personal-data__form">
          <DoubleInput
            values={values}
            handleChange={handleChange}
            setValues={setValues}
            name={['name']}
            firstLabel="Имя"
            ordinaryInputFirst
          />
          <DoubleInput
            values={values}
            handleChange={handleChange}
            setValues={setValues}
            name={['surname']}
            firstLabel="Фамилия"
            ordinaryInputFirst
          />
          <DoubleInput
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            name={['birthday']}
            firstLabel="Дата рождения"
            placeholder="ДД.ММ.ГГ"
            ordinaryInputFirst
          />
          <DoubleInput
            setValues={setValues}
            handleChange={handleChange}
            values={values}
            name={['city', 'work_status']}
            firstLabel="Город проживания"
            secondLabel="Актуальный статус"
            doubleInput
            ordinaryInputFirst
            selectedInputSecond
            optionsInputSecond={ACTUAL_STATUS_OPTIONS}
            tipSecond
            tipTextSecond={ACTUAL_STATUS_TIP}
          />
          <DoubleInput
            setValues={setValues}
            handleChange={handleChange}
            values={values}
            name={['desired_position', 'level_knowledge']}
            firstLabel="Желаемая должность"
            secondLabel="Уровень"
            doubleInput
            ordinaryInputFirst
            selectedInputSecond
            optionsInputSecond={LEVEL_OPTIONS}
            tipFirst
            tipTextFirst={CAREER_OBJECTIVE_TIP}
          />
        </div>
        <ResumeTitle title="Контакты" />
        <div className="personal-data__form">
          <FormInput
            values={values}
            handleChange={handleChange}
            setValues={setValues}
            name={['email']}
            label="Почта"
            tip
            tipText={EMAIL_TIP}
          />
          <DoubleInput
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            name={['phone', 'behance']}
            firstLabel="Телефон"
            secondLabel="Ссылка на Behance"
            doubleInput
            ordinaryInputFirst
            ordinaryInputSecond
          />
          <DoubleInput
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            name={['telegram', 'githab']}
            firstLabel="Телеграм"
            secondLabel="Ссылка на GitHub"
            doubleInput
            ordinaryInputFirst
            ordinaryInputSecond
          />
          <DoubleInput
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            name={['website_link', 'video_link']}
            firstLabel="Ссылка на другой сайт"
            secondLabel="Ссылка на видео о себе"
            doubleInput
            ordinaryInputFirst
            ordinaryInputSecond
            tipFirst
            tipTextFirst={OTHER__SITE_LINK_TIP}
          />
        </div>
        <ResumeTitle title="Владение языками" />
        {languages.map(lang => (
          <div className="personal-data__language-form" key={lang.id}>
            <LanguageInput
              values={values}
              handleChange={handleChange}
              setValues={setValues}
              firstLabel="Язык"
              secondLabel="Уровень"
              optionsInputFirst={LANGUAGE_OPTIONS}
              optionsInputSecond={LANGUAGE_LEVEL_OPTIONS}
              key={lang.id}
              i={lang.id}
              addLanguage={addLanguage}
              deleteLanguage={deleteLanguage}
              number={number}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default PersonalData
