import { CircleButton, WarnSpan } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import {
  usePostById,
  useSetFeatured,
  useUnSetFeatured,
} from 'screens/posts/post-api'
import { IPost } from 'utils/types'
import pin from 'assets/pin.svg'
import unpin from 'assets/unpin.svg'
import del from 'assets/del.svg'
import { css } from '@emotion/css'

export const ShowPost: FC = () => {
  const { id } = useParams()
  const { isError, isLoading, data } = usePostById(id || '')
  const post = data as typeof data & IPost
  const { userInfo } = useAuth()
  const { mutate: setFeatured } = useSetFeatured()
  const { mutate: UnSetFeatured } = useUnSetFeatured()
  const handleSetFeatured = () => {
    setFeatured(id ?? '')
  }
  const handleUnSetFeatured = () => {
    UnSetFeatured(id ?? '')
  }
  const isAuthorized = userInfo?.role === 'mod'

  return isLoading ? (
    <p>Loading</p>
  ) : isError ? (
    <WarnSpan>Something went wrong</WarnSpan>
  ) : (
    <div className="post">
      <section>
        <h2>{post.title}</h2>
      </section>
      <section>
        <p>{post.body}</p>
      </section>
      {isAuthorized && (
        <div
          className={css({
            display: 'flex',
            // flexDirection: 'column',
          })}
        >
          {post.featured ? (
            <CircleButton onClick={handleUnSetFeatured}>
              <img
                src={unpin}
                alt="+"
                className={css({
                  minHeight: '50px',
                  minWeight: '50px',
                  ':hover': {
                    opacity: 0.5,
                  },
                })}
              ></img>
            </CircleButton>
          ) : (
            <div>
              <CircleButton onClick={handleSetFeatured}>
                <img
                  src={pin}
                  alt="+"
                  className={css({
                    minHeight: '50px',
                    minWeight: '50px',
                    ':hover': {
                      opacity: 0.5,
                    },
                  })}
                ></img>
              </CircleButton>
            </div>
          )}
          <CircleButton onClick={handleSetFeatured}>
            <img
              src={del}
              alt="+"
              className={css({
                minHeight: '50px',
                minWeight: '50px',
                ':hover': {
                  opacity: 0.5,
                },
              })}
            ></img>
          </CircleButton>
        </div>
      )}
    </div>
  )
}
