import './ResultResume.scss'
import PropTypes from 'prop-types'
import Keanu from '../../../img/Keanu-Reeves.jpg'

function ResultResume({ values, checkboxValues }) {
  // eslint-disable-next-line no-console
  console.log('🚀 ~ file: ResultResume.js:5 ~ ResultResume ~ values:', values)
  // eslint-disable-next-line no-console
  console.log(
    '🚀 ~ file: ResultResume.js:5 ~ ResultResume ~ values:',
    checkboxValues
  )

  const testValue = {
    firstName: 'Keanu', // можно удалить
    secondName: 'Reeves', // можно удалить
    status: 'в  поиске', // можно удалить
    dateBirth: '2 september 1964',
    currentCity: 'New-York',
    company: 'Matrix Inc.',
    company_website: 'https://keanu-reeves.org/',
    current_position: 'superhero',
    duties: 'dog protector',
    month_work_start: 'mart',
    month_work_end: 'september',
    year_work_start: '2014',
    year_work_end: '2023',
  }

  return (
    <div className="result-resume" id="resultResume">
      <div className="result-resume__user-info">
        <div className="result-resume__personal-info">
          <span className="result-resume__user-name">
            {`ФИ: ${testValue.firstName} ${testValue.secondName}`}
          </span>
          <br />
          <span className="result-resume__user-status">
            {`Статус соискателя: ${testValue.status}`}
          </span>
          <br />
          <span className="result-resume__user-date-birth">
            {`Дата рождения: ${testValue.dateBirth}`}
          </span>
          <br />
          <span className="result-resume__user-date-birth">
            {`Город проживания: ${testValue.currentCity}`}
          </span>
        </div>
        <img
          src={Keanu}
          alt="фото соискателя"
          className="result-resume__user-photo"
        />
      </div>
    </div>
  )
}

ResultResume.propTypes = {
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  checkboxValues: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
}

ResultResume.defaultProps = { values: {}, checkboxValues: {} }

export default ResultResume
