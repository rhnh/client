import { css } from '@emotion/css'
import { FC } from 'react'

export const About: FC = () => {
  return (
    <div>
      <h2>About</h2>
      Safarilive.org is an open source, non-commercial tiny website for
      WildEarth.tv viewers.
      <ul
        className={css({
          listStyle: 'none',
        })}
      >
        <li>Some are images are from https://wikipedia.org.</li>

        <li>
          SVGs are from{' '}
          <a
            href="

          https://freesvg.org/"
          >
            FreeSVG
          </a>{' '}
          and{' '}
          <a
            href="
          https://svgrepo.com/"
          >
            svgrepo
          </a>
        </li>
        <li>
          Background image is by <span>Damian Patkowski</span>
          link to{' '}
          <a href=" https://unsplash.com/photos/yABuQgOY2js">unsplash</a>
        </li>
      </ul>
      <div>
        <h2>Privacy</h2>
        safarilive.org doesn't collect user data.Neither send to 3rd party
      </div>
      <h2>Contribute</h2>
      Tweet @twitter.com/safariliveorg
      <h3>Contact</h3>
      Tweet @ twitter.com/safariliveorg
    </div>
  )
}
