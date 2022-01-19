import { Header } from 'components/header'
import { Nav } from 'components/nav'
import { NavLink } from 'react-router-dom'

interface Props {}

export const Authenticated = (props: Props) => {
  return (
    <div>
      <Header>
        <p>Hello</p>
      </Header>
    </div>
  )
}
