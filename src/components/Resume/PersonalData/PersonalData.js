import './PersonalData.scss'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
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

const PersonalData = () => {
  const [languages, setLanguages] = useState([{ id: uuidv4() }])

  const addLanguage = () => {
    setLanguages([...languages, { id: uuidv4() }])
  }

  const deleteLanguage = langId => {
    if (languages.length === 1) {
      setLanguages([{ id: uuidv4() }])
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
          <DoubleInput firstLabel="Имя" ordinaryInputFirst />
          <DoubleInput firstLabel="Фамилия" ordinaryInputFirst />
          <DoubleInput
            firstLabel="Дата рождения"
            placeholder="ДД.ММ.ГГ"
            ordinaryInputFirst
          />
          <DoubleInput
            firstLabel="Город проживания"
            secondLabel="Актуальный статус"
            doubleInput
            ordinaryInputFirst
            selectedInputSecond
            optionsInputSecond={ACTUAL_STATUS_OPTIONS}
            tip
            tipText={ACTUAL_STATUS_TIP}
          />
          <DoubleInput
            firstLabel="Желаемая должность"
            secondLabel="Уровень"
            doubleInput
            ordinaryInputFirst
            selectedInputSecond
            optionsInputSecond={LEVEL_OPTIONS}
            tip
            tipText={CAREER_OBJECTIVE_TIP}
          />
        </div>
        <ResumeTitle title="Контакты" />
        <div className="personal-data__form">
          <FormInput label="Почта" tip tipText={EMAIL_TIP} />
          <DoubleInput
            firstLabel="Телефон"
            secondLabel="Ссылка на Behance"
            doubleInput
            ordinaryInputFirst
            ordinaryInputSecond
          />
          <DoubleInput
            firstLabel="Телеграм"
            secondLabel="Ссылка на GitHub"
            doubleInput
            ordinaryInputFirst
            ordinaryInputSecond
          />
          <DoubleInput
            firstLabel="Ссылка на другой сайт"
            secondLabel="Ссылка на видео о себе"
            doubleInput
            ordinaryInputFirst
            ordinaryInputSecond
            tip
            tipText={OTHER__SITE_LINK_TIP}
          />
        </div>
        <ResumeTitle title="Владение языками" />
        {languages.map(lang => (
          <div className="personal-data__language-form" key={lang.id}>
            <LanguageInput
              firstLabel="Язык"
              secondLabel="Уровень"
              optionsInputFirst={LANGUAGE_OPTIONS}
              optionsInputSecond={LANGUAGE_LEVEL_OPTIONS}
              key={lang.id}
              i={lang.id}
              addLanguage={addLanguage}
              deleteLanguage={deleteLanguage}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default PersonalData
