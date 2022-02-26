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
  isError: boolean
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
  } = useAsync<IUserInfo>({ data: { username: '', token: '' }, state: 'idle' })

  const login = (user: IUser) => {
    userLogin(user).then(
      res => setUser({ username: 'john', token: '' }),
      err => {
        setError(err)
      },
    )
  }

  const register = (user: IUser) => {
    userRegister(user).then(
      res => setUser({ username: 'john', token: '' }),
      err => {
        setError(err)
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
