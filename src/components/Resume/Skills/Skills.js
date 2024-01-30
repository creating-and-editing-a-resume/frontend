import './Skills.scss'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import classNames from 'classnames'
import skillsSelectedIcon from '../../../img/skills-confirm-icon.svg'
import skillsRollIcon from '../../../img/skills-roll-icon.svg'
import ResumeTitle from '../ResumeComponents/ResumeTitle/ResumeTitle'
import { CurrentValuesContext } from '../../../contexts/ValuesContext'
import { jobs } from '../../../constants/jobs'
import ArrowDown from '../../../img/arrow-icon-black.svg'

function Skills({ setValues }) {
  const location = useLocation()
  const path = location.pathname
  const values = React.useContext(CurrentValuesContext)
  const [jobChoice, setJobChoice] = useState(false)
  const [chosenJob, setChosenJob] = useState(jobs[0].job)
  const [selectedSkills, setSelectedSkills] = useState(values.hardskills || [])

  const chooseThisJob = evt => {
    const newJob = evt.target.innerText
    setChosenJob(newJob)
    setJobChoice(false)
  }

  const isSkillsPage = () => !!(path === '/resume/skills')

  useEffect(() => {
    setValues({ ...values, hardskills: selectedSkills })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkills])

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  // открытие/закрытия нижней части
  function handleOpenMenu() {
    setIsOpenMenu(true)
  }
  function handleCloseMenu() {
    setIsOpenMenu(false)
  }

  const skillsToRender = jobs.find(item => item.job === chosenJob).skills

  return (
    <section className="skills">
      <ResumeTitle title="Навыки" />
      {/* <h1 className="skills__title">Навыки</h1> */}
      <div className="skills__subtitle-container">
        <h2 className="skills__subtitle">Выберите из списка</h2>

        {isSkillsPage && (
          <div
            className={`recommend__job-selector-container skills__job-selector-container ${
              jobChoice && 'skills__job-selector-container_active'
            }`}
          >
            <input
              id="professions"
              name="professions"
              value={chosenJob}
              className={classNames(
                'recommend__job-selector link skills__job-selector',
                jobChoice &&
                  'recommend__job-selector_active skills__job-selector_active'
              )}
              onClick={() => {
                setJobChoice(!jobChoice)
              }}
              readOnly
            />
            <button
              className="recommend__arrow-button link skills__arrow-button"
              type="button"
              label="button"
              onClick={() => {
                setJobChoice(!jobChoice)
              }}
            >
              <img
                className="skills__arrow-icon"
                alt="плюсик"
                src={ArrowDown}
              />
            </button>

            {jobChoice && (
              <div className="recommend__job-list skills__job-list">
                {jobs.map(item => (
                  <button
                    type="button"
                    label="button"
                    className={classNames(
                      'recommend__job-option skills__job-option',
                      chosenJob === item.job && 'recommend__job-option_selected'
                    )}
                    key={item.id}
                    onClick={chooseThisJob}
                  >
                    {item.job}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="skills__container">
        <div
          className={`skills__field ${
            !isOpenMenu && 'skills__field_disabled-border-bottom'
          }`}
        >
          <ul className="skills__list skills__list_visible">
            {/* отрисовка выбранных навыков */}
            {React.Children.toArray(
              selectedSkills.map(item => (
                <li className="skills__item">
                  <button
                    className="skills__item-button"
                    type="submit"
                    label="button"
                    onClick={() => {
                      setSelectedSkills(prevSkills =>
                        prevSkills.filter(skill => skill !== item)
                      )
                    }}
                  >
                    {`${item}`}
                  </button>
                </li>
              ))
            )}
          </ul>

          {/* отрисовка двух состояний  меню */}
          {isOpenMenu ? (
            <button
              className="skills__field-selected-btn "
              type="submit"
              label="button"
              onClick={() => {
                handleCloseMenu()
              }}
            >
              <img
                src={skillsSelectedIcon}
                alt="skills selected icon"
                className="skills__field-selected-img"
              />
            </button>
          ) : (
            <button
              className="skills__field-selected-btn skills__field-selected-btn_disabled"
              type="submit"
              label="button"
              onClick={() => {
                handleOpenMenu()
              }}
            >
              <img
                src={skillsRollIcon}
                alt="skills selected icon"
                className="skills__field-selected-img"
              />
            </button>
          )}
        </div>

        {/* отрисовка всех навыков */}
        <ul className={`skills__list ${isOpenMenu && ' skills__list_visible'}`}>
          {React.Children.toArray(
            skillsToRender.map(item => (
              <li className="skills__item">
                <button
                  className={`skills__item-button ${
                    selectedSkills.includes(item) &&
                    'skills__item-button_active'
                  }`}
                  type="submit"
                  label="button"
                  onClick={() => {
                    if (!selectedSkills.includes(item)) {
                      setSelectedSkills(prevSkills => [...prevSkills, item])
                    }
                  }}
                >
                  {`${item}`}
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  )
}

Skills.propTypes = {
  setValues: PropTypes.func,
}

Skills.defaultProps = {
  setValues: () => {},
}

export default Skills
