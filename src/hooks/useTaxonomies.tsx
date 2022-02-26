import { useQuery } from 'react-query'
import { SERVER_URL } from 'utils/configs'
import { ITaxonomy } from 'utils/types'

const getTaxonomies = async (): Promise<ITaxonomy[]> => {
  const response = await fetch(`${SERVER_URL}/taxonomies`)
  if (response.ok) {
    return response.json() as unknown as ITaxonomy[] | []
  } else {
    return []
  }
}

export default function useTaxonomies() {
  return useQuery('taxonomies', getTaxonomies)
}
