import { css } from '@emotion/css'
import useTaxonomies from 'hooks/useTaxonomies'
import { ITaxonomy } from 'utils/types'
import { TaxonomyScreen } from './taxonomy'
import * as colors from 'utils/colors'
export const Taxonomies = () => {
  const { data } = useTaxonomies()
  const taxonomies: ITaxonomy[] = (data as ITaxonomy[]) || []

  return (
    <div>
      <TaxonomyScreen taxonomies={taxonomies} />
    </div>
  )
}
