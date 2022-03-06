import { userLogin, userRegister } from 'api/user'
import { useAsync } from 'hooks/useAsync'
import { createContext, FC, useContext, useEffect, useState } from 'react'
import { SERVER_URL } from 'utils/configs'
import { IUser, IUserInfo } from 'utils/types'

async function isVerified(): Promise<boolean> {
  const token = getLocalToken()
  if (token) {
    return window
      .fetch(`${SERVER_URL}/users/verify-user`, {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      })
      .then(res => {
        return res.ok ? true : false
      })
  }
  return false
}
function setLocalToken(token: string) {
  if (token) window.localStorage.setItem('token', token)
}
function getLocalToken() {
  return window.localStorage.getItem('token')
}

function deleteLocalToken() {
  window.localStorage.removeItem('token')
}
interface Authorization {
  userInfo: IUserInfo | undefined | null
  login: (user: IUser) => void
  register: (user: IUser) => void
  logout: () => void
  passRecovery: () => void
  usernameRecovery: () => void
  getLocalToken: () => string | null
  isError: boolean
  isLogin: boolean
  error: Error
  isSuccess: boolean
  state: 'success' | 'error' | 'loading' | 'idle'
}
const placeHolderAuth: Authorization = {
  userInfo: null,
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
      console.log(t)
      setIsLogin(t)
    })
  }, [])

  const login = (user: IUser) => {
    userLogin(user).then(
      res => {
        if (res) {
          const user: IUserInfo = res as IUserInfo
          if (user.username && user.token) {
            console.log('here is the user')
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
