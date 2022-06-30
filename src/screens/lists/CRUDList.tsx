import { CRUDNav } from 'components/CrudNav'
import { FC } from 'react'

import { DeleteList } from './DeleteList'
import { UpdateList } from './UpdateList'

type Props = {
  listName?: string
}

export const CRUDList: FC<Props> = ({ listName = '' }) => {
  return (
    <section>
      <CRUDNav orientation="left">
        <UpdateList listName={listName} />
        <DeleteList listName={listName} />
      </CRUDNav>
    </section>
  )
}
