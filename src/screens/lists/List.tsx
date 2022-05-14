import { useParams } from 'react-router-dom'
import '@reach/dialog/styles.css'
import { FullPageSpinner, ReLoginButton } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { Hintput } from '@ribrary/hintput'
import { ChangeEvent, useState } from 'react'
import { useGetUserList } from './list-api'
import { css } from '@emotion/css'
import { ListItems } from './ListItems'
import { IListBird } from 'utils/types'
import { CreateUserTaxonomy } from 'screens/taxonomies/CreateUserTaxonomy'
import { Button } from 'components/themed-button'

export const List = () => {
  const { listName } = useParams()
  const { isLogin } = useAuth()
  const [search, setSearch] = useState('')

  const { isLoading, isError, data } = useGetUserList(listName || '')
  const [birds, setBirds] = useState<IListBird[]>(data ?? [])

  const names: string[] = Array.isArray(data)
    ? (data?.map(bird => bird.englishName) as string[])
    : []

  if (!isLogin) {
    return <ReLoginButton />
  }
  if (!data && isLoading) {
    return <FullPageSpinner />
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (search === '') {
      setBirds(data ?? [])
    } else {
      const b: IListBird[] =
        data?.filter(bird =>
          bird.englishName
            .trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
        ) || []
      setBirds(b)
    }
    setSearch(e.target.value)
  }

  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <p>Error</p>
  ) : (
    <div>
      <section
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          gap: '.6em',
          flexDirection: 'column',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'row',
          })}
        >
          <Hintput
            numberOfSuggestions={2}
            items={names}
            onChange={handleChange}
            onBlur={handleChange}
            value={search}
            placeholder="Enter names of Birds"
            className={css({
              padding: '10px',
              fontSize: '17px',
              border: '1px solid grey',
              float: 'left',
              width: '95%',
              borderRadius: '25px',
            })}
          />
          <Button variant="secondary">Advance Search</Button>
        </div>
        <CreateUserTaxonomy />
      </section>

      <section
        className={css({
          padding: '1em',
        })}
      >
        <ListItems birds={birds} />
      </section>
    </div>
  )
}
