import { userLogin, userRegister } from 'api/user'
import { useAsync } from 'hooks/useAsync'
import { createContext, FC, useContext } from 'react'
import { IUser, IUserInfo } from 'utils/types'

interface Authorization {
  userInfo: IUserInfo | undefined | null
  login: (user: IUser) => void
  register: (user: IUser) => void
  logout: () => void
  passRecovery: () => void
  usernameRecovery: () => void
}
const user: Authorization = {
  userInfo: null,
  login: (user: IUser) => {},
  register: () => {},
  logout: () => {},
  passRecovery: () => {},
  usernameRecovery: () => {},
}

const userContext = createContext<Authorization>(user)

export const UserProvider: FC = ({ children }) => {
  const {
    setData: setUser,
    data: userInfo,
    isLoading,
    isError,
    setError,
    error,
  } = useAsync<IUserInfo>({ data: { username: '', token: '' }, state: 'idle' })
  const err = error as Error
  const login = (user: IUser) => {
    userLogin(user).then(u => {
      const user: IUserInfo = u as IUserInfo
      const { username, token } = user
      setUser({ username, token })
      localStorage.setItem('username', username)
    })
  }

  const register = (user: IUser) => {
    userRegister(user).then(
      u => {
        const user: IUserInfo = u as IUserInfo
        const { username, token } = user
        setUser({ username, token })
        console.log('here')
        localStorage.setItem('username', username)
      },
      err => {
        const error: Error = err as Error
        console.log('there')
        console.log(err)
        setError(error)
      },
    )
  }
  const logout = () => {
    localStorage.removeItem('username')
    setUser({
      username: '',
      token: '',
    })
  }
  if (isLoading) {
    return <p>loading...</p>
  }
  if (isError) {
    return <p>Something went error {`${JSON.stringify(err?.status)}`}</p>
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
