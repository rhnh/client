import { FullPageSpinner, WarnBox } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import {
  useDeletePost,
  usePostById,
  useSetFeatured,
  useUnSetFeatured,
} from 'screens/posts/post-api'
import { IPost } from 'utils/types'
import pin from 'assets/pin.svg'
import unpin from 'assets/unpin.svg'
import delBtn from 'assets/del.svg'
import { css } from '@emotion/css'
import { CircleButton, LinkedButton } from 'components/themed-button'
import { numberToDate } from 'utils/tools'

export const ShowPost: FC = () => {
  const { id } = useParams()
  const { isError, isLoading, data } = usePostById(id || '')
  const post = data as typeof data & IPost
  const { userInfo } = useAuth()
  const { mutate: setFeatured, isSuccess: successFeatured } = useSetFeatured()
  const { mutate: UnSetFeatured, isSuccess: successUnFeatured } =
    useUnSetFeatured()
  const { mutate: deletePost, isSuccess: successDelete } = useDeletePost()

  const handleSetFeatured = () => {
    setFeatured(id ?? '')
  }
  const handleUnSetFeatured = () => {
    UnSetFeatured(id ?? '')
  }

  const handleDelete = () => {
    deletePost(id ?? '')
  }

  if (successFeatured || successDelete || successUnFeatured) {
    return (
      <LinkedButton variant="primary" to="/posts">
        Click to see all posts
      </LinkedButton>
    )
  }

  const isAuthorized = userInfo?.role === 'mod'

  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <WarnBox>Something went wrong</WarnBox>
  ) : (
    <div
      className={css({
        '@media screen and (min-width:700px)': {
          maxWidth: '1024px',
          margin: '2em auto',
        },
      })}
    >
      <section>
        <img
          src={post.image_url}
          className={css({
            width: '100%',
            '@media screen and (min-width:700px)': {
              width: '40%',
            },
          })}
          alt={post.title}
        />
        <div className={css({ margin: '1em' })}>
          <h2>{post.title}</h2>
          <span> {numberToDate(post.createdAt)}</span>
        </div>
      </section>

      <section className={css({ margin: '1em' })}>
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
          <CircleButton onClick={handleDelete}>
            <img
              src={delBtn}
              alt="x"
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
