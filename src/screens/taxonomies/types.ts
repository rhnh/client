import { ITaxonomy } from 'utils/types'

export interface IProps {
  englishName: HTMLInputElement
  info: HTMLInputElement
  parent: HTMLInputElement
  order: HTMLInputElement
  family: HTMLInputElement
  genus: HTMLInputElement
  taxonomyName: HTMLInputElement
  image: HTMLInputElement
  rank: HTMLSelectElement
}
export interface TaxonomiesProps {
  page: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalPages: number
  nextPage: number
  previousPage: number
  totalItems: number
  items: ITaxonomy[]
}
