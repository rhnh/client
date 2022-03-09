import { LinkedButton } from 'components/themed-button'
import { useParams } from 'react-router-dom'
import { useGetUserList } from './listHooks'
import { ITaxonomy } from 'utils/types'
export const List = () => {
  const { listName } = useParams()

  const { isLoading, isError, isFetched, isSuccess, data } = useGetUserList(
    listName || '',
  )
  const birds: ITaxonomy[] = data as ITaxonomy[]
  if (isLoading) {
    return <p>loading...</p>
  }
  console.log(data)
  return (
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
