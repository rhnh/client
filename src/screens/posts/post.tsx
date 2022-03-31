import { css } from '@emotion/css'
import { useAuth } from 'contexts/userContext'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { IPost, isAuthorized } from 'utils/types'
// import './css'
export const FeaturedPost: FC<IPost> = ({ title, image_url, body }) => {
  return (
    <>
      <section className="featured">
        <img className="featured-image" src={image_url} alt="Leopard" />
        <div>
          <p className="featured-title">
            Featured Animal <Link to="/id=234324">{title}</Link>
          </p>
          <article className="featured-article">{body}</article>
          <Link to="/some">Read more</Link>
        </div>
      </section>
      <div
        className={css({
          borderBottom: '1px solid #cbd5ff',
          width: '100%',
          margin: '1em auto',
          height: 'auto',
          padding: '0.6em',
          display: 'block',
          boxShadow: '0 6px 3px -5px rgba(0, 0, 0, 0.2)',

          '@media screen and (min-width:600px)': {
            borderBottom: 'none',
            boxShadow: 'none',
          },
        })}
      ></div>
    </>
  )
}

export const Post: FC<IPost> = ({ title, image_url, body }) => {
  const [show, setShow] = useState(false)
  const { userInfo } = useAuth()
  const role = userInfo?.role
  return (
    <>
      <section className="featured">
        <div
          className={css({
            position: 'relative',
          })}
        >
          <img
            className="featured-image"
            src={image_url}
            alt="Leopard"
            onMouseOver={() => {
              setShow(true)
            }}
          />
          {isAuthorized(role) && show ? (
            <button
              className={css({
                border: 'none',
                padding: '1.5em',
                borderRadius: '50%',
                background: 'green',
                position: 'absolute',
                marginTop: '50px',
                marginLeft: '-25px',
                animationDelay: '2s',
                transition: 'opacity 1s ease-out',
                boxShadow:
                  'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
                ':hover': {
                  color: 'red',
                },
              })}
              onMouseOutCapture={() => {
                setShow(false)
              }}
            >
              +
            </button>
          ) : null}
        </div>
        <div>
          <p className="featured-title">
            <Link to="/id=234324">{title}</Link>
          </p>
          <article className="featured-article">{body}</article>
          <Link to="/some">Read more</Link>
        </div>
      </section>
      <div
        className={css({
          borderBottom: '1px solid #cbd5ff',
          width: '100%',
          margin: '1em auto',
          height: 'auto',
          padding: '0.6em',
          display: 'block',
          boxShadow: '0 6px 3px -5px rgba(0, 0, 0, 0.2)',

          '@media screen and (min-width:600px)': {
            borderBottom: 'none',
            boxShadow: 'none',
          },
        })}
      ></div>
    </>
  )
}
