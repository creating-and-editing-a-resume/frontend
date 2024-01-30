import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'
import IMask from 'imask'
import classNames from 'classnames'
import Header from '../Header/Header'
import ImageUpload from './ImageUpload/ImageUpload'
import Cv from './Cv/Cv'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import PopupCopyLink from '../Popups/PopupCopyLink/PopupCopyLink'
import {
  validationName,
  validationSurname,
  validationBirthday,
  validationCity,
  validationPassword,
  validationEmail,
  validationPhone,
  deleteNonLatin,
} from '../../constants/validation'
import { CurrentArrValuesContext } from '../../contexts/ArrValuesContext'

function Profile({
  setIsLoggedIn,
  isEditMod,
  setCurrentResume,
  isLoggedIn,
  deletePopupSetState,
  setCurrentUser,
  imageProfile,
  setImageProfile,
  setArrValues,
  setIsEditMod,
  setValues,
  setIsResumeNamePopupOpen,
  clearData,
}) {
  const nextPage = '/*'
  const [isProfileData, setIsProfileData] = useState(true)
  const [isContacts, setIsContacts] = useState(false)
  const [popupCopyLink, setPopupCopyLink] = useState(false)
  const [popupCopyLinkText, setPopupCopyLinkText] = useState('')
  const currentUser = useContext(CurrentUserContext)
  const arrValues = useContext(CurrentArrValuesContext)

  // Объект, который содержит текст ошибки во вкладке "профиль"
  const [errorsUserInfo, setErrorsUserInfo] = useState({
    name: '',
    city: '',
    surname: '',
    birthday: '',
    newPassword: '',
    passwordConfirmation: '',
    previousPassword: '',
  })
  // Объект, который содержит текст ошибки во вкладке "контакты"
  const [errorsUserContacts, setErrorsUserContacts] = useState({
    email: '',
    phone: '',
  })
  // Объект с булевыми значениями о прохождении валидации полей во вкладке "профиль"
  const [isValidUserInfo, setIsValidUserInfo] = useState({
    name: false,
    city: false,
    imageProfile: false,
    surname: false,
    birthday: false,
  })
  // Объект с булевыми значениями о прохождении валидации полей во вкладке "контакты"
  const [isValidUserContacts, setIsValidUserContacts] = useState({
    email: false,
    phone: false,
    telegram: false,
  })

  // Объект с булевыми значениями о прохождении валидации полей с паролем вкладки "профиль"
  const [isValidPasswords, setIsValidPasswords] = useState({
    newPassword: false,
    passwordConfirmation: false,
    previousPassword: false,
  })

  // Переменная, которая отвечает за разблокировку кнопки сохранения изменений во вкладке "профиль"
  const [isValidUserInfoData, setIsValidUserInfoData] = useState(false)

  // Переменная, которая отвечает за разблокировку кнопки сохранения изменений во вкладке "контакты"
  const [isValidUserContactsData, setIsValidUserContactsData] = useState(false)

  // Открытие/закрытие дополнительных полей со сменой пароля
  const [isEditPassword, setIsEditPassword] = useState(false)
  const handleCheckboxChange = evt => {
    setIsEditPassword(!isEditPassword)

    if (evt.target.checked) {
      setCurrentUser({
        ...currentUser,
        previousPassword: '',
        passwordConfirmation: '',
        newPassword: '',
      })
    }
  }

  // Захардкоженный пароль
  // TODO: внести его в объект currentUser
  const currentPassword = 'qwerty'

  // useEffect меняет состояние переменной isValidUserInfoData
  useEffect(() => {
    const arrFields = Object.keys(isValidUserInfo).map(
      key => isValidUserInfo[key]
    )
    const allErrorsEmpty = Object.keys(errorsUserInfo).every(
      key => errorsUserInfo[key] === ''
    )
    const allPasswordsValid = Object.keys(isValidPasswords).every(
      key => isValidPasswords[key] === true
    )
    if (!isEditPassword) {
      if (arrFields.includes(true) && allErrorsEmpty) {
        setIsValidUserInfoData(true)
      } else {
        setIsValidUserInfoData(false)
      }
    }

    if (isEditPassword) {
      if (allErrorsEmpty && allPasswordsValid) {
        setIsValidUserInfoData(true)
      } else {
        setIsValidUserInfoData(false)
      }
    }
  }, [
    isValidUserInfo,
    currentUser,
    isEditPassword,
    isValidPasswords,
    errorsUserInfo,
  ])

  // useEffect меняет состояние переменной isValidUserContactsData
  useEffect(() => {
    const arrFields = Object.keys(isValidUserContacts).map(
      key => isValidUserContacts[key]
    )
    const allErrorsEmpty = Object.keys(errorsUserContacts).every(
      key => errorsUserContacts[key] === ''
    )
    if (isContacts) {
      if (arrFields.includes(true) && allErrorsEmpty) {
        setIsValidUserContactsData(true)
      } else {
        setIsValidUserContactsData(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidUserContacts, errorsUserContacts, currentUser])

  // Функция, которая собирает и валидирует поля с данными пользователя во вкладке "профиль"
  function handleChangeUserData(evt) {
    const { name, value } = evt.target
    if (name === 'name') {
      validationName(
        value,
        isValidUserInfo,
        setIsValidUserInfo,
        setErrorsUserInfo,
        errorsUserInfo
      )
    }

    if (name === 'surname') {
      validationSurname(
        value,
        isValidUserInfo,
        setIsValidUserInfo,
        setErrorsUserInfo,
        errorsUserInfo
      )
    }

    if (name === 'birthday') {
      validationBirthday(
        value,
        isValidUserInfo,
        setIsValidUserInfo,
        setErrorsUserInfo,
        errorsUserInfo
      )
    }

    if (name === 'city') {
      validationCity(
        value,
        isValidUserInfo,
        setIsValidUserInfo,
        setErrorsUserInfo,
        errorsUserInfo
      )
    }
    setCurrentUser({ ...currentUser, [name]: value })
  }

  // Функция, которая накладывает маску на поле телеграм и собирает данные
  function checkTgInput(name, value) {
    const cleanValue = deleteNonLatin(value)
    if (cleanValue === '') {
      setCurrentUser({ ...currentUser, [name]: '' })
    } else if (cleanValue === 'https://t.me/') {
      setCurrentUser({ ...currentUser, [name]: '' })
    } else if (cleanValue.includes('https://t.me/')) {
      setCurrentUser({ ...currentUser, [name]: cleanValue })
    } else {
      setCurrentUser({
        ...currentUser,
        [name]: `https://t.me/${cleanValue}`,
      })
    }
  }

  // Функция, которая собирает и валидирует поля с данными пользователя во вкладке "контакты"
  function handleChangeUserContacts(evt) {
    const { name, value } = evt.target

    if (name === 'email') {
      validationEmail(
        value,
        setIsValidUserContacts,
        isValidUserContacts,
        setErrorsUserContacts,
        errorsUserContacts
      )
      setCurrentUser(prevValues => ({ ...prevValues, [name]: value }))
    }

    if (name === 'phone') {
      validationPhone(
        value,
        setIsValidUserContacts,
        isValidUserContacts,
        setErrorsUserContacts,
        errorsUserContacts
      )
      setCurrentUser(prevValues => ({ ...prevValues, [name]: value }))
    }

    if (name === 'telegram') {
      checkTgInput(name, value)
      setIsValidUserContacts({ ...isValidUserContacts, telegram: true })
    }
  }

  // Функция, которая собирает и валидирует поля с подтверждением пароля во вкладке "профиль"
  const handleChangePassword = evt => {
    const { name, value } = evt.target
    validationPassword(
      name,
      value,
      setErrorsUserInfo,
      errorsUserInfo,
      currentUser,
      setIsValidPasswords,
      isValidPasswords,
      currentPassword
    )
    setCurrentUser({ ...currentUser, [name]: value })
  }

  // useEffect подтягивает изменённую фотку пользователя в реальном времени
  useEffect(() => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      imageProfile,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageProfile])

  // Функция сохраняет данные пользователя в локальное хранилище из вкладки "профиль"
  const handleClickUserData = () => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      imageProfile,
    }))
    localStorage.setItem('user', JSON.stringify(currentUser))
    localStorage.setItem('imageProfile', imageProfile)
    setIsValidUserInfo({
      name: false,
      city: false,
      imageProfile: false,
      surname: false,
      birthday: false,
    })
    setIsValidPasswords({
      newPassword: false,
      passwordConfirmation: false,
      previousPassword: false,
    })
    setIsValidUserInfoData(false)
    setPopupCopyLink(true)
    setPopupCopyLinkText('Данные сохранены')
    setTimeout(() => {
      setPopupCopyLink(false)
    }, 2500)
  }

  // Функция сохраняет данные пользователя в локальное хранилище из вкладки "контакты"
  const handleClickUserContacts = () => {
    localStorage.setItem('user', JSON.stringify(currentUser))
    setIsValidUserContactsData(false)
    setIsValidUserContacts({ email: false, phone: false, telegram: false })
    setPopupCopyLink(true)
    setPopupCopyLinkText('Данные сохранены')
    setTimeout(() => {
      setPopupCopyLink(false)
    }, 2500)
  }

  // Маски для полей:
  const maskInput = (dataValue, options) => {
    const inputElements = document.querySelectorAll(`[mask="${dataValue}"]`) // ищем поля ввода по селектору с переданным значением data-атрибута
    if (!inputElements) return // если таких полей ввода нет, прерываем функцию
    inputElements.forEach(el => {
      // для каждого из полей ввода
      IMask(el, options) // инициализируем плагин imask для необходимых полей ввода с переданными параметрами маски
    })
  }
  const maskOptionsPhone = {
    mask: '+{7}(000)000-00-00',
  }

  useEffect(() => {
    maskInput('phone', maskOptionsPhone)
  })

  const maskOptionsDate = {
    mask: Date,
    min: new Date(1900, 0, 1),
  }
  useEffect(() => {
    maskInput('date', maskOptionsDate)
  })

  // Переключение вкладок
  const openProfileData = () => {
    setIsContacts(false)
    setIsProfileData(true)
  }
  const openContacts = () => {
    setIsProfileData(false)
    setIsContacts(true)
  }

  return (
    <>
      <Header
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
        nextPage={nextPage}
        setIsEditMod={setIsEditMod}
        clearData={clearData}
      />
      <main className="profile">
        <h1 className="profile__title">Личный кабинет</h1>
        <div className="profile__page-layout">
          <div className="profile__personal-data">
            <div className="profile__menu-buttons">
              <button
                className={classNames(
                  'profile__menu-button',
                  isProfileData && 'profile__menu-button_active'
                )}
                type="button"
                onClick={openProfileData}
              >
                Профиль
              </button>
              <button
                className={classNames(
                  'profile__menu-button',
                  isContacts && 'profile__menu-button_active'
                )}
                type="button"
                onClick={openContacts}
              >
                Контакты
              </button>
            </div>
            <div className="profile__personal-data-container">
              {isProfileData && (
                <>
                  <div className="profile__photo">
                    <ImageUpload
                      image={imageProfile}
                      currentImage={currentUser.imageProfile}
                      setImage={setImageProfile}
                      name="image_profile"
                      setIsValidUserInfo={setIsValidUserInfo}
                    />
                  </div>
                  <div className="profile__personal-data-form">
                    <label htmlFor="name" className="profile__input-label">
                      Имя
                      <input
                        name="name"
                        type="text"
                        id="name"
                        value={currentUser.name || ''}
                        className="profile__input"
                        onChange={handleChangeUserData}
                      />
                      <span className="profile__input-error">
                        {errorsUserInfo.name}
                      </span>
                    </label>

                    <label htmlFor="surname" className="profile__input-label">
                      Фамилия
                      <input
                        name="surname"
                        type="text"
                        id="surname"
                        className="profile__input"
                        value={currentUser.surname || ''}
                        onChange={handleChangeUserData}
                      />
                      <span className="profile__input-error">
                        {errorsUserInfo.surname}
                      </span>
                    </label>
                    <div className="profile__input-label">
                      <div className="profile__double-input-container">
                        <label
                          htmlFor="birthday"
                          className="profile__input-label profile__input-label_double-short"
                        >
                          Дата рождения
                          <input
                            name="birthday"
                            type="text"
                            id="birthday"
                            className="profile__input"
                            placeholder="ДД.ММ.ГГГГ"
                            value={currentUser.birthday || ''}
                            onChange={handleChangeUserData}
                            mask="date"
                          />
                          <span className="profile__input-error">
                            {errorsUserInfo.birthday}
                          </span>
                        </label>
                        <label
                          htmlFor="city"
                          className="profile__input-label profile__input-label_double-long"
                        >
                          Город
                          <input
                            name="city"
                            type="text"
                            id="city"
                            className="profile__input"
                            value={currentUser.city || ''}
                            onChange={handleChangeUserData}
                          />
                          <span className="profile__input-error">
                            {errorsUserInfo.city}
                          </span>
                        </label>
                      </div>
                    </div>
                    <label htmlFor="password" className="profile__input-label">
                      Пароль
                      <input
                        name="password"
                        type="password"
                        id="password"
                        className="profile__input"
                        value={currentPassword || ''}
                        readOnly
                        disabled={isEditPassword}
                      />
                      <div className="profile__checkbox-container">
                        <label
                          className="profile__checkbox-label"
                          htmlFor="password-checkbox"
                        >
                          <input
                            name="password-checkbox"
                            type="checkbox"
                            id="password-checkbox"
                            className="profile__checkbox-input"
                            onChange={handleCheckboxChange}
                          />
                          <span className="profile__checkbox-text">
                            Сменить пароль
                          </span>
                        </label>
                      </div>
                    </label>
                    {isEditPassword && (
                      <form
                        className="profile__change-password-form"
                        name="change-password"
                        noValidate
                      >
                        <label
                          htmlFor="previousPassword"
                          className="profile__input-label"
                        >
                          Введите старый пароль
                          <input
                            name="previousPassword"
                            type="password"
                            id="previousPassword"
                            className="profile__input"
                            value={currentUser.previousPassword || ''}
                            onChange={handleChangePassword}
                            required
                          />
                          <span className="profile__input-error">
                            {errorsUserInfo.previousPassword}
                          </span>
                        </label>
                        <label
                          htmlFor="newPassword"
                          className="profile__input-label"
                        >
                          Введите новый пароль
                          <input
                            name="newPassword"
                            type="password"
                            id="newPassword"
                            className="profile__input"
                            value={currentUser.newPassword || ''}
                            onChange={handleChangePassword}
                            required
                          />
                          <span className="profile__input-error">
                            {errorsUserInfo.newPassword}
                          </span>
                        </label>
                        <label
                          htmlFor="passwordConfirmation"
                          className="profile__input-label"
                        >
                          Подтвердите пароль
                          <input
                            name="passwordConfirmation"
                            type="password"
                            id="passwordConfirmation"
                            className="profile__input"
                            value={currentUser.passwordConfirmation || ''}
                            required
                            onChange={handleChangePassword}
                          />
                          <span className="profile__input-error">
                            {errorsUserInfo.passwordConfirmation}
                          </span>
                        </label>
                      </form>
                    )}
                    <button
                      className="profile__save-button link"
                      type="button"
                      disabled={!isValidUserInfoData}
                      onClick={handleClickUserData}
                    >
                      Сохранить изменения
                    </button>
                  </div>
                </>
              )}
              {isContacts && (
                <div className="profile__contacts-form">
                  <label htmlFor="email" className="profile__input-label">
                    Почта
                    <input
                      name="email"
                      type="text"
                      id="email"
                      className="profile__input"
                      value={currentUser.email || ''}
                      onChange={handleChangeUserContacts}
                    />
                    <span className="profile__input-error">
                      {errorsUserContacts.email}
                    </span>
                  </label>
                  <div className="profile__double-input-container profile__double-input-container_contacts">
                    <label htmlFor="phone" className="profile__input-label">
                      Телефон
                      <input
                        name="phone"
                        type="text"
                        id="phone"
                        className="profile__input"
                        value={currentUser.phone || ''}
                        onChange={handleChangeUserContacts}
                        mask="phone"
                      />
                      <span className="profile__input-error">
                        {errorsUserContacts.phone}
                      </span>
                    </label>
                    <label htmlFor="telegram" className="profile__input-label">
                      Telegram
                      <input
                        name="telegram"
                        type="text"
                        id="telegram"
                        className="profile__input"
                        value={currentUser.telegram || ''}
                        onChange={handleChangeUserContacts}
                        mask="tgLink"
                      />
                      <span className="profile__input-error">
                        {errorsUserContacts.telegram}
                      </span>
                    </label>
                  </div>
                  <button
                    className="profile__save-button link"
                    type="button"
                    onClick={handleClickUserContacts}
                    disabled={!isValidUserContactsData}
                  >
                    Сохранить изменения
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="profile__saved-resumes">
            <h2 className="profile__saved-resumes-title">Сохраненные резюме</h2>
            <div className="profile__cvs-container">
              {arrValues.map(cv => (
                <Cv
                  isEditMod={isEditMod}
                  setCurrentResume={setCurrentResume}
                  setArrValues={setArrValues}
                  key={cv.id}
                  cv={cv}
                  deletePopupSetState={deletePopupSetState}
                  setIsEditMod={setIsEditMod}
                  setValues={setValues}
                  setIsResumeNamePopupOpen={setIsResumeNamePopupOpen}
                  setPopupCopyLink={setPopupCopyLink}
                  setPopupCopyLinkText={setPopupCopyLinkText}
                />
              ))}
            </div>
          </div>
        </div>
        <PopupCopyLink popupCopyLink={popupCopyLink} text={popupCopyLinkText} />
      </main>
    </>
  )
}

Profile.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  isEditMod: PropTypes.bool.isRequired,
  setValues: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  deletePopupSetState: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  imageProfile: PropTypes.string,
  setImageProfile: PropTypes.func.isRequired,
  setArrValues: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func.isRequired,
  setIsEditMod: PropTypes.func,
  setIsResumeNamePopupOpen: PropTypes.func.isRequired,
  clearData: PropTypes.func.isRequired,
}

Profile.defaultProps = {
  imageProfile: '',
  setIsEditMod: () => {},
}

export default Profile
