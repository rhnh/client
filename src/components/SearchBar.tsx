import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'

import { ChangeEvent, FC } from 'react'

interface Props {
  data: string[]
  search: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleBlur?: () => void
}
export const SearchBar: FC<Props> = ({
  data,
  search,
  handleBlur,
  handleChange,
}) => {
  return (
    <Hintput
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      name="search"
      placeholder="Search"
      className={css({
        background: '#fff',
        color: 'gray',
        boxShadow: '0 6px 10px 0 rgba(0, 0, 0 , .1)',
        fontSize: '1rem',
        letterSpacing: '5px',

        border: '0',
        outline: '0',
        padding: '22px 18px;',
        width: '100%',
        borderRadius: '25px',
        '::placeholder': {
          textAlign: 'center',
        },
      })}
      value={search}
      items={data}
      numberOfSuggestions={0}
    />
  )
}
