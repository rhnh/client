import { css } from '@emotion/css'
import { InfoBox } from 'components/themed-components'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPost } from 'utils/types'

// import './css'
export const FeaturedPost: FC<IPost> = ({ _id, title, image_url, body }) => {
  if (_id && title && image_url && body) {
    return (
      <section
        className={css({
          margin: '2em',
          '@media screen and (min-width:700px)': {
            paddingLeft: '1em',
          },
        })}
      >
        <div>
          <Link to={`/posts/post/${_id}`}>
            <img
              src={image_url}
              alt={title}
              className={css({
                width: '100%',
                '@media screen and (min-width:700px)': {
                  maxWidth: '200px',
                },
              })}
            />
          </Link>
        </div>
        <div>
          <p className="featured-title">
            <Link to={`/posts/post/${_id}`}>{title}</Link>
          </p>
          <article className="featured-article">{body}</article>
          <Link to={`/posts/post/${_id}`}>Read more</Link>
        </div>
      </section>
    )
  } else {
    return <InfoBox>No Article found</InfoBox>
  }
}
