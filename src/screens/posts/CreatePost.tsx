import { css } from '@emotion/css'
import { Button } from 'components/themed-button'

import { useAuth } from 'contexts/userContext'

import { FC, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { IPost } from 'utils/types'
import { useCreatePost } from './post-api'

interface PostInputElements {
  title: HTMLInputElement
  body: HTMLTextAreaElement
  imageUrl: HTMLInputElement
}

export const CreatePost: FC = () => {
  const { isLogin /*userInfo*/ } = useAuth()
  const { mutate: save, isSuccess } = useCreatePost()
  const navigate = useNavigate()

  if (!isLogin) {
    navigate(-1)
  }

  if (isSuccess) {
    return (
      <div>
        <Button onClick={() => navigate(-1)} variant="primary">
          Thanks for adding new post!
        </Button>
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
      createdAt: '',
    }
    save({ post })
  }

  if (!isLogin) {
    // if (isLogin && role !== 'mod' && role !== 'admin') {
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

  return (
    <div>
      <form
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        })}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Type your article's title here"
        />
        <label htmlFor="body">Article</label>
        <textarea
          name=""
          placeholder="Type your article here"
          id="body"
          cols={30}
          rows={10}
        ></textarea>
        <input
          type="text"
          id="imageUrl"
          name="image-url"
          placeholder="image url"
        />
        <Button variant="primary" type="submit">
          Post Article
        </Button>
      </form>
    </div>
  )
}
