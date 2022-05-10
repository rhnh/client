import { useQuery } from 'react-query'
import { httpError } from 'utils/error'
import { IUser, IUserInfo } from 'utils/types'

export const useProfile = (username: string) => {
  return useQuery('profile', () => {
    return fetch(`/api/users/user/profile/${username}`, {
      method: 'get',
    }).then(res => {
      return res.json()
    })
  })
}

export async function verifiedToken(): Promise<IUserInfo | null> {
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
        const data = await res.json()
        if (data && res.ok) {
          return data
        } else {
          deleteLocalToken()
          window.location.reload()
          return null
        }
      })
  } else {
    deleteLocalToken()
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

export async function userClient(
  endpoint: string,
  data: IUser,
): Promise<IUserInfo | Error> {
  const { username, password } = data

  const config = {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  }
  let status, statusText
  try {
    return window.fetch(`/api/${endpoint}`, config).then(async response => {
      status = response.status
      statusText = response.statusText
      httpError(status)

      if (response.ok) {
        const data = await response.json()
        return data
      } else {
        return Promise.reject(data)
      }
    })
  } catch (error) {
    const err: Error = error as Error
    err.status = status
    err.statusMessage = statusText

    throw err
  }
}

export const userLogin = (user: IUser): Promise<IUserInfo | Error> => {
  return userClient('users/user', user)
}

export const userRegister = (user: IUser): Promise<IUserInfo | Error> =>
  userClient('users', user)
