import { FullPageSpinner } from 'components/themed-components'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IProfile } from 'utils/types'
import { useProfile } from './user-api'

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
    <div>
      <p>Hello, {user.username}</p>
      You have {user.totalLists}
      <Link to={`/${user.username}/lists`}> Lists.</Link>
    </div>
  )
}
