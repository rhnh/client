import { useAuth } from 'contexts/userContext'
import { useQuery } from 'react-query'

export const useProfile = () => {
  const { username, getLocalToken } = useAuth()
  const token = getLocalToken()
  return useQuery('profile', () => {
    return fetch(`/api/users/user/profile/${username}`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => {
      return res.json()
    })
  })
}
