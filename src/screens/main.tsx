import { css } from '@emotion/css'
import React from 'react'
import { Link } from 'react-router-dom'
import './main.css'
export const Main = () => {
  return (
    <div className="container">
      <main className="featured-profile">
        <div>
          <span
            className={css({
              paddingRight: '.6em',
              margin: 0,
            })}
          >
            Featured Animal
          </span>
          <div
            className={css({
              width: 0,
              height: 0,
              display: 'inline-block',
              marginRight: '.6em',
              borderStyle: 'solid',
              borderWidth: ' 5px 0 5px 8.7px',
              borderColor: 'transparent transparent transparent #007bff',
            })}
          ></div>
          <Link to="/id?23324/">Karula</Link>
        </div>
        <div
          className={css({
            display: 'flex',
          })}
        >
          <img src="/profiles/images/index.jpeg" alt="images" />
          <div className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            excepturi blanditiis explicabo nemo doloremque, nobis omnis incidunt
            maxime eveniet similique porro nostrum quos voluptate quaerat
            voluptatibus voluptates quia odit aspernatur!
          </div>
        </div>
        <span>
          <Link to="/">Continue Reading</Link>
        </span>
      </main>
      <aside className="aside">
        Create new account Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Cum facilis quibusdam consequuntur inventore error, unde
        asperiores deleniti perspiciatis saepe? Neque sapiente provident ea
        dolores, architecto tempore officiis ad sunt praesentium.
      </aside>
      <footer className="footer">
        <div className="footer-main">
          <img src="img/logo.png" alt="" className="footer-logo" />
          <p className="footer-text">
            Two brothers from Chicago that are just trying to pay back their
            debt by helping others with their SEO, SEM, and Content Marketing
            needs.
          </p>
          <p className="footer-fineprint">© Jake&Elwood 2019</p>
        </div>
        <ul className="social-list">
          <li className="social-item">
            <a href="#" className="social-link">
              <i className="fab fa-facebook-square"></i>
            </a>
          </li>
          <li className="social-item">
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li className="social-item">
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}
