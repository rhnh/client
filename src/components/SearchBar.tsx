import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react'
import { ITaxonomy } from 'utils/types'

interface Props {
  data?: ITaxonomy[] | null
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}
export const SearchBar: FC<Props> = ({ data, setSearch, search }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const birdNames: string[] = data?.map(bird => bird.englishName) as
    | string[]
    | ['']
  return (
    <section
      className={css({
        width: '100%',
        position: 'relative',
        display: 'flex',
      })}
    >
      <Hintput
        type="text"
        onChange={handleChange}
        onBlur={handleChange}
        name="search"
        placeholder="Search"
        style={{
          width: '100%',
          border: '3px solid #00B4CC',
          borderRight: 'none',
          padding: '15px',
          height: '20px',
          outline: '1px solid #00B4CC',
          borderRadius: '5px 0 0 5px',
          color: '#9DBFAF',
        }}
        value={search}
        items={birdNames}
        numberOfSuggestions={0}
      />
      <button
        style={{
          float: 'left',
          width: '20%',
          padding: '10px',
          background: '#00B4CC',
          color: 'white',
          fontSize: '9px',
          outline: '1px solid #00B4CC',
          borderTop: '2px solid #00B4CC',
          borderLeft: 'none',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '0 5px 5px 0',
        }}
      >
        <i className="fa fa-search"></i>
      </button>
    </section>
  )
}
