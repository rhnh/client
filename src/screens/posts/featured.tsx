import { FC } from 'react'
import { useQuery } from 'react-query'

import { IPost } from 'utils/types'
import { FeaturedPost } from './FeaturedPost'

const FeaturedArticle: FC = () => {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<IPost>('featured', () => {
    return fetch(`/api/posts/featured`).then(res => res.json())
  })
  return isLoading ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Error</p>
  ) : (
    <div>
      {post ? (
        <FeaturedPost
          title={post.title}
          body={post?.body}
          image_url={post?.image_url}
        />
      ) : null}
    </div>
  )
}

export default FeaturedArticle
