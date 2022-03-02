import { LinkedButton } from 'components/themed-button'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { SERVER_URL } from 'utils/configs'
import { IList } from 'utils/types'

export const Lists: FC = () => {
  const { isLogin, getLocalToken } = useAuth()
  const token = getLocalToken()

  const { data } = useQuery(
    'lists',
    () => {
      return fetch(`${SERVER_URL}/lists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.json())
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  )
  if (!isLogin) {
    return <p>You are not login</p>
  }
  const lists: IList[] = data as IList[]
  console.log(lists)
  if (!lists) {
    return <p>hahah</p>
  }
  return (
    <div>
      {lists ? (
        <div>
          {lists.map(list => (
            <div key={list._id}>{list.listName}</div>
          ))}
        </div>
      ) : (
        <div>No list found</div>
      )}
      <LinkedButton variant="primary" to="/lists/list">
        Create New List
      </LinkedButton>
    </div>
  )
}
