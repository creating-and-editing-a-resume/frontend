/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { useClipboard } from 'use-clipboard-copy'
import { useLocation } from 'react-router-dom'
import './Recommendations.scss'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import RecommedationImage from '../../../img/recommendations.png'
import {
  EXPERIENCE_RECOMMENDATIONS,
  // EXPERIENCE_DUTIES_RECOMMENDATIONS,
  RESULT_RECOMMENDATIONS,
} from '../../../constants/recommendations'
import PlusIcon from '../../../img/plus-icon.svg'
import ArrowDown from '../../../img/arrow-down-icon.svg'
import CopyIcon from '../../../img/copy-icon.svg'
import { jobs } from '../../../constants/jobs'

const Recommendations = ({ duties, qualifications, portfolio, about }) => {
  const clipboard = useClipboard()
  const location = useLocation()
  const path = location.pathname

  const isPersonalDataPage = () => !!(path === '/resume/personal-data')
  const isExperiencePage = () => !!(path === '/resume/experience')
  const isQualificationPage = () => !!(path === '/resume/qualification')
  const isEducationPage = () => !!(path === '/resume/education')
  const isPortfolioPage = () => !!(path === '/resume/portfolio')
  const isSkillsPage = () => !!(path === '/resume/skills')
  const isAboutPage = () => !!(path === '/resume/about')
  const isResultPage = () => !!(path === '/resume/result')

  // TODO: подставить нужные подсказки
  // Массив с данными для выбора профессии на странице "Опыт работы":

  const [jobChoice, setJobChoice] = useState(false)
  const [chosenJob, setChosenJob] = useState(jobs[0].job)
  const chooseThisJob = evt => {
    const newJob = evt.target.innerText
    setChosenJob(newJob)
    setJobChoice(false)
  }
  const dutiesRecommendationsToRender = jobs.find(
    item => item.job === chosenJob
  ).duties

  const qualificationsRecommendationsToRender = jobs.find(
    item => item.job === chosenJob
  ).qualifications

  return (
    <section className="recommend">
      <ResumeTitle title="Рекомендации" />
      {isPersonalDataPage() && (
        <>
          <img
            className="recommend__image"
            alt="девушка и конструктор"
            src={RecommedationImage}
          />
          <p className="recommend__comment">
            Чтобы повысить шансы успешного трудоустройства, предлагаем следовать
            нашим рекомендациям.
          </p>
        </>
      )}
      {isExperiencePage() && !duties && (
        <div className="recommend__container">{EXPERIENCE_RECOMMENDATIONS}</div>
      )}
      {isExperiencePage() && duties && (
        <div className="recommend__container">
          <p className="recommend__text">
            Обязанности — это не должностная инструкция, их разбивают на группы
            в зависимости от исполняемых ролей. Не нужно подробно описывать все
            задачи — чем конкретнее, тем лучше:
          </p>

          <div className="recommend__duties-formula">
            <span className="recommend__duties-component">
              обязанность <br /> (что сделали)
            </span>
            <img className="recommend__plus-icon" alt="плюсик" src={PlusIcon} />
            <span className="recommend__duties-component">
              инструмент <br /> (как делали)
            </span>
          </div>

          <p className="recommend__text">
            Достижения — это активные действия, которые принесли измеримый
            результат. Они показывают вашу результативность и профессиональный
            рост. Чтобы рассказать о своих достижениях, используйте прошедшее
            время и глаголы. Сами глаголы нужно писать в прошедшем времени и
            совершённом виде. Вы отвечаете на вопрос «Что сделал(а)?» — это
            конкретизирует описание.
          </p>

          <p className="recommend__text">
            Релевантный опыт — это подтверждение того, что кандидат уже решал
            похожие задачи в условиях, приближённых к тем, которые его ждут в
            новой компании. Специалисты с релевантным опытом знают предметную
            область и успели поработать с разными инструментами. Поэтому
            функции, методики и используемые технологии отходят на второй план,
            а на первый выходят достижения.Не указывайте контекст, если он
            нерелевантен желаемой должности.
          </p>

          <p className="recommend__text">
            Если релевантный опыт практически отсутствует, кандидат может
            показать свои софтскилы. Можно показать нерелевантный опыт
            максимально компактно — на него невозможно полноценно перенести
            требования и потребности компании. Скорее всего, в нерелевантных
            местах работы были другие задачи, инструменты и сфера деятельности.
            Не бойтесь сокращать опыт, но не убирайте его совсем. Делайте акцент
            на достижениях.
          </p>

          <p className="recommend__text">
            Ниже выбирайте свою специальность и смотрите удачные примеры
            заполнения поля «обязанности».
          </p>
          <div className="recommend__job-selector-container">
            <input
              id="professions"
              name="professions"
              value={chosenJob}
              className={classNames(
                'recommend__job-selector link',
                jobChoice && 'recommend__job-selector_active'
              )}
              onClick={() => {
                setJobChoice(!jobChoice)
              }}
              readOnly
            />
            <img
              className="recommend__arrow-icon link"
              alt="плюсик"
              src={ArrowDown}
              onClick={() => {
                setJobChoice(!jobChoice)
              }}
            />

            {jobChoice && (
              <div className="recommend__job-list">
                {jobs.map(item => (
                  <span
                    className={classNames(
                      'recommend__job-option',
                      chosenJob === item.job && 'recommend__job-option_selected'
                    )}
                    key={item.id}
                    onClick={chooseThisJob}
                  >
                    {item.job}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="recommend__duties-examples-container">
            {dutiesRecommendationsToRender.map((recs, i) => {
              const { text } = recs
              return (
                <div key={i} className="recommend__duties-example">
                  <span className="recommend__duties-example-text">{text}</span>
                  <button
                    type="button"
                    className="recommend__duties-example-copy link"
                    onClick={() => {
                      clipboard.copy(text)
                    }}
                  >
                    <img
                      src={CopyIcon}
                      alt="иконка сохранения"
                      className="recommend__duties-example-copy-icon"
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {isQualificationPage() && !qualifications && (
        <>
          <img
            className="recommend__image"
            alt="девушка и конструктор"
            src={RecommedationImage}
          />
          <p className="recommend__comment">
            Чтобы повысить шансы успешного трудоустройства, предлагаем следовать
            нашим рекомендациям.
          </p>
        </>
      )}

      {isQualificationPage() && qualifications && (
        <div className="recommend__container">
          <p className="recommend__text">
            В дополнительном образовании указывайте навыки (их можно посмотреть
            на лендинге своего курса), релевантные для новой профессии, которые
            подтверждают вашу заинтересованность в профессиональном росте и
            стремлении к саморазвитию.
          </p>

          <p className="recommend__text">
            Покажите, что вы умеете: в начале расскажите о методиках и
            инструментах, которые используете.
          </p>

          <p className="recommend__text">
            Ниже представлены удачные примеры заполнения блока с навыками:
          </p>
          <div className="recommend__job-selector-container">
            <input
              id="professions"
              name="professions"
              value={chosenJob}
              className={classNames(
                'recommend__job-selector link',
                jobChoice && 'recommend__job-selector_active'
              )}
              onClick={() => {
                setJobChoice(!jobChoice)
              }}
              readOnly
            />
            <img
              className="recommend__arrow-icon link"
              alt="плюсик"
              src={ArrowDown}
              onClick={() => {
                setJobChoice(!jobChoice)
              }}
            />

            {jobChoice && (
              <div className="recommend__job-list">
                {jobs.map(item => (
                  <span
                    className={classNames(
                      'recommend__job-option',
                      chosenJob === item.job && 'recommend__job-option_selected'
                    )}
                    key={item.id}
                    onClick={chooseThisJob}
                  >
                    {item.job}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="recommend__duties-examples-container">
            {qualificationsRecommendationsToRender.map((recs, i) => {
              const { text } = recs
              return (
                <div key={i} className="recommend__duties-example">
                  <span className="recommend__duties-example-text">{text}</span>
                  <button
                    type="button"
                    className="recommend__duties-example-copy link"
                    onClick={() => {
                      clipboard.copy(text)
                    }}
                  >
                    <img
                      src={CopyIcon}
                      alt="иконка сохранения"
                      className="recommend__duties-example-copy-icon"
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {isEducationPage() && (
        <>
          <img
            className="recommend__image"
            alt="девушка и конструктор"
            src={RecommedationImage}
          />
          <p className="recommend__comment">
            Чтобы повысить шансы успешного трудоустройства, предлагаем следовать
            нашим рекомендациям.
          </p>
        </>
      )}

      {isPortfolioPage() && !portfolio && (
        <>
          <img
            className="recommend__image"
            alt="девушка и конструктор"
            src={RecommedationImage}
          />
          <p className="recommend__comment">
            Чтобы повысить шансы успешного трудоустройства, предлагаем следовать
            нашим рекомендациям.
          </p>
        </>
      )}

      {isPortfolioPage() && portfolio && (
        <div className="recommend__container">
          <p className="recommend__text">
            Сделайте акцент на сути и старайтесь не углубляться в подробности.
            Опишите до 3–4 проектов из пройденного курса. В каждом проекте
            укажите: что именно вы сделали, какие инструменты использовались в
            процессе и ссылку на Github.
          </p>

          <p className="recommend__text">
            Не используйте учебную лексику. Учебные слова затрудняют сравнение
            желаемого профиля должности с вашим резюме. В компании всё‑таки
            нужно будет «разрабатывать», а не «учиться разрабатывать».
          </p>
          <br />
          <p className="recommend__text">
            Помните, что работа без оформления, фриланс и парт-тайм проекты —
            тоже опыт. Не забывайте указывать его.
          </p>
        </div>
      )}
      {isSkillsPage() && (
        <>
          <img
            className="recommend__image"
            alt="девушка и конструктор"
            src={RecommedationImage}
          />
          <p className="recommend__comment">
            Чтобы повысить шансы успешного трудоустройства, предлагаем следовать
            нашим рекомендациям.
          </p>
        </>
      )}
      {isAboutPage() && !about && (
        <>
          <img
            className="recommend__image"
            alt="девушка и конструктор"
            src={RecommedationImage}
          />
          <p className="recommend__comment">
            Чтобы повысить шансы успешного трудоустройства, предлагаем следовать
            нашим рекомендациям.
          </p>
        </>
      )}

      {isAboutPage() && about && (
        <div className="recommend__container">
          <p className="recommend__text">
            Мы открываем свою личность и подчёркиваем её индивидуальность.
            Поэтому так важно заполнять блок «Обо мне».
          </p>

          <p className="recommend__text">Укажите:</p>
          <ul className="recommend__list">
            <li className="recommend__list-item recommend__text">
              готовность к релокации в конкретное место (рассматриваю переезд
              только в города Германии);
            </li>
            <li className="recommend__list-item recommend__text">
              конкретный график (не рассматриваю офис, только гибридный график);
            </li>
            <li className="recommend__list-item recommend__text">
              выбор конкретной сферы (рассматриваю предложения из Fintech и
              Edtech);
            </li>
            <li className="recommend__list-item recommend__text">
              ограничения по рабочим задачам (не работаю с холодными звонками и
              продажами);
            </li>
            <li className="recommend__list-item recommend__text">
              чётко показывайте свою мотивацию. Говорите не про выбор
              направления, а про конкретную должность. Этот пункт особенно
              актуален для начинающих специалистов.
            </li>
          </ul>
        </div>
      )}
      {isResultPage() && (
        <div className="recommend__container">{RESULT_RECOMMENDATIONS}</div>
      )}
    </section>
  )
}

Recommendations.propTypes = {
  duties: PropTypes.bool,
  qualifications: PropTypes.bool,
  portfolio: PropTypes.bool,
  about: PropTypes.bool,
}
Recommendations.defaultProps = {
  duties: false,
  qualifications: false,
  portfolio: false,
  about: false,
}

export default Recommendations
