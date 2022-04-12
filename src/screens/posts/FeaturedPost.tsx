import { css } from '@emotion/css'
import { InfoSpan } from 'components/themed-components'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPost } from 'utils/types'

// import './css'
export const FeaturedPost: FC<IPost> = ({ _id, title, image_url, body }) => {
  if (_id && title && image_url && body) {
    return (
      <>
        <section>
          <div
            className={css({
              position: 'relative',
            })}
          >
            <Link to={`/posts/post/${_id}`}>
              <img src={image_url} alt={title} />
            </Link>
          </div>
          <div>
            <p className="featured-title">
              <Link to="/posts/234324">{title}</Link>
            </p>
            <article className="featured-article">{body}</article>
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
  } else {
    return <InfoSpan>No Article found</InfoSpan>
  }
}
