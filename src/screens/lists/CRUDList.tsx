import { CRUDNav } from 'components/CrudNav'
import { FC } from 'react'
import { IList } from 'utils/types'
import { DeleteList } from './DeleteList'
import { UpdateList } from './UpdateList'

type Props = {
  list: IList
}

export const CRUDList: FC<Props> = ({ list }) => {
  return (
    <section>
      <CRUDNav orientation="left">
        <UpdateList list={list} />
        <DeleteList list={list} />
      </CRUDNav>
    </section>
  )
}
