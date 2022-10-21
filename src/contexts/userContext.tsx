import { FullPageSpinner } from 'components/themed-components'
import { useAsync } from 'hooks/useAsync'
import { createContext, FC, useContext, useEffect, useState } from 'react'
import {
  deleteLocalToken,
  getLocalToken,
  setLocalToken,
  userLogin,
  userRegister,
} from 'screens/user/user-api'
import { SERVER_URL } from 'utils/configs'

import { Authorization, IUser, IUserInfo } from 'utils/types'

export const placeHolderAuth: Authorization = {
  username: '',
  token: '',
  login: (user: IUser) => {},
  register: () => {
    return new Promise((resolve, reject) => {
      resolve(false)
    })
  },
  logout: () => {},
  passRecovery: () => {},
  usernameRecovery: () => {},
  isError: false,
  isLogin: false,
  setLogin: () => {},
  error: new Error(''),
  getLocalToken: () => '',
  state: 'idle',
  isSuccess: false,
  isLoading: false,
  userInfo: {
    username: '',
    token: '',
  },
}

const userContext = createContext<Authorization>(placeHolderAuth)

export const UserProvider: FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean>(
    getLocalToken() ? true : false,
  )

  const {
    setData: setUser,
    data: userInfo,
    isLoading,
    isError,
    setError,
    setState,
    error,
    isIdle,
    isSuccess,
    state,
  } = useAsync<IUserInfo | null>({
    data: { username: '', token: '' },
    state: 'idle',
  })
  const token = getLocalToken()
  useEffect(() => {
    if (token)
      fetch(`${SERVER_URL}/api/users/verify-user`, {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }).then(async res => {
        if (res.status !== 200) {
          setIsLogin(false)
          deleteLocalToken()
          setUser(null)
        } else {
          setIsLogin(true)
          const result = (await res.json()) as IUserInfo
          setUser(result)
          setLocalToken(result?.token)
        }
      })
  }, [setUser, token])

  const login = (user: IUser) => {
    userLogin(user).then(
      res => {
        if (res) {
          const user: IUserInfo = res as IUserInfo
          if (user.username && user.token) {
            setUser(user)
            setLocalToken(user.token)
            setIsLogin(true)
          } else {
            setUser(null)
            const err = new Error('failed to login')
            setError(err)
          }
        }
      },
      err => {
        setError(err)
        setIsLogin(false)
        deleteLocalToken()
      },
    )
  }
  interface Status {
    message: string
    done: boolean
    status: number
    data: {
      username: string
    }
  }

  const setLogin = (state: 'idle' | 'loading' | 'success' | 'error') => {
    setState(state)
  }
  const register = (user: IUser) => {
    setState('idle')
    return userRegister(user).then(
      res => {
        const result: Status = res as unknown as Status

        if (result.done) {
          if (result.data.username && result.data) {
            setState('success')
            setIsLogin(false)
          } else {
            setUser(null)
          }
        }
        return true
      },
      err => {
        setError(err)
        deleteLocalToken()
        return false
      },
    )
  }

  const logout = () => {
    deleteLocalToken()
    setUser(null)
    setIsLogin(false)
    window.location.reload()
  }
  if (isLoading) {
    return <FullPageSpinner />
  }

  /**
   * @todo password recovery
   */
  const passRecovery = () => {}
  /**
   * @todo
   * username recovery
   */
  const usernameRecovery = () => {}

  const LoginInfo = {
    username: userInfo?.username || '',
    token: userInfo?.token || '',
    login,
    register,
    logout,
    passRecovery,
    usernameRecovery,
    userInfo,
    isError,
    error,
    isLogin,
    getLocalToken,
    isIdle,
    state,
    setLogin,
    isSuccess,
    isLoading,
  }

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <userContext.Provider value={LoginInfo}>{children}</userContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(userContext)
  if (!context) {
    throw new Error('No UserProvider found')
  }
  return context
}
