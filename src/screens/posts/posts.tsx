import { LinkedButton } from 'components/themed-button'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import { useQuery } from 'react-query'

import { IPost } from 'utils/types'
import { Post } from './post'

export const Posts: FC = () => {
  const { userInfo } = useAuth()
  const role = userInfo?.role
  const { isLoading, data: posts } = useQuery(
    'posts',
    () => {
      return fetch(`/api/posts`).then(res => res.json())
    },
    {
      retry: 1,
    },
  )

  return isLoading ? (
    <p>loading</p>
  ) : (
    <div>
      {posts?.length <= 0 ? (
        <p>No Posts found</p>
      ) : (
        <div>
          {posts.map((post: IPost) => {
            return (
              <div key={post._id}>
                <Post
                  title={post.title}
                  body={post.body}
                  image_url={post.image_url}
                />
              </div>
            )
          })}
        </div>
      )}
      {role === 'admin' && (
        <LinkedButton variant="primary" to="/posts/post">
          Create New
        </LinkedButton>
      )}
    </div>
  )
}
