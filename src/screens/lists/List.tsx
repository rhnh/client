import { LinkedButton } from 'components/themed-button'
import { useParams } from 'react-router-dom'
import { useGetUserList } from './listHooks'
import { ITaxonomy } from 'utils/types'
export const List = () => {
  const { listName } = useParams()

  const { isLoading, isError, data } = useGetUserList(listName || '')
  const birds: ITaxonomy[] = data as ITaxonomy[]

  return isLoading ? (
    <p>Loading</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    <div>
      <section>
        <h3>{listName}</h3>
        {birds.map(bird => (
          <div key={bird._id}>{bird.englishName}</div>
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
