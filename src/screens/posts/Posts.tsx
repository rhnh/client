import { LinkedButton } from 'components/themed-button'
import { InfoSpan } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'

import { IPost } from 'utils/types'
import { Post } from './Post'
import { usePosts } from './post-api'

export const Posts: FC = () => {
  const { userInfo } = useAuth()
  const role = userInfo?.role
  const { isLoading, isError, error, data: posts } = usePosts()
  const err: Error = error as Error

  return isLoading ? (
    <p>loading</p>
  ) : isError ? (
    <InfoSpan>
      {console.log(error)}
      {err?.message}
    </InfoSpan>
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
                  _id={post._id}
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
