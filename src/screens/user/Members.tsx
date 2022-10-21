import { FullPageSpinner } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { SERVER_URL } from 'utils/configs'
import { IUser } from 'utils/types'
import { Member } from './Member'

export const Members: FC = () => {
  const { token, userInfo } = useAuth()
  const role = userInfo?.role
  const {
    isError,
    isLoading,
    data: users,
  } = useQuery<IUser[]>(
    'members',
    () => {
      return fetch(`${SERVER_URL}/api/users/members`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json())
    },
    { enabled: role === 'admin' },
  )
  if (role !== 'admin') {
    return <p>You are not authorized</p>
  }
  if (isLoading) {
    return <FullPageSpinner />
  }
  if (isError) {
    return <p>Error</p>
  }

  return (
    <div>
      {users?.map(user => (
        <div key={user._id}>
          <section>
            <Member {...user} />
          </section>
        </div>
      ))}
    </div>
  )
}
