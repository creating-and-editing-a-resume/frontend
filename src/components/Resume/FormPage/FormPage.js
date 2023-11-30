import './FormPage.scss'
import { Outlet } from 'react-router-dom'
import Recommendations from '../Recommendations/Recommendations'

function FormPage() {
  return (
    <section className="form-page">
      <Outlet />
      <Recommendations />
    </section>
  )
}

export default FormPage
