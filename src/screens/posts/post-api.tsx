import { useAuth } from 'contexts/userContext'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IPost } from 'utils/types'

export const getPostById = (_id: string) => {
  return fetch(`/api/posts/post/${_id}`).then(res => res.json())
}
export function usePostById<IPost>(_id: string) {
  return useQuery<IPost, Error>(
    ['posts', _id],
    () =>
      fetch(`/api/posts/post/${_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(
        res => {
          if (res.ok) return res.json()
          throw new Error('something went wrong')
        },
        err => {
          return err
        },
      ),
    {
      retry: 1,
    },
  )
}

export function usePosts() {
  return useQuery(
    'posts',
    () => {
      return fetch(`/api/posts`).then(res => res.json())
    },
    {
      retry: 1,
    },
  )
}
export function useFeaturedPost() {
  return useQuery<IPost[]>('featured', () => {
    return fetch(`/api/posts/featured`).then(res => {
      return res.json()
    })
  })
}

export function useSetFeatured() {
  const { token } = useAuth()
  const queryClient = useQueryClient()
  return useMutation(
    (id: string) => {
      return fetch(`/api/posts/featured/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        console.log(res.ok, res.status)
        res.json()
      })
    },
    { onSuccess: () => queryClient.invalidateQueries('posts') },
  )
}
export function useUnSetFeatured() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation(
    (id: string) => {
      return fetch(`/api/posts/unfeatured/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        console.log(res.ok, res.status)
        res.json()
      })
    },

    { onSuccess: () => queryClient.invalidateQueries('posts') },
  )
}
