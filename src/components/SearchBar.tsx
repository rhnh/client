import { css } from '@emotion/css'
import { ChangeEvent, FC } from 'react'
import * as colors from 'utils/colors'

type Props = {
  handleChange(e: ChangeEvent<HTMLInputElement>): void
  reset(): void
  search: string
}

export const SearchBar: FC<Props> = ({ handleChange, reset, search }) => {
  return (
    <div
      className={css({
        background: colors.primary,
        height: '40px',
        display: 'flex',
        borderRadius: '40px',
        margin: '1em',
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; ',
        padding: '10px',
        ':hover': {
          background: colors.primaryLight,
        },
        ':hover > input': {
          width: '100%',
          margin: 0,
          padding: 0,
          marginLeft: '10px',
        },

        ':hover > button:before': {
          content: '"x"',
          width: '140px',
          height: '140px',
          color: colors.primaryDark,
        },
        ':hover > button:hover': {
          background: colors.primary,
          width: '40px',
          height: '40px',
          color: 'white',
        },
      })}
    >
      <input
        type="text"
        id="search"
        value={search}
        onChange={handleChange}
        className={css({
          border: 'none',
          outline: 'none',
          background: 'none',
          padding: '0',
          fontSize: '22px',
          marginLeft: '10px',
          transition: 'all 0.5s ease-out',
          lineHeight: '40px',
          width: '0px',
          caretColor: colors.primaryDark,
          ':focus': {
            width: '100%',
            margin: 0,
            padding: 0,
            marginLeft: '10px',
          },
          ':focus + button:before': {
            content: '"x"',
            width: '140px',
            height: '140px',
            // color: colors.primaryDark,
            background: 'none',
            border: 'none',
          },
        })}
        placeholder="Search"
      />
      <button
        onClick={reset}
        className={css({
          ':focus-visible': {
            border: 'none',
            background: 'none',
            outline: 'none',
          },
          transition: 'all 0.5s ease-out',
          border: 'none',
          ':before': {
            content: '"Search"',
          },
          color: 'white',
          borderRadius: '50%',
          background: 'none',
          width: '40px',
          height: '40px',
          fontSize: '22px',
        })}
      ></button>
    </div>
  )
}
