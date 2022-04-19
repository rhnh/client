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
        padding: '15px',
        height: '20px',
        outline: '1px solid #00B4CC',
        borderRadius: '5px 5px',
        color: '#9DBFAF',
        margin: 'auto',
        width: '100%',
      })}
      value={search}
      items={data}
      numberOfSuggestions={0}
    />
  )
}
