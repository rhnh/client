import { useAuth } from 'contexts/userContext'
import Authenticated from 'screens/user/authenticated'
import UnAuthenticated from 'screens/user/unAuthenticated'
import './app.css'

function App() {
  const { isLogin } = useAuth()

  return !isLogin ? <UnAuthenticated /> : <Authenticated />
}

export default App
