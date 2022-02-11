import { useAuth } from 'contexts/userContext'
import Authenticated from 'screens/authenticated'
import UnAuthenticated from 'screens/unAuthenticated'
import './app.css'

function App() {
  const { userInfo } = useAuth()
  const user = userInfo?.username
  return user === '' || user === undefined ? (
    <UnAuthenticated />
  ) : (
    <Authenticated />
  )
}

export default App
