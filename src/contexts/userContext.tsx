import { userLogin, userRegister } from 'api/user'
import { useAsync } from 'hooks/useAsync'
import { createContext, FC, useContext, useEffect, useState } from 'react'

import { Authorization, IUser, IUserInfo } from 'utils/types'

async function isVerified(): Promise<IUserInfo | null> {
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
function setLocalToken(token: string) {
  if (token) {
    window.localStorage.setItem('token', token)
  }
}

function getLocalToken() {
  return window.localStorage.getItem('token')
}

function deleteLocalToken() {
  window.localStorage.removeItem('token')
}

const placeHolderAuth: Authorization = {
  username: '',
  token: '',

  login: (user: IUser) => {},
  register: () => {},
  logout: () => {},
  passRecovery: () => {},
  usernameRecovery: () => {},
  isError: false,
  isLogin: false,
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

  const register = (user: IUser) => {
    userRegister(user).then(
      res => {},
      err => {
        setError(err)
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
