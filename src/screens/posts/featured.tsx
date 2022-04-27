import { FullPageSpinner, WarnBox } from 'components/themed-components'
import { FC } from 'react'
import { FeaturedPost } from './FeaturedPost'
import { useFeaturedPost } from './post-api'

const FeaturedArticle: FC = () => {
  const { data: posts, isLoading, isError } = useFeaturedPost()
  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <WarnBox>Server down</WarnBox>
  ) : (
    <div className="center">
      {posts && posts?.length > 0
        ? posts.map(post => {
            return (
              <FeaturedPost
                key={post._id}
                title={post.title}
                body={post?.body}
                image_url={post?.image_url}
                _id={post?._id}
              />
            )
          })
        : null}
    </div>
  )
}

export default FeaturedArticle
