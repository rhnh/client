import { css } from '@emotion/css'
import { FC } from 'react'

export const About: FC = () => {
  return (
    <div
      className={css({
        padding: '1em',
      })}
    >
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
          https://svgrepo.com/"
          >
            svgrepo
          </a>
        </li>
        <li>
          <a href="https:/unsplash.com">Unsplash</a>
        </li>
      </ul>
      <div>
        <h2>Privacy</h2>
        safarilive.org neither collect personal information or send it to the
        third party.
      </div>
      <dl>
        <dt>
          <h2>Contribute</h2>
        </dt>
        <dd>github.com/rhnh/</dd>
      </dl>
      <dl>
        <dt>
          <h3>Contact</h3>
        </dt>
        <dd>Tweet @ twitter.com/safariliveorg</dd>
      </dl>
    </div>
  )
}
