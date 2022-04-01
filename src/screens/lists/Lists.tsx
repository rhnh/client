import { LinkedButton } from 'components/themed-button'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'

import { Link } from 'react-router-dom'
import { IList } from 'utils/types'
import { useLists } from './list-api'

export const Lists: FC = () => {
  const { isLogin, username } = useAuth()
  const { data, isError } = useLists()
  if (!isLogin) {
    return <p>You are not login</p>
  }

  if (isError) {
    return <p>Error: while loading lists</p>
  }
  const lists: IList[] = data as IList[]

  if (!lists) {
    return (
      <div>
        No list found
        <LinkedButton variant="primary" to="/lists/list">
          Create New List
        </LinkedButton>
      </div>
    )
  }
  return (
    <div>
      {lists && lists?.length > 0 ? (
        <div>
          {lists.map(list => (
            <div key={list._id}>
              <Link to={`/${username}/list/${list?.slug}`}>
                {list.listName}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>No list found</div>
      )}
    </div>
  )
}
