import { css } from '@emotion/css'
import { FullPageSpinner } from 'components/themed-components'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IProfile } from 'utils/types'
import { useProfile } from './user-api'
import * as colors from 'utils/colors'
export const Profile: FC = () => {
  const { data, isError, isLoading } = useProfile()
  const user: IProfile | null = data as unknown as IProfile
  if (isLoading) {
    return <FullPageSpinner />
  }
  if (isError) {
    return <p>Error: Something went wrong went retrieving your profile</p>
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
        src="profiles/images/profile.png"
        alt="profile"
        className={css({
          width: '100%',
        })}
      ></img>
      <p>
        Hello, <h1>{user.username}</h1>
      </p>
      You have {user.totalLists}
      <Link to={`/${user.username}/lists`}> Lists.</Link>
    </div>
  )
}
