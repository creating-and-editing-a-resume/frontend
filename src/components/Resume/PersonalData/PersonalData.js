import './PersonalData.scss'
import React from 'react'
import PropTypes from 'prop-types'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import DoubleInput from '../ResumeComponents/DoubleInput/DoubleInput'
import {
  CAREER_OBJECTIVE_TIP,
  ACTUAL_STATUS_TIP,
  EMAIL_TIP,
  PHOTO_TIP,
  SITE_LINK_TIP,
} from '../../../constants/tips'
import {
  ACTUAL_STATUS_OPTIONS,
  LEVEL_OPTIONS,
  LANGUAGE_OPTIONS,
  LANGUAGE_LEVEL_OPTIONS,
} from '../../../constants/input-options'
import FormInput from '../ResumeComponents/FormInput/FormInput'
import LanguageInput from '../ResumeComponents/LanguageInput/LanguageInput'
import ImageUploadForm from './ImageUploadForm/ImageUploadForm'
import LinkInput from '../ResumeComponents/LinkInput/LinkInput'
import { CurrentValuesContext } from '../../../contexts/ValuesContext'

const PersonalData = ({
  setValues,
  addLanguage,
  addLink,
  setLinksAfterDeleting,
  setLanguagesAfterDeleting,
  setLanguagesChanges,
  errors,
  handleChangeWithValidation,
  setImage,
  image,
}) => {
  const values = React.useContext(CurrentValuesContext)
  const deleteLanguage = i => {
    const languageToBeRemoved = values.languages.find(item => item.id === i)
    const remainingLanguages = values.languages.filter(
      item => item.id !== languageToBeRemoved.id
    )
    setLanguagesAfterDeleting(remainingLanguages)
    return remainingLanguages
  }

  const deleteLink = i => {
    const linkToBeRemoved = values.links.find(item => item.id === i)
    const remainingLinks = values.links.filter(
      item => item.id !== linkToBeRemoved.id
    )
    setLinksAfterDeleting(remainingLinks)
    return remainingLinks
  }

  const handleLanguageChange = ({ i, name, value }) => {
    const languageToBeChanged = values.languages.find(item => item.id === i)
    const indexToReplace = values.languages.findIndex(item => item.id === i)
    const copy = { ...languageToBeChanged }
    if (name.slice(0, 14) === 'language_level') {
      copy.level = value
    } else {
      copy.language = value
    }
    const newLanguages = [...values.languages]
    newLanguages[indexToReplace] = copy
    setLanguagesChanges(newLanguages)
  }

  const handleLinkChange = ({ i, name, value }) => {
    const linkToBeChanged = values.links.find(item => item.id === i)
    const indexToReplace = values.links.findIndex(item => item.id === i)
    const copy = { ...linkToBeChanged }
    if (name.slice(0, 9) === 'link_name') {
      copy.link_name = value
    } else {
      copy.link = value
    }
    const newLinks = [...values.links]
    newLinks[indexToReplace] = copy
    setValues({ ...values, links: newLinks })
  }

  return (
    <section className="personal-data">
      <div className="personal-data__container">
        <ResumeTitle title="Персональные данные" />
        <div className="personal-data__form">
          <div className="personal-data__form-container">
            <div className="personal-data__form_left">
              <FormInput
                values={values}
                handleChange={handleChangeWithValidation}
                setValues={setValues}
                name="name"
                label="Имя"
                errors={errors}
              />
              <FormInput
                values={values}
                handleChange={handleChangeWithValidation}
                setValues={setValues}
                name="surname"
                label="Фамилия"
                errors={errors}
              />
              <FormInput
                values={values}
                handleChange={handleChangeWithValidation}
                setValues={setValues}
                name="birthday"
                label="Дата рождения"
                placeholder="ДД.ММ.ГГГГ"
                dataMask="date"
                errors={errors}
              />
            </div>
            <div className="personal-data__form_right">
              <ImageUploadForm
                name="photo"
                label="Фото"
                imageValues={values.img}
                tip
                tipText={PHOTO_TIP}
                setImage={setImage}
                image={image}
              />
            </div>
          </div>
          <DoubleInput
            setValues={setValues}
            handleChange={handleChangeWithValidation}
            values={values}
            name={['city', 'work_status']}
            doubleLongInput
            firstLabel="Город проживания"
            secondLabel="Актуальный статус"
            doubleInput
            ordinaryInputFirst
            selectedInputSecond
            optionsInputSecond={ACTUAL_STATUS_OPTIONS}
            tipSecond
            tipTextSecond={ACTUAL_STATUS_TIP}
            errors={errors}
          />
          <DoubleInput
            setValues={setValues}
            handleChange={handleChangeWithValidation}
            values={values}
            name={['desired_position', 'level_knowledge']}
            doubleLongInput
            firstLabel="Желаемая должность"
            secondLabel="Уровень"
            doubleInput
            ordinaryInputFirst
            selectedInputSecond
            optionsInputSecond={LEVEL_OPTIONS}
            tipFirst
            tipTextFirst={CAREER_OBJECTIVE_TIP}
            errors={errors}
          />
        </div>
        <ResumeTitle title="Контакты" />
        <div className="personal-data__form personal-data__form_bottom">
          <FormInput
            values={values}
            handleChange={handleChangeWithValidation}
            setValues={setValues}
            name="email"
            label="Почта"
            tip
            tipText={EMAIL_TIP}
            errors={errors}
          />
          <DoubleInput
            handleChange={handleChangeWithValidation}
            values={values}
            setValues={setValues}
            name={['phone', 'telegram']}
            doubleShortInput
            firstLabel="Телефон"
            secondLabel="Telegram"
            placeholderFirst="+7"
            placeholderSecond="t.me/name"
            dataMaskFirst="phone"
            dataMaskSecond="tgLink"
            errors={errors}
          />
          {values.links?.map(link => (
            <LinkInput
              key={link.id}
              i={link.id}
              values={link}
              addLink={addLink}
              deleteLink={deleteLink}
              firstLabel="Название ссылки"
              secondLabel="Ссылка"
              tipFirst
              tipTextFirst={SITE_LINK_TIP}
              handleLinkChange={handleLinkChange}
            />
          ))}
        </div>
        <ResumeTitle title="Владение языками" />
        {values.languages.map(lang => (
          <div className="personal-data__form-language" key={lang.id}>
            <LanguageInput
              values={lang}
              handleLanguageChange={handleLanguageChange}
              setValues={setValues}
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

PersonalData.propTypes = {
  setValues: PropTypes.func.isRequired,
  addLanguage: PropTypes.func.isRequired,
  addLink: PropTypes.func.isRequired,
  setLanguagesAfterDeleting: PropTypes.func.isRequired,
  setLinksAfterDeleting: PropTypes.func.isRequired,
  setLanguagesChanges: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string),
  handleChangeWithValidation: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  image: PropTypes.string,
}

PersonalData.defaultProps = {
  errors: {},
  image: undefined,
}

export default PersonalData
