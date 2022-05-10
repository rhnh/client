import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'

import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'

interface Props {
  data: string[]
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}
export const SearchBar: FC<Props> = ({ data, setSearch, search }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  return (
    <Hintput
      type="text"
      onChange={handleChange}
      onBlur={handleChange}
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
