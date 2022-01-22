import { Authenticated } from 'screens/authenticated'
import { Unauthenticated } from 'screens/unauthenticated'
function App() {
  const user = null
  return user === null ? <Unauthenticated /> : <Authenticated />
}

export default App
