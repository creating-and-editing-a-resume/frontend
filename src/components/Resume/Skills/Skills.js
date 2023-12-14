import './Skills.scss'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import skillsSelectedIcon from '../../../img/skills-confirm-icon.svg'
import skillsRollIcon from '../../../img/skills-roll-icon.svg'
import { skillList } from '../../../constants/skills-list'

function Skills({ values, setValues }) {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: Skills.js:9 ~ Skills ~ values:', values)

  const [selectedSkills, setSelectedSkills] = useState(values.hardskills || [])

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

  return (
    <section className="skills">
      <h1 className="skills__title">Навыки</h1>
      <h2 className="skills__subtitle">Выберите из списка</h2>
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
            skillList.map(item => (
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
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.object,
    ])
  ),
  setValues: PropTypes.func,
}

Skills.defaultProps = {
  values: {},
  setValues: () => {},
}

export default Skills
