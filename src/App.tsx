import { useAuth } from 'contexts/userContext'
import { Notification } from 'screens/notifications/Notification'
import Authenticated from 'screens/user/authenticated'
import UnAuthenticated from 'screens/user/unAuthenticated'
import './app.css'

function App() {
  const { isLogin } = useAuth()

  return (
    <>
      <Notification />
      {!isLogin ? <UnAuthenticated /> : <Authenticated />}
    </>
  )
}

export default App
