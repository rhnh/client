import { css } from '@emotion/css'
import { LinkedButton } from 'components/themed-button'
import { FullPageSpinner, WarnBox } from 'components/themed-components'

import { FC } from 'react'

import { Link } from 'react-router-dom'
import { IList } from 'utils/types'
import { useLists } from './list-api'
import * as colors from 'utils/colors'
import { useAuth } from 'contexts/userContext'

export const Lists: FC = () => {
  const { data, isError, isLoading } = useLists()
  const { username } = useAuth()
  if (isLoading) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <WarnBox>Error: while loading lists</WarnBox>
  }
  const lists: IList[] = data as IList[]

  if (!lists || lists.length <= 0) {
    return (
      <div>
        No list found
        <LinkedButton variant="primary" to={`/lists/${username}/list`}>
          Create
        </LinkedButton>
      </div>
    )
  }
  if (isLoading) {
    return <FullPageSpinner />
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
      <section
        className={css({
          marginBottom: '1em',
        })}
      >
        <span>You have {lists.length} lists</span>
      </section>
      {lists && lists?.length > 0 ? (
        <div
          className={css({
            '@media screen and (min-width:700px)': {
              maxWidth: '230px',
            },
          })}
        >
          {lists?.map(list => (
            <div key={list._id}>
              <Link
                to={`/lists/${username}/list/${list?.slug}`}
                className={css({
                  display: 'flex',
                  flexDirection: 'column',

                  textDecoration: 'none',
                  textTransform: 'capitalize',
                  color: colors.red,

                  ':hover': {
                    color: 'green',
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
          <section
            className={css({
              marginTop: '1em',
            })}
          >
            <LinkedButton variant="primary" to={`/lists/${username}/list`}>
              Create New List
            </LinkedButton>
          </section>
        </div>
      ) : (
        <div>
          <p>No list found</p>
          <LinkedButton variant="primary" to={`/lists/${username}/list`}>
            Create New List
          </LinkedButton>
        </div>
      )}
    </div>
  )
}
