import { css } from '@emotion/css'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPost } from 'utils/types'
// import './css'
export const FeaturedPost: FC<IPost> = ({ title, image_url, body }) => {
  const { userInfo } = useAuth()
  const role = userInfo?.role
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
      <section>{role}</section>
    </>
  )
}

export const Post: FC<IPost> = ({ title, image_url, body }) => {
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
