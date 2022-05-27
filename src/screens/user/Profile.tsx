import { css } from '@emotion/css'
import { FullPageSpinner } from 'components/themed-components'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IProfile } from 'utils/types'
import { useProfile, useSetAvatar } from './user-api'
import * as colors from 'utils/colors'
import { useAuth } from 'contexts/userContext'
import { numberToDate } from 'utils/tools'
import { PanelNav } from '../admin/PanelNav'
import { ThumbnailGallery } from 'components/ThumbnailGallery'

export const Profile: FC = () => {
  const { username } = useParams()
  const { username: owner, isLogin } = useAuth()
  const { data, isError, isLoading } = useProfile(username || '')
  const { mutate: changeAvatar } = useSetAvatar()

  const user: IProfile | null = data as unknown as IProfile

  const handleSubmit = (u: string) => {
    changeAvatar(u)
  }
  if (isLoading) {
    return <FullPageSpinner />
  }
  if (isError) {
    return <p>Error: Something went wrong went retrieving your profile</p>
  }
  if (owner === username) {
    return (
      <div
        className={css({
          margin: 'auto',
          maxWidth: '300px',
          marginTop: '1em',
        })}
      >
        <div
          className={css({
            background: colors.plate,
            padding: '1em',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            margin: 'auto',
          })}
        >
          <div
            className={css({
              position: 'relative',
            })}
          >
            <div
              className={css({
                display: 'flex',
                position: 'absolute',
                flexDirection: 'row',
                bottom: 0,
              })}
            >
              {isLogin && (
                <ThumbnailGallery
                  handleSubmit={handleSubmit}
                ></ThumbnailGallery>
              )}
            </div>

            <img
              src={`/thumbs/${user.avatar ?? 1}.jpg`}
              alt="profile"
              className={css({
                width: '100%',
                display: 'block',
                height: 'auto',
              })}
            />
          </div>
          <div>
            <p>
              Thank you for being a member since{' '}
              <i> {numberToDate(user.createdAt)}</i>
            </p>
            <div>
              <h1>Hello, {user.username}</h1>
            </div>
            You have {user.totalLists}
            <Link to={`/lists/${user.username}`}> Lists.</Link>
          </div>
        </div>
        {isLogin && <p>close account</p>}
        <PanelNav />
      </div>
    )
  }
  return (
    <div
      className={css({
        background: colors.plate,
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: 'auto',
      })}
    >
      <img
        src="/profiles/images/profile.png"
        alt="profile"
        className={css({
          width: '100%',
        })}
      ></img>
      <p>
        {' '}
        They are member since <i> {numberToDate(user.createdAt)}</i>{' '}
      </p>
      <div>
        <h1>{user.username}</h1>
      </div>
      {user.username} has {user.totalLists}
      <Link to={`/lists/${user.username}`}> Lists.</Link>
    </div>
  )
}
