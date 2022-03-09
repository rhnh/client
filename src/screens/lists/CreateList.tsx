import { css } from '@emotion/css'
import { Button } from 'components/themed-button'
import { Input } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useMutation } from 'react-query'
import { Link } from 'react-router-dom'
import { SERVER_URL } from 'utils/configs'

export const CreateList: FC = () => {
  const [listName, setListName] = useState('')
  const { isLogin, getLocalToken } = useAuth()
  const { mutate, isError, error, isSuccess } = useMutation(
    (listName: string) => {
      return fetch(`${SERVER_URL}/lists/${listName}`, {
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
      <div>
        Well Done
        <section>
          Click <Link to="/lists"> here </Link>to see all your lists.
        </section>
      </div>
    )
  }
  return isLogin ? (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2em',
      })}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="list-name">List Name</label>
          <Input
            type="text"
            id="listName"
            placeholder="Djuma or Mara"
            onChange={handleChange}
          />
        </div>
        <div>
          <Button variant="primary" disabled={isEmpty}>
            Create
          </Button>
        </div>
      </form>
    </div>
  ) : (
    <p>You need to be authorized</p>
  )
}
