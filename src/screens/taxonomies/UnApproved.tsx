import React, { FC } from 'react'
import { ITaxonomy } from 'utils/types'
import { useGetUnApproved } from './taxonomies-api'
interface WithContributor extends ITaxonomy {
  contributor: string
  role: string
}
export const UnApproved: FC = () => {
  const { data } = useGetUnApproved()
  console.log(data)
  return <div></div>
}
