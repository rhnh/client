import { FC } from 'react'
import { Link } from 'react-router-dom'

const Footer: FC = () => {
  return (
    <footer className="footer">
      <ul className="social-list">
        <li className="social-list__item">
          <a className="social-list__link" href="http://dribbble.com">
            <i className="fab fa-dribbble"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://twitter.com">
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li className="social-list__item">
          <a className="social-list__link" href="https://github.com">
            <i className="fab fa-github"></i>
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
