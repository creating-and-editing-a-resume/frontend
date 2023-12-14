import './FormPage.scss'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import Recommendations from '../Recommendations/Recommendations'

const FormPage = ({ duties }) => (
  <section className="form-page">
    <Outlet />
    <Recommendations duties={duties} />
  </section>
)

FormPage.propTypes = {
  duties: PropTypes.bool,
}
FormPage.defaultProps = {
  duties: false,
}

export default FormPage
