import { LinkedButton } from 'components/themed-button'
import { FC } from 'react'
import { useQuery } from 'react-query'
import { SERVER_URL } from 'utils/configs'
import { IPost } from 'utils/types'
import { FeaturedPost } from './post'

const Posts: FC = () => {
  const { isLoading, data: posts } = useQuery('posts', () => {
    return fetch(`${SERVER_URL}/posts`).then(res => res.json())
  })
  return isLoading ? (
    <p>loading</p>
  ) : (
    <div>
      {posts.length <= 0 ? (
        <p>No Posts found</p>
      ) : (
        <div>
          {posts.map((post: IPost) => {
            return (
              <div key={post._id}>
                <FeaturedPost
                  title={post.title}
                  body={post.body}
                  image_url={post.image_url}
                />
              </div>
            )
          })}
        </div>
      )}
      <LinkedButton to="/posts/post" variant="primary">
        Create New Post
      </LinkedButton>
    </div>
  )
}

export default Posts
