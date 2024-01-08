/* eslint-disable react/no-array-index-key */
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './Main.scss'
import classNames from 'classnames'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import TitleImage from '../../img/main_title.svg'
// import Step1 from '../../img/main_step1.svg'
import { onboardingTitle, imgMainArr } from '../../constants/constants'
import { handleOpenPopup } from '../Utils/Utils'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Main({
  isLoggedIn,
  onOpenPopup,
  isValid,
  inputsAreNotEmpty,
  setValues,
  setImage,
  setHasExperience,
  setHasQualification,
  setAllTillPresent,
}) {
  const navigate = useNavigate()
  const nextPage = '/resume'
  const [img, setImg] = React.useState(imgMainArr[0])
  const [subtitleObject, setSubtitleObject] = React.useState(onboardingTitle)
  const [step, setStep] = React.useState(1)
  const currentUser = React.useContext(CurrentUserContext)

  const handleClick = i => {
    const elementIndex = onboardingTitle.findIndex(
      (_item, index) => index === i
    )

    setSubtitleObject(prevState => {
      const newState = { ...prevState }
      // eslint-disable-next-line array-callback-return
      Object.keys(newState).map((key, index) => {
        if (index === elementIndex) {
          newState[key].visible = true
        } else {
          newState[key].visible = false
        }
      })
      return newState
    })

    setImg(imgMainArr[elementIndex])
    setStep(i + 1)
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        nextPage={nextPage}
        onOpenPopup={onOpenPopup}
        setValues={setValues}
        isValid={isValid}
        inputsAreNotEmpty={inputsAreNotEmpty}
        setHasExperience={setHasExperience}
        setHasQualification={setHasQualification}
        setAllTillPresent={setAllTillPresent}
      />
      <main className="main">
        <div className="main__title-container">
          <div className="main__text-conteiner">
            <h1 className="main__title">
              Ваше идеальное резюме за несколько шагов!
            </h1>
            <span className="main__title-comment">
              С рекомендациями наших аналитиков, вы легко наполните резюме и
              подчеркнёте свои сильные стороны. Мгновенно редактируйте,
              скачивайте и создавайте несколько резюме.
            </span>
            <button
              type="button"
              className="main__create-button link"
              onClick={() => {
                handleOpenPopup(navigate, isLoggedIn, onOpenPopup)
                setValues({
                  name: isLoggedIn ? currentUser.name : '',
                  surname: isLoggedIn ? currentUser.surname : '',
                  birthday: isLoggedIn ? currentUser.birthday : '',
                  work_status: '',
                  email: isLoggedIn ? currentUser.email : '',
                  city: isLoggedIn ? currentUser.city : '',
                  work_experience_checkbox: false,
                  work_period_experience_checkbox: false,
                  education_period_checkbox: false,
                  qualification_checkbox: false,
                  languages: [{ id: uuidv4() }],
                  links: [{ id: uuidv4() }],
                  jobs: [],
                  qualifications: [],
                  educations: [],
                  portfolio: [],
                })
                setImage('')
                setHasExperience(true)
                setHasQualification(true)
                setAllTillPresent({})
              }}
            >
              Создать резюме
            </button>
          </div>
          <img className="main__title-image" alt="" src={TitleImage} />
        </div>
        <div className="main__onboarding-container">
          <img
            className="main__onboarding-image"
            alt="Мужчина за ноутбуком"
            src={img}
          />
          <div className="main__onboarding-text-container">
            <h2 className="main__onboarding-title">Как это работает</h2>
            <div className="main__onboarding-subtitle-container">
              <div
                className={classNames(
                  'main__onboarding-progress-bar',
                  `main__onboarding-progress-bar_step${step}`
                )}
              >
                <div
                  className={classNames(
                    'main__onboarding-circle',
                    `main__onboarding-circle_step${step}`
                  )}
                />
              </div>
              <ul className="main__onboarding-item-list">
                {onboardingTitle.map((item, i) => (
                  <li className="main__onboarding-items" key={i}>
                    <button
                      onClick={() => {
                        handleClick(i)
                      }}
                      type="button"
                      className={classNames(
                        'main__onboarding-button',
                        subtitleObject[i].visible &&
                          'main__onboarding-button_bold'
                      )}
                    >
                      {item.title}
                    </button>
                    <div
                      className={classNames(
                        'main__onboarding-subtitle-element',
                        subtitleObject[i].visible
                          ? 'main__onboarding-subtitle-element_visible'
                          : ''
                      )}
                    >
                      {item.subtitle}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

Main.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onOpenPopup: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  inputsAreNotEmpty: PropTypes.bool.isRequired,
  setImage: PropTypes.func.isRequired,
  setHasExperience: PropTypes.func.isRequired,
  setHasQualification: PropTypes.func.isRequired,
  setAllTillPresent: PropTypes.func.isRequired,
}

export default Main
