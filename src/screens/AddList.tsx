import { css } from '@emotion/css'
import { Button } from 'components/themed-button'
import { Input } from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import React from 'react'

type Props = {}

const AddList = (props: Props) => {
  const { isLogin } = useAuth()
  return isLogin ? (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '2em',
      })}
    >
      <form>
        <div>
          <label htmlFor="list-name">List Name</label>
          <Input type="text" id="list-name" placeholder="list name" />
        </div>
        <div>
          <Button variant="primary">Create</Button>
        </div>
      </form>
    </div>
  ) : (
    <p>You need to be authorized</p>
  )
}

export default AddList
