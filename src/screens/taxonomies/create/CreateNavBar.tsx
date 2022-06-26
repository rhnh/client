import { css } from '@emotion/css'
import { Children, FC } from 'react'

export const CreateNavBar: FC = ({ children }) => {
  let c = Children.map(children, child => {
    return (
      <ul
        className={css({
          listStyle: 'none',
        })}
        role="tablist"
      >
        <li
          role="presentation"
          className={css({
            ':before': {
              position: 'absolute',
              content: `''`,
              borderBottom: '2px solid #ccc',
              width: '100%',
              top: '20px',
              left: '-50%',
              zIndex: '2',
            },
            ':after': {
              position: 'absolute',
              content: `""`,
              borderBottom: '2px solid #ccc',
              width: '100%',
              top: '20px',
              left: '50%',
              zIndex: '2',
            },
          })}
        >
          <a
            className="persistant-disabled"
            href="#stepper-step-1"
            data-toggle="tab"
            aria-controls="stepper-step-1"
            role="tab"
            title="Step 1"
          >
            {child}
          </a>
        </li>
      </ul>
    )
  })

  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
      })}
    >
      {c}
    </div>
  )
}
