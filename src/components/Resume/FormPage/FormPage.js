import './FormPage.scss'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import Recommendations from '../Recommendations/Recommendations'

const FormPage = ({ duties, ability, projecDescription, myself }) => (
  <section className="form-page">
    <Outlet />
    <Recommendations
      duties={duties}
      ability={ability}
      projecDescription={projecDescription}
      myself={myself}
    />
  </section>
)

FormPage.propTypes = {
  duties: PropTypes.bool,
  ability: PropTypes.bool,
  projecDescription: PropTypes.bool,
  myself: PropTypes.bool,
}
FormPage.defaultProps = {
  duties: false,
  ability: false,
  projecDescription: false,
  myself: false,
}

export default FormPage
