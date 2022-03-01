import { userLogin, userRegister } from 'api/user'
import { useAsync } from 'hooks/useAsync'
import { createContext, FC, useContext, useEffect, useState } from 'react'
import { SERVER_URL } from 'utils/configs'
import { IUser, IUserInfo } from 'utils/types'

async function isVerified(): Promise<boolean> {
  const token = window.localStorage.getItem('token')
  if (token) {
    return window
      .fetch(`${SERVER_URL}/users/verify-user`, {
        method: 'post',
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      })
      .then(res => {
        console.log(res.body, res.ok, res.status)
        return res.ok ? true : false
      })
  }
  return false
}
function setLocalToken(token: string) {
  console.log(token)
  window.localStorage.setItem('token', token)
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
  isError: boolean
  isLogin: boolean
  error: Error
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
  } = useAsync<IUserInfo | null>({
    data: { username: '', token: '' },
    state: 'idle',
  })

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    console.log('refreshing')
    isVerified().then(t => {
      console.log(t)
      setIsLogin(t)
    })
  }, [])

  const login = (user: IUser) => {
    userLogin(user)
      .then(
        res => {
          const user = res as typeof res & IUserInfo
          if (user.token && user.username) {
            setIsLogin(true)
            setUser(user)
            return user
          } else {
            setUser(null)
            return ''
          }
        },
        err => {
          console.log('so it is here')
          setError(err)
          return err
        },
      )
      .then(user => {
        setLocalToken(user.token)
        setIsLogin(true)
      })
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
    setUser({
      username: '',
      token: '',
    })
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
