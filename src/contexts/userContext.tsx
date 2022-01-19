import { createContext, FC, useContext } from 'react'
import { UserInfo } from 'utils/types'

interface Authorization {
  user: UserInfo
  login: () => void
  register: () => void
  logout: () => void
  passRecovery: () => void
  userRecovery: () => void
}
const user: Authorization = {
  user: {
    username: '',
    token: '',
  },
  login: () => {},
  register: () => {},
  logout: () => {},
  passRecovery: () => {},
  userRecovery: () => {},
}

const userContext = createContext<Authorization>(user)

export const UserProvider: FC = props => {
  const { children } = props
  return <userContext.Provider value={user}>{children}</userContext.Provider>
}

export const useAuth = () => {
  const context = useContext(userContext)
  // if (!context || context.user.username === '') {
  if (!context) {
    throw new Error('No UserProvider found')
  }
  return context
}
