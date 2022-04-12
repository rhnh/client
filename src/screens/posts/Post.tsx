import { css } from '@emotion/css'

import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPost } from 'utils/types'
export const Post: FC<IPost> = ({ title, image_url, body, _id }) => {
  return (
    <>
      <section>
        <div
          className={css({
            position: 'relative',
          })}
        >
          <Link to={`/posts/post/${_id}`}>
            <img src={image_url} alt="Leopard" />
          </Link>
        </div>
        <div>
          <p>
            <Link to="/posts/234324">{title}</Link>
          </p>
          <article>{body}</article>
          <Link to={`/posts/post/${_id}`}>Read more</Link>
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
