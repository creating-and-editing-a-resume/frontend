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

function Profile({
  isEditMod,
  setCurrentResume,
  currentResume,
  isLoggedIn,
  deletePopupSetState,
  errors,
  setCurrentUser,
  imageProfile,
  setImageProfile,
  arrValues,
  setArrValues,
  setIsEditMod,
  values,
  setValues,
  setIsResumeNamePopupOpen,
  setImage,
  setHasQualification,
  setHasExperience,
  setAllTillPresent,
}) {
  const nextPage = '/*'
  const [isProfileData, setIsProfileData] = useState(true)
  const [isContacts, setIsContacts] = useState(false)
  const [popupCopyLink, setPopupCopyLink] = useState(false)
  const currentUser = useContext(CurrentUserContext)

  // ОТКРЫТИЕ ДОПОЛНИТЕЛЬНЫХ ПОЛЕЙ ДЛЯ СМЕНЫ ПАРОЛЯ
  const [isEditPassword, setIsEditPassword] = useState(false)
  const handleCheckboxChange = () => {
    setIsEditPassword(!isEditPassword)
  }

  // ЛОГИКА СМЕНЫ ПАРОЛЯ
  const [passwordErrors, setPasswordErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  const currentPassword = 'qwerty'

  function handleChange(evt) {
    const { name, value } = evt.target
    if (isEditPassword) {
      if (name === 'previousPassword') {
        setCurrentUser({ ...currentUser, [name]: value })
        setIsValid(evt.target.closest('form').checkValidity())
        if (evt.target.value.length < 2) {
          setIsValid(false)
          setPasswordErrors({
            ...passwordErrors,
            previousPassword: 'Пароль должен иметь не менее 2 символов',
          })
        } else {
          setPasswordErrors({
            ...passwordErrors,
            [name]: evt.target.validationMessage,
          })
        }
      }

      if (name === 'confirmPassword') {
        setIsValid(evt.target.closest('form').checkValidity())
        if (evt.target.value.length < 1) {
          setIsValid(false)
          setPasswordErrors({
            ...passwordErrors,
            passwordConfirmation: 'Необходимо повторно ввести пароль',
          })
        } else {
          setCurrentUser({ ...currentUser, [name]: value })
        }
      }

      if (name === 'newPassword') {
        setCurrentUser({ ...currentUser, [name]: value })
        setIsValid(evt.target.closest('form').checkValidity())
        if (evt.target.value.length < 2) {
          setIsValid(false)
          setPasswordErrors({
            ...passwordErrors,
            newPassword: 'Пароль должен иметь не менее 2 символов',
          })
        } else {
          setPasswordErrors({
            ...passwordErrors,
            [name]: evt.target.validationMessage,
          })
        }
      }
    }

    setCurrentUser({ ...currentUser, [name]: value })
  }

  // useEffect(() => {
  //   setCurrentUser(prevUser => ({
  //     ...prevUser,
  //     imageProfile,
  //   }))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [imageProfile])

  // useEffect(() => {
  //   localStorage.setItem('user', JSON.stringify(currentUser))
  //   localStorage.setItem('imageProfile', imageProfile)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser])

  const handleClick = () => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      imageProfile,
    }))
    localStorage.setItem('user', JSON.stringify(currentUser))
    localStorage.setItem('imageProfile', imageProfile)
  }

  // МАСКИ ДЛЯ ПОЛЕЙ:
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

  // ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК
  const openProfileData = () => {
    setIsContacts(false)
    setIsProfileData(true)
  }
  const openContacts = () => {
    setIsProfileData(false)
    setIsContacts(true)
  }

  const handleChangePasswordSubmit = e => {
    e.preventDefault()
    if (currentUser.newPassword !== currentUser.passwordConfirmation) {
      setIsValid(false)
      setPasswordErrors({
        ...passwordErrors,
        passwordConfirmation: 'Пароли не совпадают',
      })
    } else if (currentUser.previousPassword !== currentPassword) {
      setIsValid(false)
      setPasswordErrors({
        ...passwordErrors,
        passwordConfirmation: 'Старый пароль указан неверно',
      })
    } else {
      setPasswordErrors({
        ...passwordErrors,
        passwordConfirmation: '',
      })
    }
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        nextPage={nextPage}
        setIsEditMod={setIsEditMod}
        setValues={setValues}
        setImage={setImage}
        setHasExperience={setHasExperience}
        setHasQualification={setHasQualification}
        setAllTillPresent={setAllTillPresent}
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
                        onChange={handleChange}
                      />
                      {errors && (
                        <span className="form-input__input-error">
                          {errors.name}
                        </span>
                      )}
                    </label>

                    <label htmlFor="surname" className="profile__input-label">
                      Фамилия
                      <input
                        name="surname"
                        type="text"
                        id="surname"
                        className="profile__input"
                        value={currentUser.surname || ''}
                        onChange={handleChange}
                      />
                      {errors && (
                        <span className="form-input__input-error">
                          {errors.surname}
                        </span>
                      )}
                    </label>
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
                          onChange={handleChange}
                          mask="date"
                        />
                        {errors && (
                          <span className="form-input__input-error">
                            {errors.birthday}
                          </span>
                        )}
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
                          onChange={handleChange}
                        />
                        {errors && (
                          <span className="form-input__input-error">
                            {errors.city}
                          </span>
                        )}
                      </label>
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
                        onSubmit={handleChangePasswordSubmit}
                        noValidate
                      >
                        <label
                          htmlFor="previousPassword"
                          className="profile__input-label"
                        >
                          Введите старый пароль
                          <input
                            name="previousPassword"
                            type="text"
                            id="previousPassword"
                            className="profile__input"
                            value={currentUser.previousPassword || ''}
                            onChange={handleChange}
                            required
                          />
                          {passwordErrors && (
                            <span className="profile__password-error">
                              {passwordErrors.previousPassword}
                            </span>
                          )}
                        </label>
                        <label
                          htmlFor="newPassword"
                          className="profile__input-label"
                        >
                          Введите новый пароль
                          <input
                            name="newPassword"
                            type="text"
                            id="newPassword"
                            className="profile__input"
                            value={currentUser.newPassword || ''}
                            onChange={handleChange}
                            required
                          />
                          {passwordErrors && (
                            <span className="profile__password-error">
                              {passwordErrors.newPassword}
                            </span>
                          )}
                        </label>
                        <label
                          htmlFor="passwordConfirmation"
                          className="profile__input-label"
                        >
                          Подтвердите пароль
                          <input
                            name="passwordConfirmation"
                            type="text"
                            id="passwordConfirmation"
                            className="profile__input"
                            value={currentUser.passwordConfirmation || ''}
                            required
                            onChange={handleChange}
                          />
                          {passwordErrors && (
                            <span className="profile__password-error">
                              {passwordErrors.passwordConfirmation}
                            </span>
                          )}
                        </label>
                      </form>
                    )}
                    <button
                      className="profile__save-button link"
                      type="button"
                      disabled={!isValid}
                      onClick={handleClick}
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
                      onChange={handleChange}
                    />
                    {errors && (
                      <span className="form-input__input-error">
                        {errors.email}
                      </span>
                    )}
                  </label>
                  <div className="profile__double-input-container">
                    <label htmlFor="phone" className="profile__input-label">
                      Телефон
                      <input
                        name="phone"
                        type="text"
                        id="phone"
                        className="profile__input"
                        value={currentUser.phone || ''}
                        onChange={handleChange}
                        mask="phone"
                      />
                      {errors && (
                        <span className="form-input__input-error">
                          {errors.phone}
                        </span>
                      )}
                    </label>
                    <label htmlFor="telegram" className="profile__input-label">
                      Telegram
                      <input
                        name="telegram"
                        type="text"
                        id="telegram"
                        className="profile__input"
                        value={currentUser.telegram || ''}
                        onChange={handleChange}
                        mask="tgLink"
                      />
                      {errors && (
                        <span className="form-input__input-error">
                          {errors.telegram}
                        </span>
                      )}
                    </label>
                  </div>
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
                  currentResume={currentResume}
                  arrValues={arrValues}
                  setArrValues={setArrValues}
                  key={cv.id}
                  cv={cv}
                  deletePopupSetState={deletePopupSetState}
                  setIsEditMod={setIsEditMod}
                  values={values}
                  setValues={setValues}
                  setIsResumeNamePopupOpen={setIsResumeNamePopupOpen}
                  setPopupCopyLink={setPopupCopyLink}
                />
              ))}
            </div>
          </div>
        </div>
        <PopupCopyLink popupCopyLink={popupCopyLink} />
      </main>
    </>
  )
}

Profile.propTypes = {
  isEditMod: PropTypes.bool.isRequired,
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
  ).isRequired,
  setValues: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  deletePopupSetState: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  imageProfile: PropTypes.string,
  setImageProfile: PropTypes.func.isRequired,
  arrValues: PropTypes.arrayOf(
    PropTypes.objectOf(
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
    )
  ).isRequired,
  setArrValues: PropTypes.func.isRequired,
  setCurrentResume: PropTypes.func.isRequired,
  currentResume: PropTypes.objectOf(
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
  ).isRequired,
  setIsEditMod: PropTypes.func,
  setIsResumeNamePopupOpen: PropTypes.func.isRequired,
  setImage: PropTypes.func,
  setHasExperience: PropTypes.func.isRequired,
  setHasQualification: PropTypes.func.isRequired,
  setAllTillPresent: PropTypes.func.isRequired,
}

Profile.defaultProps = {
  imageProfile: '',
  setIsEditMod: () => {},
  setImage: () => {},
}

export default Profile
