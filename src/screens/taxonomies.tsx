import useTaxonomies from 'hooks/useTaxonomies'
import { ITaxonomy } from 'utils/types'
import { TaxonomyScreen } from './taxonomy'

import { ChangeEvent } from 'react'
import { Hintput } from 'components/hintput'
export const Taxonomies = () => {
  // const { data } = useTaxonomies()
  // const taxonomies: ITaxonomy[] = (data as ITaxonomy[]) || []

  const handleChange = (e: ChangeEvent) => {
    console.log('hahhs')
  }
  // console.log(taxonomies)
  return (
    <div>
      <Hintput
        placeholder="search" //optional
        name="search"
        items={['fish eagle', 'something', 'nothing', 'others', 'theres']}
        handleChange={handleChange}
        handleBlur={handleChange}
        numberOfSuggestions={3} //optional
        //optional { It has  1px default border }
        className="my-custom-css" //optional   { It has  1px default border }
      />
      {/* <TaxonomyScreen taxonomies={taxonomies} /> */}
    </div>
  )
}
