import { FC } from 'react'
import { useQuery } from 'react-query'
export const Lists: FC = () => {
  const { data: lists } = useQuery('lists', () => {
    return fetch('/lists').then(res => res.json())
  })
  console.log(lists)
  return <div></div>
}
