import { useParams } from 'react-router-dom'
import '@reach/dialog/styles.css'
import { FullPageSpinner, ReLoginButton } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, useState } from 'react'
import { useGetListItems } from './list-api'
import { css } from '@emotion/css'
import { ListItems } from './ListItems'
import { IListTaxonomy } from 'utils/types'
import { CreateUserTaxonomy } from 'screens/taxonomies/CreateUserTaxonomy'
import { useEffect } from 'react'
import { SearchBar } from 'components/SearchBar'
import { CRUDList } from './CRUDList'

export const List = () => {
  const [search, setSearch] = useState('')
  const { listName } = useParams()
  const { isLogin } = useAuth()

  const { isLoading, isError, data } = useGetListItems(listName || '')
  const [birds, setBirds] = useState<IListTaxonomy[]>([])

  useEffect(() => {
    const b: IListTaxonomy[] = data as unknown as IListTaxonomy[]
    setBirds(b || [])
  }, [data])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    const filtered = birds?.filter((bird: IListTaxonomy) =>
      bird.englishName?.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    setBirds(filtered || [])
  }

  if (!isLogin) {
    return <ReLoginButton />
  }
  if (!data && isLoading) {
    return <FullPageSpinner />
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
        ></div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          })}
        >
          <h1>{listName}</h1>

          <CRUDList listName={listName} />
        </div>
        <CreateUserTaxonomy />
      </section>

      <SearchBar
        search={search}
        handleChange={handleChange}
        reset={() => setSearch('')}
      />
      <section
        className={css({
          padding: '1em',
        })}
      >
        <ListItems birds={birds || []} />
      </section>
    </div>
  )
}
