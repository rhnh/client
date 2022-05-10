import { css } from '@emotion/css'
import { FullPageSpinner } from 'components/themed-components'
import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IProfile } from 'utils/types'
import { useProfile } from './user-api'
import * as colors from 'utils/colors'
import { useAuth } from 'contexts/userContext'
import { numberToDate } from 'utils/tools'
import { IconButtons } from 'components/themed-button'
import editSvg from 'assets/edit.svg'
import delSvg from 'assets/del.svg'
import { PanelNav } from '../admin/PanelNav'

export const Profile: FC = () => {
  const { username } = useParams()
  const { data, isError, isLoading } = useProfile(username || '')
  const { username: owner } = useAuth()
  const user: IProfile | null = data as unknown as IProfile

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
              <IconButtons
                style={{ background: '#B7ADCF', opacity: 0.5 }}
                toolTip="change"
                bgImage={editSvg}
              ></IconButtons>
              <IconButtons
                style={{ background: '#B7ADCF', opacity: 0.5 }}
                toolTip="delete "
                bgImage={delSvg}
              ></IconButtons>
            </div>
            {/* <img
              src="/profiles/images/profile.png"
              alt="profile"
              className={css({
                width: '100%',
                display: 'block',
                height: 'auto',
              })}
            /> */}
            <img
              src="/thumbs/6.jpg"
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
        <p>close account</p>
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
