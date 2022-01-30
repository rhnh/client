import Authenticated from 'screens/authenticated'
import UnAuthenticated from 'screens/unAuthenticated'
import './app.css'

function App() {
  const user = null
  return user == null ? <UnAuthenticated /> : <Authenticated />
}

export default App
