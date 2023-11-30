import './Footer.scss'
import { NavLink } from 'react-router-dom'
import ResumeLogo from '../../img/resume.svg'
import PlusLogo from '../../img/plus-logo.svg'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__flex-container">
        <NavLink className="footer__nav-link" to="/">
          <div className="footer__logo">
            <img
              alt="резюме"
              src={ResumeLogo}
              className="footer__logo-resume"
            />
            <img alt="плюс" src={PlusLogo} className="footer__logo-plus" />
          </div>
        </NavLink>
        <div className="footer__contacts">
          <a href="tel:+78005553535" className="footer__contact">
            8 (800) 555 35 35
          </a>
          <a href="mailto:pochta@gmail.com" className="footer__contact">
            pochta@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
