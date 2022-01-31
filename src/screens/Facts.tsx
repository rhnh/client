import { css } from '@emotion/css'
import { FC } from 'react'

const Facts: FC = () => {
  return (
    <section
      className={css({
        // textAlign: 'center',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1em',
        '@media screen and (min-width: 600px)': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          alignItems: 'left',
          textAlign: 'left',
        },
      })}
    >
      <strong>Click here for more thumb quiz</strong>
      <div>
        <img src="/thumbs/1.jpg" alt="thumb"></img>
      </div>
    </section>
  )
}

export default Facts
