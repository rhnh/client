import { css } from '@emotion/css'

import { FC, ReactElement, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import logo from '../logo2.svg'
import { Menu } from './Menu'

interface Props {
  title?: string
  children: ReactNode
}

export const Header: FC<Props> = ({ title = 'safarilive.org', ...props }) => {
  const children = props.children as ReactElement

  return (
    <header>
      <Menu />
      <div>
        asdfasdfasdf Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        Culpa veniam expedita modi perspiciatis deleniti voluptate quae
        obcaecati nam. Maxime assumenda consectetur delectus id commodi! Amet
        repudiandae sed qui velit fugit.
      </div>
    </header>
  )
}
