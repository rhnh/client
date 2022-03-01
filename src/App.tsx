import { useAuth } from 'contexts/userContext'
import Authenticated from 'screens/authenticated'
import UnAuthenticated from 'screens/unAuthenticated'
import './app.css'

function App() {
  const { isLogin } = useAuth()

  return !isLogin ? <UnAuthenticated /> : <Authenticated />
}

export default App
