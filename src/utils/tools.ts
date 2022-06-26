import { IRank } from './types'

export const numberToDate = (n?: string) => {
  if (n) {
    return new Date(n).toDateString()
  }
  return n
}

export const getParentRank = (rank: IRank): IRank => {
  switch (rank) {
    case 'subfamily':
    case 'family':
      return 'order'
    case 'subgenus':
    case 'genus':
      return 'family'
    case 'species':
    case 'subspecies':
      return 'genus'
    case 'order':
    case 'suborder':
      return 'none'
    default:
      return 'none'
  }
}

export const getChildRank = (rank: IRank): IRank => {
  switch (rank) {
    case 'order':
    case 'suborder':
      return 'family'
    case 'subfamily':
    case 'family':
      return 'genus'
    case 'subgenus':
    case 'genus':
      return 'species'
    case 'species':
    case 'subspecies':
    default:
      return 'none'
  }
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
