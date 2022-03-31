import { css } from '@emotion/css'

import { useAuth } from 'contexts/userContext'

import { FC, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPost } from 'utils/types'

interface PostInputElements {
  title: HTMLInputElement
  body: HTMLTextAreaElement
  imageUrl: HTMLInputElement
}

export const CreatePost: FC = () => {
  const { isLogin, userInfo } = useAuth()
  const role = userInfo?.role
  const navigate = useNavigate()

  if (!isLogin) {
    navigate(-1)
  }
  if (isLogin && role !== 'mod' && role !== 'admin') {
    return (
      <div>
        <span>You are not authorized to write an article.</span>
        Click{' '}
        <a
          href="/"
          className={css({
            fontFace: 'bold',
            textDecoration: 'none',
            color: 'green',
            ':hover': {
              color: 'lightgreen',
              textDecoration: 'underline',
            },
          })}
        >
          here
        </a>{' '}
        to go back to home page.
      </div>
    )
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

    fetch(`api/posts`, {
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
