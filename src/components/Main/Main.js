import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './Main.scss'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import TitleImage from '../../img/main-page-title.svg'
import Step1 from '../../img/main-step1.png'

function Main({ isLoggedIn, onOpenPopup }) {
  const nextPage = '/resume'

  const navigate = useNavigate()

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        nextPage={nextPage}
        onOpenPopup={onOpenPopup}
      />
      <main className="main">
        <div className="main__title-container">
          <div className="main__text-conteiner">
            <h1 className="main__title">
              Ваше Идеальное IT-резюме за несколько Шагов!
            </h1>
            <span className="main__title-comment">
              Мгновенное создание, вечные результаты{' '}
            </span>
            <button
              type="button"
              className="main__create-button link"
              onClick={() => navigate('/resume')}
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
            src={Step1}
          />
          <div className="main__onboarding-text-container">
            <h2 className="main__onboarding-title">Как собрать резюме?</h2>
            <ul className="main__onboarding-list">
              <li className="main__onboarding-item">
                <div className="main__onboarding-item-circle" />
                <span className="main__onboarding-item-text">
                  Зарегистрируйся, чтоб иметь возможность сохранить резюме
                </span>
              </li>
              <li className="main__onboarding-item">
                <div className="main__onboarding-item-circle" />
                <span className="main__onboarding-item-text">
                  Заполни информацию в форме, следуя подсказкам и рекомендациям
                </span>
              </li>
              <li className="main__onboarding-item">
                <div className="main__onboarding-item-circle" />
                <span className="main__onboarding-item-text">
                  Скачивай в Word, PDF, редактируй действующее резюме и сохраняй
                  в личном кабинете
                </span>
              </li>
              <li className="main__onboarding-item">
                <div className="main__onboarding-item-circle" />
                <span className="main__onboarding-item-text">
                  Создавай новые резюме под каждого работодателя
                </span>
              </li>
            </ul>
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
}

export default Main
