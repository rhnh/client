import { css } from '@emotion/css'
import useTaxonomies from 'hooks/useTaxonomies'
import { Taxonomy } from 'utils/types'
import { TaxonomyScreen } from './taxonomy'
import * as colors from 'utils/colors'
export const Taxonomies = () => {
  const { data } = useTaxonomies()
  const taxonomies: Taxonomy[] = (data as Taxonomy[]) || []

  return (
    <div>
      <TaxonomyScreen taxonomies={taxonomies} />
    </div>
  )
}
