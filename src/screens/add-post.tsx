import { css } from '@emotion/css'
import { useAuth } from 'contexts/userContext'

import { FC, FormEvent } from 'react'
import { SERVER_URL } from 'utils/configs'
import { IPost } from 'utils/types'

interface PostInputElements {
  title: HTMLInputElement
  body: HTMLTextAreaElement
  imageUrl: HTMLInputElement
}

const AddPost: FC = () => {
  const { isLogin } = useAuth()
  if (!isLogin) {
    return <p>You are not login</p>
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & PostInputElements
    const { title, body, imageUrl } = target
    const post: IPost = {
      title: title.value,
      body: body.value,
      image_url: imageUrl.value,
    }
    console.log(post)
    fetch(`${SERVER_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
  }

  return (
    <div>
      <form
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" />
        <label htmlFor="body"></label>
        <textarea name="" id="body" cols={30} rows={10}></textarea>
        <input type="text" id="imageUrl" name="image-url" />
        <button type="submit">Post Article</button>
      </form>
    </div>
  )
}
export default AddPost
