import { css } from '@emotion/css'
import * as colors from 'utils/colors'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPost } from 'utils/types'
export const Post: FC<IPost> = ({ title, image_url, body, _id, createdAt }) => {
  return (
    <section
      className={css({
        background: colors.plate,
        padding: '1em',

        margin: '0.5em',
        '@media screen and (min-width:700px)': {
          margin: '1em',
        },
      })}
    >
      <div
        className={css({
          position: 'relative',
          marginTop: '1em',
        })}
      >
        <Link to={`/posts/post/${_id}`}>
          <img
            src={image_url}
            alt={title}
            className={css({
              width: '100%',
              marginTop: '1em',
              '@media screen and (min-width:700px)': {
                maxWidth: '200px',
                marginTop: '1em',
              },
              height: 'auto',
            })}
          />
        </Link>
      </div>
      <div>
        <p>
          <Link to={`/posts/post/${_id}`}>{title}</Link>
          <span> posted on: {createdAt}</span>
        </p>
        <article>{body}</article>
        <Link to={`/posts/post/${_id}`}>Read more</Link>
      </div>
    </section>
  )
}
