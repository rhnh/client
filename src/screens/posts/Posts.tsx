import { css } from '@emotion/css'
import { LinkedButton } from 'components/themed-button'
import { FullPageSpinner, InfoBox } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { FC, useEffect, useState } from 'react'
// import * as colors from 'utils/colors'
import { IPost } from 'utils/types'
import { Post } from './Post'
import { usePosts } from './post-api'

interface RPost extends IPost {
  createdAt: Required<string>
}

// function compare(a: , b: ) {
//   if (a?.createdAt < b?.createdAt) {
//     return -1
//   }
//   if (a?.createdAt > b?.createdAt) {
//     return 1
//   }
//   return 0
// }

export const Posts: FC = () => {
  const { /*userInfo,*/ isLogin } = useAuth()
  // const role = userInfo?.role
  const { isLoading, isError, error, data } = usePosts()
  const err: Error = error as Error
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(() => {
    setPosts(data ?? [])
  }, [data])
  return isLoading ? (
    <FullPageSpinner />
  ) : isError ? (
    <InfoBox>
      {console.error(error)}
      {err?.message}
    </InfoBox>
  ) : (
    <div
      className={css({
        // height: '100vh',
      })}
    >
      {/* {role === 'admin' ||
        (role === 'mod' && (
          <LinkedButton variant="primary" to="/posts/post">
            Create New
          </LinkedButton>
        ))} */}
      {/* allow every to post for now */}
      {/* {role === 'admin' || */}
      {isLogin && (
        <LinkedButton variant="primary" to="/posts/post">
          Create New
        </LinkedButton>
      )}
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
    </div>
  )
}
