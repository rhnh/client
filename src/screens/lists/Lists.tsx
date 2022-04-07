import { css } from '@emotion/css'
import { LinkedButton } from 'components/themed-button'
import { WarnSpan } from 'components/themed-components'
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
    return <WarnSpan>Error: while loading lists</WarnSpan>
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
            <div
              key={list._id}
              className={css({
                a: {
                  textDecoration: 'none',
                  textTransform: 'capitalize',
                  display: 'block',
                  color: 'red',
                  padding: '1em',
                  border: '2px solid gray',
                  textAlign: 'center',
                  margin: '.6em',
                  fontSize: '22px',
                },
                'a:hover': {
                  color: 'green',
                  background: 'lightGreen',
                },
              })}
            >
              <Link to={`/${username}/list/${list?.slug}`}>
                {list.listName}
              </Link>
            </div>
          ))}
          <LinkedButton variant="primary" to="/lists/list">
            Create New List
          </LinkedButton>
        </div>
      ) : (
        <div>
          <p>No list found</p>
          <LinkedButton variant="primary" to="/lists/list">
            Create New List
          </LinkedButton>
        </div>
      )}
    </div>
  )
}
