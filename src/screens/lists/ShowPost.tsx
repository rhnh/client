import { WarnSpan } from 'components/themed-components'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { usePostById } from 'screens/posts/post-api'
import { IPost } from 'utils/types'

export const ShowPost: FC = () => {
  const { id } = useParams()
  const { isError, isLoading, data } = usePostById(id || '')

  const post = data as typeof data & IPost
  return isLoading ? (
    <p>Loading</p>
  ) : isError ? (
    <WarnSpan>Something went wrong</WarnSpan>
  ) : (
    <div className="post">
      <section>
        <h2>{post.title}</h2>
      </section>
      <p>{post.body}</p>
    </div>
  )
}
