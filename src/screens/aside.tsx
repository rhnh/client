import { Button } from 'components/themed-components'
import { FC } from 'react'

const Aside: FC = () => {
  return (
    <aside className="aside">
      <h3>Join safarilive to create your now birding list!</h3>
      <Button variant="primary">Register</Button>
      <Button variant="secondary">Login</Button>
    </aside>
  )
}

export default Aside
