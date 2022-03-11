import { LinkedButton } from 'components/themed-button'
import { Link, useParams } from 'react-router-dom'
import { useGetUserList } from './listHooks'
import { ITaxonomy } from 'utils/types'
import { SearchBar } from 'components/SearchBar'
import { useState } from 'react'
export const List = () => {
  const { listName } = useParams()

  const { isLoading, isError, data } = useGetUserList(listName || '')
  const birds: ITaxonomy[] = data as ITaxonomy[]
  const [search, setSearch] = useState('')
  return isLoading ? (
    <p>Loading</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    <div>
      <section>
        <SearchBar search={search} setSearch={setSearch} data={birds} />
      </section>
      <section>{search}</section>
      <section>
        <h3>{listName}</h3>
        {birds.map(bird => (
          <div key={bird._id}>
            <Link
              to={`/taxonomy/${bird._id
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/, '-')}`}
            >
              {bird.englishName}
            </Link>
          </div>
        ))}
      </section>

      <section>
        <LinkedButton variant="primary" to={`/taxonomies/${listName}`}>
          Add To you list
        </LinkedButton>
      </section>
    </div>
  )
}
