import { css } from '@emotion/css'
import { Button } from 'components/themed-button'
import { Input } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import * as colors from 'utils/colors'

export const CreateList: FC = () => {
  const [listName, setListName] = useState('')
  const { isLogin, getLocalToken, username } = useAuth()
  const queryClient = useQueryClient()
  const { mutate, isError, error, isSuccess } = useMutation(
    (listName: string) => {
      return fetch(`/api/lists/${listName}`, {
        body: JSON.stringify({ listName }),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getLocalToken()}`,
        },
      }).then(
        res => {
          if (res.status === 400) {
            throw new Error(`The list name  ${listName} already exists.`)
          }
          if (res.ok) {
            return res.json()
          }
        },
        err => {
          throw err
        },
      )
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('lists')
      },
    },
  )
  const isEmpty = listName === ''
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setListName(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & { listName: HTMLInputElement }
    const listName = target.listName.value
    mutate(listName)
  }
  const err = error as Error
  if (isError) {
    return (
      <p
        className={css({
          color: 'red',
        })}
      >
        Error: {err?.message}
      </p>
    )
  }
  if (isSuccess) {
    return (
      <div
        className={css({
          minHeight: '100vh',
        })}
      >
        You have successfully created {listName}
        <section>
          Click <Link to={`/lists/${username}`}> here </Link>to see all your
          lists.
        </section>
      </div>
    )
  }
  return isLogin ? (
    <div
      className={css({
        display: 'flex',
        backgroundColor: colors.plate,
        margin: 'auto',
        marginTop: '1.5em',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '5px',
        minHeight: '100vh',
        '@media screen and (max-width:600px)': {
          maxWidth: '500px',
          justifyContent: 'center',
          alignItems: 'center',
        },
      })}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <h2
            className={css({
              background: colors.base,
              top: 0,
              marginTop: 0,
              borderRadius: '5px 5px 0 0',

              padding: '1em',
              color: colors.primaryText,
            })}
          >
            Create New List
          </h2>
          <section
            className={css({
              padding: '1em',
            })}
          >
            <label htmlFor="list-name">Enter List Name</label>
            <Input
              type="text"
              id="listName"
              placeholder="Djuma or Mara"
              onChange={handleChange}
            />
            <div>
              <Button variant="primary" disabled={isEmpty}>
                Create
              </Button>
            </div>
          </section>
        </div>
      </form>
    </div>
  ) : (
    <p>You need to be authorized</p>
  )
}
