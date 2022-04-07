import { InfoSpan } from 'components/themed-components'
import { FC } from 'react'

import { ITaxonomy } from 'utils/types'
import { Taxonomy } from './Taxonomy'

interface Props {
  taxonomies: ITaxonomy[]
}

export const Taxonomies: FC<Props> = ({ taxonomies }: Props) => {
  if (taxonomies.length <= 0 || taxonomies === undefined) {
    return <InfoSpan>No Bird found</InfoSpan>
  }
  return (
    <>
      {taxonomies.map((t: ITaxonomy) => (
        <Taxonomy {...t} />
      ))}
    </>
  )
}
