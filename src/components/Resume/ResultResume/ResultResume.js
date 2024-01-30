/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './ResultResume.scss'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { months } from '../../../constants/months'
import defaultPhoto from '../../../img/photo-plug.svg'

function ResultResume({ values }) {
  const userAllLang = values.languages
  const userSkills = values.hardskills
  const userAllJobs = values.jobs
  const userAllQualifications = values.qualifications
  const userAllEducations = values.educations
  const userAllPortfolio = values.portfolio
  const location = useLocation()
  const locationProfile = location.pathname === '/my-profile'

  const today = new Date()
  let year = 0
  const monthToday = today.getMonth() + 1
  const dayToday = today.getDate()

  function checkCurrentAge() {
    const birthdayArr = values.birthday?.split('.') || []
    year = today.getFullYear() - birthdayArr[2]
    if (monthToday < `${birthdayArr[1]}`) {
      return year - 1
    }
    // eslint-disable-next-line eqeqeq
    if (monthToday == `${birthdayArr[1]}`) {
      if (dayToday <= `${birthdayArr[0]}`) return year - 1

      return year
    }
    return year
  }

  function currentAge() {
    year = checkCurrentAge()
    if (year) {
      switch (year) {
        case 11:
        case 12:
        case 13:
        case 14:
          return `${year} лет`

        default:
          switch (year % 10) {
            case 1:
              return `${year} год`

            case 2:
            case 3:
            case 4:
              return `${year} года`

            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 0:
              return `${year} лет`
            default:
              break
          }
          break
      }
      return `${year} лет`
    }
    return null
  }

  function monthConvert(monthNumber) {
    let result = []
    if (monthNumber !== '') {
      result = months.find(({ id }) => id === monthNumber)
      if (result !== undefined) return result.long
    }

    return ''
  }

  function absentValues(currentValue) {
    return currentValue ? `${currentValue}` : ''
  }

  return (
    <div
      className={classNames(
        'result-resume',
        locationProfile && 'result-resume_profile'
      )}
      id="resultResume"
    >
      {/* ------блок  фото ------*/}
      <img
        src={values.img || defaultPhoto}
        alt="фото соискателя"
        className={classNames(
          'result-resume__user-photo',
          locationProfile && 'result-resume__user-photo_profile'
        )}
      />
      {/* ------ блок с ФИО ------*/}
      <div
        className={classNames(
          'result-resume__user-info',
          locationProfile && 'result-resume__user-info_profile'
        )}
      >
        <p
          className={classNames(
            'result-resume__user-name',
            locationProfile && 'result-resume__user-name_profile'
          )}
        >
          {`${absentValues(values.name)} ${values.surname ?? ''}`}
        </p>
        <p
          className={classNames(
            'result-resume__user-desired-position',
            locationProfile && 'result-resume__user-desired-position_profile'
          )}
        >
          {`${absentValues(values.desired_position)}`}
        </p>
        <ul className="result-resume__user-birth-info-list">
          <li
            className={classNames('result-resume__user-birth-info-list-item')}
          >
            <span
              className={classNames(
                'result-resume__user-birth-info-list-item-element',
                locationProfile &&
                  'result-resume__user-birth-info-list-item-element_profile'
              )}
            >
              {`${absentValues(currentAge())}`}
            </span>
          </li>
          <li className="result-resume__user-birth-info-list-item">
            <span
              className={classNames(
                'result-resume__user-birth-info-list-item-element',
                values.city &&
                  values.birthday &&
                  'result-resume__user-birth-info-list-item-element_point',
                locationProfile &&
                  'result-resume__user-birth-info-list-item-element_profile'
              )}
            />
          </li>
          <li className="result-resume__user-birth-info-list-item">
            <span
              className={classNames(
                'result-resume__user-birth-info-list-item-element',
                locationProfile &&
                  'result-resume__user-birth-info-list-item-element_profile'
              )}
            >
              {`${absentValues(values.city)}`}
            </span>
          </li>
        </ul>
      </div>

      {/* ------ блок опыта работы ------*/}

      {!values.work_experience_checkbox && (
        <div
          className={classNames(
            'result-resume__container',
            locationProfile && 'result-resume__container_profile'
          )}
        >
          <h2
            className={classNames(
              'result-resume__title',
              locationProfile && 'result-resume__title_profile'
            )}
          >
            Опыт работы
          </h2>

          <div
            className={classNames(
              'result-resume__children',
              locationProfile && 'result-resume__children_profile'
            )}
          >
            <div
              className={classNames(
                'result-resume__first-column',
                locationProfile && 'result-resume__first-column_profile'
              )}
            >
              <p
                className={classNames(
                  'result-resume__date',
                  locationProfile && 'result-resume__date_profile'
                )}
              >
                {values.year_work_start
                  ? `${monthConvert(values.month_work_start)}
          ${values.year_work_start} - ${monthConvert(values.month_work_end)}${
            values.year_work_end
              ? ` ${values.year_work_end}`
              : 'По настоящее время'
          }`
                  : ''}
              </p>
              <p
                className={classNames(
                  'result-resume__paragraph',
                  'result-resume__paragraph_position',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {absentValues(values.current_position)}
              </p>
              <Link
                to={values.company_website}
                target="_blank"
                className={classNames(
                  'result-resume__organization',
                  'result-resume__experience-company',
                  locationProfile && 'result-resume__organization_profile'
                )}
              >
                {absentValues(values.company)}
              </Link>
            </div>
            <div
              className={classNames(
                'result-resume__second-column',
                locationProfile && 'result-resume__second-column_profile'
              )}
            >
              <h4
                className={classNames(
                  'result-resume__experience-duty-title',
                  locationProfile &&
                    'result-resume__experience-duty-title_profile'
                )}
              >
                Обязанности
              </h4>
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {absentValues(values.duties)}
              </p>
            </div>
          </div>

          {React.Children.toArray(
            userAllJobs?.map(item => (
              <div
                className={classNames(
                  'result-resume__children',
                  locationProfile && 'result-resume__children_profile'
                )}
              >
                <div
                  className={classNames(
                    'result-resume__first-column',
                    locationProfile && 'result-resume__first-column_profile'
                  )}
                >
                  <p
                    className={classNames(
                      'result-resume__date',
                      locationProfile && 'result-resume__date_profile'
                    )}
                  >
                    {item.year_work_start
                      ? `${monthConvert(item.month_work_start)}
          ${item.year_work_start} - ${monthConvert(item.month_work_end)}${
            item.year_work_end ? ` ${item.year_work_end}` : 'По настоящее время'
          }`
                      : ''}
                  </p>
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      'result-resume__paragraph_position',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {absentValues(item.current_position)}
                  </p>
                  <Link
                    to={item.company_website}
                    className={classNames(
                      'result-resume__organization',
                      'result-resume__experience-company',
                      locationProfile && 'result-resume__organization_profile'
                    )}
                  >
                    {absentValues(item.company)}
                  </Link>
                </div>
                <div
                  className={classNames(
                    'result-resume__second-column',
                    locationProfile && 'result-resume__second-column_profile'
                  )}
                >
                  <h4
                    className={classNames(
                      'result-resume__experience-duty-title',
                      locationProfile &&
                        'result-resume__experience-duty-title_profile'
                    )}
                  >
                    Обязанности
                  </h4>
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {absentValues(item.duties)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ------ блок ссылки ------*/}
      {/* <div className="result-resume__links">
        <h2 className="result-resume__links-title">ссылки:</h2>
        <br />
        <span className="result-resume__link-another-site">
          {`Персональная страница: ${absentValues(values.website_link)}`}
        </span>
      </div> */}
      {/* ------ блок образование ------*/}
      {!values.education_checkbox && (
        <div
          className={classNames(
            'result-resume__container',
            locationProfile && 'result-resume__container_profile'
          )}
        >
          <h2
            className={classNames(
              'result-resume__title',
              locationProfile && 'result-resume__title_profile'
            )}
          >
            Образование
          </h2>
          <div
            className={classNames(
              'result-resume__children',
              locationProfile && 'result-resume__children_profile'
            )}
          >
            <div
              className={classNames(
                'result-resume__first-column',
                locationProfile && 'result-resume__first-column_profile'
              )}
            >
              <p
                className={classNames(
                  'result-resume__date',
                  locationProfile && 'result-resume__date_profile'
                )}
              >
                {values.year_education_start
                  ? `${
                      values.year_education_start
                        ? ` ${values.year_education_start}`
                        : ''
                    } ${
                      values.year_education_start &&
                      values.year_education_end &&
                      '-'
                    } ${
                      values.year_education_end
                        ? ` ${values.year_education_end}`
                        : ''
                    }`
                  : ''}
              </p>
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {values.university_name ?? ''}
              </p>
            </div>
            <div
              className={classNames(
                'result-resume__second-column',
                locationProfile && 'result-resume__second-column_profile'
              )}
            >
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {values.university_specialization}
              </p>
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {values.education_level}
              </p>
            </div>
          </div>
          {React.Children.toArray(
            userAllEducations?.map(item => (
              <div
                className={classNames(
                  'result-resume__children',
                  locationProfile && 'result-resume__children_profile'
                )}
              >
                <div
                  className={classNames(
                    'result-resume__first-column',
                    locationProfile && 'result-resume__first-column_profile'
                  )}
                >
                  <p
                    className={classNames(
                      'result-resume__date',
                      locationProfile && 'result-resume__date_profile'
                    )}
                  >
                    {`${
                      item.year_education_start
                        ? ` ${item.year_education_start}`
                        : ''
                    } - ${
                      item.year_education_end
                        ? ` ${item.year_education_end}`
                        : ''
                    }`}
                  </p>
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {item.university_name}
                  </p>
                </div>
                <div
                  className={classNames(
                    'result-resume__second-column',
                    locationProfile && 'result-resume__second-column_profile'
                  )}
                >
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {item.university_specialization}
                  </p>
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {item.education_level}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {/* ------ блок повышение квалификации ------*/}
      {!values.qualification_checkbox && (
        <div
          className={classNames(
            'result-resume__container',
            locationProfile && 'result-resume__container_profile'
          )}
        >
          <h2
            className={classNames(
              'result-resume__title',
              locationProfile && 'result-resume__title_profile'
            )}
          >
            Повышение квалификации
          </h2>
          <div
            className={classNames(
              'result-resume__children',
              locationProfile && 'result-resume__children_profile'
            )}
          >
            <div
              className={classNames(
                'result-resume__first-column',
                locationProfile && 'result-resume__first-column_profile'
              )}
            >
              <p
                className={classNames(
                  'result-resume__date',
                  locationProfile && 'result-resume__date_profile'
                )}
              >
                {values.month_qual_start
                  ? `${monthConvert(values.month_qual_start)}${
                      values.year_qual_start ? ` ${values.year_qual_start}` : ''
                    } - ${monthConvert(values.month_qual_end)}${
                      values.year_qual_end
                        ? ` ${values.year_qual_end}`
                        : 'По настоящее время'
                    }`
                  : ''}
              </p>
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {values.organization}
              </p>
            </div>
            <div
              className={classNames(
                'result-resume__second-column',
                locationProfile && 'result-resume__second-column_profile'
              )}
            >
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {values.course_name}
              </p>
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {values.work_specialization}
              </p>
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {values.description_experience}
              </p>
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {values.skills ? `Навыки: ${values.skills}` : ''}
              </p>
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                {values.diploma_link
                  ? `Ссылка на дипломную работу: ${values.diploma_link}`
                  : ''}
              </p>
            </div>
          </div>
          {React.Children.toArray(
            userAllQualifications?.map(item => (
              <div
                className={classNames(
                  'result-resume__children',
                  locationProfile && 'result-resume__children_profile'
                )}
              >
                <div
                  className={classNames(
                    'result-resume__first-column',
                    locationProfile && 'result-resume__first-column_profile'
                  )}
                >
                  <p
                    className={classNames(
                      'result-resume__date',
                      locationProfile && 'result-resume__date_profile'
                    )}
                  >
                    {item.month_qual_start
                      ? `${monthConvert(item.month_qual_start)}${
                          item.year_qual_start ? ` ${item.year_qual_start}` : ''
                        } - ${monthConvert(item.month_qual_end)}${
                          item.year_qual_end
                            ? ` ${item.year_qual_end}`
                            : 'По настоящее время'
                        }`
                      : ''}
                  </p>
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {item.organization}
                  </p>
                </div>
                <div
                  className={classNames(
                    'result-resume__second-column',
                    locationProfile && 'result-resume__second-column_profile'
                  )}
                >
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {item.course_name}
                  </p>
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {item.work_specialization}
                  </p>
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {item.description_experience}
                  </p>
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {`Навыки: ${item.skills ?? ''}`}
                  </p>
                  <p
                    className={classNames(
                      'result-resume__paragraph',
                      locationProfile && 'result-resume__paragraph_profile'
                    )}
                  >
                    {item.diploma_link
                      ? `Ссылка на дипломную работу: ${item.diploma_link}`
                      : ''}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ------ блок проекты и портфолио ------*/}
      {!values.portfolio_checkbox && (
        <div
          className={classNames(
            'result-resume__container',
            locationProfile && 'result-resume__container_profile'
          )}
        >
          <h2
            className={classNames(
              'result-resume__title',
              locationProfile && 'result-resume__title_profile'
            )}
          >
            Проекты и портфолио
          </h2>
          <div
            className={classNames(
              'result-resume__project',
              locationProfile && 'result-resume__project_profile'
            )}
          >
            <h5
              className={classNames(
                'result-resume__project-name',
                locationProfile && 'result-resume__project-name_profile'
              )}
            >
              {values.project_name}
            </h5>
            <br />
            <p
              className={classNames(
                'result-resume__paragraph',
                locationProfile && 'result-resume__paragraph_profile'
              )}
            >
              {values.project_description}
            </p>
            <br />
            {values.project_link ? (
              <p
                className={classNames(
                  'result-resume__paragraph',
                  locationProfile && 'result-resume__paragraph_profile'
                )}
              >
                Ссылка на проект:
                <Link
                  to={values.project_link}
                  target="_blank"
                  className={classNames(
                    'result-resume__organization',
                    'result-resume__project-link',
                    locationProfile && 'result-resume__organization_profile'
                  )}
                >
                  {absentValues(values.project_link)}
                </Link>
              </p>
            ) : (
              ''
            )}
          </div>
          {React.Children.toArray(
            userAllPortfolio?.map(item => (
              <div
                className={classNames(
                  'result-resume__project',
                  locationProfile && 'result-resume__project_profile'
                )}
              >
                <h5
                  className={classNames(
                    'result-resume__project-name',
                    locationProfile && 'result-resume__project-name_profile'
                  )}
                >
                  {item.project_name}
                </h5>
                <br />
                <p
                  className={classNames(
                    'result-resume__paragraph',
                    locationProfile && 'result-resume__paragraph_profile'
                  )}
                >
                  {item.project_description}
                </p>
                <br />
                <p
                  className={classNames(
                    'result-resume__paragraph',
                    locationProfile && 'result-resume__paragraph_profile'
                  )}
                >
                  Ссылка на проект:
                  <Link
                    to={item.project_link}
                    target="_blank"
                    className={classNames(
                      'result-resume__organization',
                      'result-resume__project-link',
                      locationProfile && 'result-resume__organization_profile'
                    )}
                  >
                    {absentValues(item.project_link)}
                  </Link>
                </p>
              </div>
            ))
          )}
        </div>
      )}
      {/* ------ блок о себе ------ */}
      {values.about && (
        <div
          className={classNames(
            'result-resume__container',
            locationProfile && 'result-resume__container_profile'
          )}
        >
          <h2
            className={classNames(
              'result-resume__title',
              locationProfile && 'result-resume__title_profile'
            )}
          >
            Обо мне
          </h2>
          <p
            className={classNames(
              'result-resume__paragraph',
              'result-resume__paragraph_about',
              locationProfile && 'result-resume__paragraph_profile'
            )}
          >
            {values.about}
          </p>
        </div>
      )}
      <div className="result-resume__right-container">
        {/* ------ блок с контактами ------*/}
        <div className="result-resume__right-container-info result-resume__user-contacts">
          <h2
            className={classNames(
              'result-resume__title',
              'result-resume__title_contacts',
              locationProfile && 'result-resume__title_profile'
            )}
          >
            Контакты
          </h2>
          <Link
            to={values.telegram}
            target="_blank"
            className={classNames(
              'result-resume__paragraph',
              'result-resume__paragraph_contacts',
              'result-resume__paragraph_contacts-link',
              locationProfile && 'result-resume__paragraph_profile'
            )}
          >
            {absentValues(values.telegram)}
          </Link>
          <p
            className={classNames(
              'result-resume__paragraph',
              'result-resume__paragraph_contacts',
              locationProfile && 'result-resume__paragraph_profile'
            )}
          >
            {absentValues(values.email)}
          </p>
          <p
            className={classNames(
              'result-resume__paragraph',
              'result-resume__paragraph_contacts',
              locationProfile && 'result-resume__paragraph_profile'
            )}
          >
            {absentValues(values.phone)}
          </p>
        </div>
        {/* ------ блок навыки ------*/}
        {userSkills && userSkills.length !== 0 && (
          <div className="result-resume__right-container-info">
            <h2
              className={classNames(
                'result-resume__title',
                'result-resume__title_contacts',
                locationProfile && 'result-resume__title_profile'
              )}
            >
              Навыки
            </h2>
            <ul
              className={classNames(
                'result-resume__list-skills',
                locationProfile && 'result-resume__list-skills_profile'
              )}
            >
              {userSkills.map((item, i) => (
                <li
                  key={i}
                  className={classNames(
                    'result-resume__paragraph',
                    'result-resume__list-item',
                    locationProfile && 'result-resume__paragraph_profile'
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* ------ блок языки ------*/}
        {userAllLang && userAllLang[0].language && (
          <div className="result-resume__right-container-info">
            <h2
              className={classNames(
                'result-resume__title',
                'result-resume__title_contacts',
                locationProfile && 'result-resume__title_profile'
              )}
            >
              Языки
            </h2>
            <ul
              className={classNames(
                'result-resume__list-skills',
                locationProfile && 'result-resume__list-skills_profile'
              )}
            >
              {userAllLang
                ? React.Children.toArray(
                    userAllLang?.map((item, i) => (
                      <li
                        key={i}
                        className={classNames(
                          'result-resume__paragraph',
                          'result-resume__list-item',
                          locationProfile && 'result-resume__paragraph_profile'
                        )}
                      >
                        {`${item.language} - (${item.level})`}
                      </li>
                    ))
                  )
                : 'Отсутствует'}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

ResultResume.propTypes = {
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
      PropTypes.objectOf(PropTypes.bool),
    ])
  ),
}

ResultResume.defaultProps = {
  values: {},
}

export default ResultResume
