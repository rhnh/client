import { useAuth } from 'contexts/userContext'
import { useQuery } from 'react-query'
import { IUserInfo } from 'utils/types'

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

export async function isVerified(): Promise<IUserInfo | null> {
  const token = getLocalToken()
  if (token) {
    return window
      .fetch(`/api/users/verify-user`, {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      })
      .then(async res => {
        console.log(res.ok, res.status)
        const data = await res.json()
        if (data && res.ok) {
          return data
        } else {
          return null
        }
      })
  }
  return null
}
export function setLocalToken(token: string) {
  if (token) {
    window.localStorage.setItem('token', token)
  }
}

export function getLocalToken() {
  return window.localStorage.getItem('token')
}

export function deleteLocalToken() {
  window.localStorage.removeItem('token')
}
