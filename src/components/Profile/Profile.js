import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'
import classNames from 'classnames'
import Header from '../Header/Header'
import ImageUploadForm from '../Resume/PersonalData/ImageUploadForm/ImageUploadForm'
import cvExampleOne from '../../img/cv-examples/cv-1.png'
import cvExampleTwo from '../../img/cv-examples/cv-2.svg'

function Profile({ isLoggedIn }) {
  const nextPage = '/*'
  const [isProfileData, setIsProfileData] = useState(true)
  const [isContacts, setIsContacts] = useState(false)
  const openProfileData = () => {
    setIsContacts(false)
    setIsProfileData(true)
  }
  const openContacts = () => {
    setIsProfileData(false)
    setIsContacts(true)
  }

  const cvArray = [
    { id: 1, image: cvExampleOne, name: 'Резюме 1' },
    { id: 2, image: cvExampleTwo, name: 'Резюме 2' },
  ]

  const [isEditPassword, setIsEditPassword] = useState(false)
  const handleCheckboxChange = () => {
    setIsEditPassword(!isEditPassword)
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} nextPage={nextPage} />
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
                    <ImageUploadForm />
                  </div>
                  <div className="profile__personal-data-form">
                    <label htmlFor="name" className="profile__input-label">
                      Имя
                      <input
                        name="name"
                        type="text"
                        id="name"
                        className="profile__input"
                      />
                      <button
                        type="button"
                        className="profile__input-edit-button link"
                      >
                        {' '}
                      </button>
                    </label>

                    <label htmlFor="surname" className="profile__input-label">
                      Фамилия
                      <input
                        name="surname"
                        type="text"
                        id="surname"
                        className="profile__input"
                      />
                      <button
                        type="button"
                        className="profile__input-edit-button link"
                      >
                        {' '}
                      </button>
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
                        />
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
                        />
                        <button
                          type="button"
                          className="profile__input-edit-button link"
                        >
                          {' '}
                        </button>
                      </label>
                    </div>
                    <label htmlFor="password" className="profile__input-label">
                      Пароль
                      <input
                        name="password"
                        type="text"
                        id="password"
                        className="profile__input"
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
                      <>
                        <label
                          htmlFor="previous-password"
                          className="profile__input-label"
                        >
                          Введите старый пароль
                          <input
                            name="previous-password"
                            type="text"
                            id="previous-password"
                            className="profile__input"
                          />
                        </label>
                        <label
                          htmlFor="new-password"
                          className="profile__input-label"
                        >
                          Введите новый пароль
                          <input
                            name="new-password"
                            type="text"
                            id="new-password"
                            className="profile__input"
                          />
                        </label>
                        <label
                          htmlFor="confirm-password"
                          className="profile__input-label"
                        >
                          Подтвердите пароль
                          <input
                            name="confirm-password"
                            type="text"
                            id="confirm-password"
                            className="profile__input"
                          />
                        </label>

                        <button
                          className="profile__save-button link"
                          type="button"
                        >
                          Сохранить изменения
                        </button>
                      </>
                    )}
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
                    />
                    <button
                      type="button"
                      className="profile__input-edit-button link"
                    >
                      {' '}
                    </button>
                  </label>
                  <div className="profile__double-input-container">
                    <label htmlFor="phone" className="profile__input-label">
                      Телефон
                      <input
                        name="phone"
                        type="text"
                        id="phone"
                        className="profile__input"
                      />
                    </label>
                    <label htmlFor="telegram" className="profile__input-label">
                      Telegram
                      <input
                        name="telegram"
                        type="text"
                        id="telegram"
                        className="profile__input"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="profile__saved-resumes">
            <h2 className="profile__saved-resumes-title">Сохраненные резюме</h2>
            <div className="profile__cvs-container">
              {cvArray.map(cv => (
                <div className="profile__cv-container">
                  <div className="profile__cv-image-container">
                    <img
                      src={cv.image}
                      alt="резюме"
                      className="profile__cv-image"
                    />
                    <button
                      type="button"
                      className="profile__cv-changes-button link"
                    >
                      {' '}
                    </button>
                  </div>
                  <span className="profile__cv-name">{cv.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

Profile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}

export default Profile
