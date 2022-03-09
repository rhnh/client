import { FC } from 'react'
import { ITaxonomy } from 'utils/types'
import { Taxonomy } from '.'
interface Props {
  taxonomies: ITaxonomy[]
}

export const Taxonomies: FC<Props> = ({ taxonomies }: Props) => {
  if (taxonomies.length <= 0 || taxonomies === undefined) {
    return <p>No Bird found</p>
  }
  return (
    <>
      {taxonomies.map((t: ITaxonomy) => (
        <Taxonomy {...t} />
      ))}
    </>
  )
}
