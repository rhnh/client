import { css } from '@emotion/css'
import { LinkedButton } from 'components/themed-button'
import { WarnSpan } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'

import { Link } from 'react-router-dom'
import { IList } from 'utils/types'
import { useLists } from './list-api'
import * as colors from 'utils/colors'
export const Lists: FC = () => {
  const { isLogin, username } = useAuth()
  const { data, isError } = useLists()
  if (!isLogin) {
    return <p>You are not login</p>
  }
  if (!data) {
    return null
  }
  console.log(data, isError, username)
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
    <div
      className={css({
        minHeight: '100vh',
        '@media screen and (min-width:700px)': {
          maxWidth: '1024px',
          margin: '1em auto',
        },
      })}
    >
      {lists && lists?.length > 0 ? (
        <div
          className={css({
            '@media screen and (min-width:700px)': {
              maxWidth: '230px',
            },
          })}
        >
          {lists.map(list => (
            <div key={list._id}>
              <Link
                to={`/${username}/list/${list?.slug}`}
                className={css({
                  display: 'flex',
                  flexDirection: 'column',

                  textDecoration: 'none',
                  textTransform: 'capitalize',
                  color: colors.red,

                  ':hover': {
                    color: 'green',
                    // background: 'lightGreen',
                    opacity: '0.6',
                  },
                })}
              >
                {/* <img
                  src={listIcon}
                  alt=""
                  className={css({ width: '50px', height: 'auto' })}
                /> */}
                <span>{list.listName}</span>
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
