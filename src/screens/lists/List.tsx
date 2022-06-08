import { useParams } from 'react-router-dom'
import '@reach/dialog/styles.css'
import { FullPageSpinner, ReLoginButton } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, useState } from 'react'
import { useGetUserList } from './list-api'
import { css } from '@emotion/css'
import { ListItems } from './ListItems'
import { IList, ITaxonomy } from 'utils/types'
import { CreateUserTaxonomy } from 'screens/taxonomies/CreateUserTaxonomy'
import { useEffect } from 'react'
import { SearchBar } from 'components/SearchBar'
const placeholder: IList = {
  listName: '',
  birds: [],
  username: '',
}
export const List = () => {
  const [search, setSearch] = useState('')
  const { listName } = useParams()
  const { isLogin } = useAuth()

  const { isLoading, isError, data } = useGetUserList(listName || '')

  const [list, setList] = useState<IList>(
    (data as unknown as IList) ?? placeholder,
  )
  const [birds, setBirds] = useState<ITaxonomy[]>([])

  useEffect(() => {
    setBirds(list?.birds || [])
  }, [list?.birds])

  useEffect(() => {
    setList((data as unknown as IList) ?? placeholder)
  }, [data])

  const names: string[] = Array.isArray(birds)
    ? (birds?.map(bird => bird?.englishName) as string[])
    : []

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    const filtered = list?.birds?.filter(bird =>
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
        <div>
          <h3>{listName}</h3>
        </div>
        <CreateUserTaxonomy />
      </section>
      <SearchBar
        data={names}
        search={search}
        handleChange={handleChange}
        handleBlur={() => {}}
      />
      <section
        className={css({
          padding: '1em',
        })}
      >
        <ListItems birds={birds || []} listName={listName} />
      </section>
    </div>
  )
}
