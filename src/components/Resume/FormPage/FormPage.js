import './FormPage.scss'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import Recommendations from '../Recommendations/Recommendations'

const FormPage = ({ duties, qualifications, portfolio, about }) => (
  <section className="form-page">
    <Outlet />
    <Recommendations
      duties={duties}
      qualifications={qualifications}
      portfolio={portfolio}
      about={about}
    />
  </section>
)

FormPage.propTypes = {
  duties: PropTypes.bool,
  qualifications: PropTypes.bool,
  portfolio: PropTypes.bool,
  about: PropTypes.bool,
}
FormPage.defaultProps = {
  duties: false,
  qualifications: false,
  portfolio: false,
  about: false,
}

export default FormPage
