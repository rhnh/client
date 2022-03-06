import { useParams } from 'react-router-dom'

interface Props {}

export const List = () => {
  const { listId } = useParams()

  return <div>{listId}</div>
}
