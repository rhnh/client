import { userLogin, userRegister } from 'api/user'
import { useAsync } from 'hooks/useAsync'
import { createContext, FC, useContext, useEffect, useState } from 'react'
import {
  deleteLocalToken,
  getLocalToken,
  isVerified,
  setLocalToken,
} from 'screens/user/user-api'

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
  setState: () => {},
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

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    isVerified().then(t => {
      if (t) {
        setUser(t)
        setIsLogin(t?.isValidToken ?? false)
        setLocalToken(t?.token)
      }
    })
  }, [setUser])

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
            setIsLogin(false)
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
  const register = (user: IUser) => {
    setState('idle')
    return userRegister(user).then(
      res => {
        const result: Status = res as unknown as Status

        if (result.done) {
          if (result.data.username && result.data) {
            setState('success')
          } else {
            setIsLogin(false)
          }
        }
        return true
      },
      err => {
        setError(err)
        setIsLogin(false)
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
    return <p> loading...</p>
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
    setState,
    isSuccess,
    isLoading,
  }

  if (isLoading) {
    return <span>loading...</span>
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
