import { useAuth } from 'contexts/userContext'
import Authenticated from 'screens/authenticated'
import UnAuthenticated from 'screens/unAuthenticated'
import './app.css'

// function App() {
//   const { userInfo } = useAuth()
//   const user = userInfo?.username
//   return user === '' || user === undefined ? (
//     <UnAuthenticated />
//   ) : (
//     <Authenticated />
//   )
// }

import React, { useEffect, useState } from 'react'

type Props = {}

function Counter() {
  const [counts, setCounts] = useState(0)
  const increment = () => setCounts(counter => counter + 1)
  useEffect(() => {
    if (counts > 5) {
      throw new Error('ahahah')
    }
  }, [counts])
  return (
    <div>
      <h1>{counts}</h1>
      <button onClick={() => increment()}>Increment</button>
    </div>
  )
}

const App = (props: Props) => {
  return (
    <div>
      <Counter />
    </div>
  )
}

export default App
