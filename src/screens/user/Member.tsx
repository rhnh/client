import { css } from '@emotion/css'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { IRole, IUser } from 'utils/types'
import { useDeleteMember, usePrivilege } from './members-api'

interface IFormRole {
  selectForm: HTMLSelectElement
  op: HTMLOptionElement
}

export const Member: FC<IUser> = ({ username, createdAt, role }) => {
  const [disableButton, setDisableButton] = useState('')
  const { mutate: deleteMember } = useDeleteMember()
  const { mutate: setRole } = usePrivilege()
  const handleDelete = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    deleteMember({ username })
  }

  const handleRole = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & IFormRole
    const { selectForm } = target
    const value = selectForm.value as IRole
    setRole({ username, role: value ?? 'user' })
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()
    const { value } = e.target
    setDisableButton(value)
  }

  return (
    <div
      className={css({
        borderTop: '1px solid green',
        width: '100%',
      })}
    >
      <section>
        <p>{username}</p>
        <p
          className={css({
            color: role === 'mod' ? 'red' : 'black',
            background: role === 'mod' ? 'yellow' : undefined,
          })}
        >
          {role}
        </p>
        <p>{new Date(createdAt ?? '').toDateString()}</p>
      </section>
      <form onSubmit={handleRole}>
        <select onChange={handleSelectChange} id="selectForm">
          <option value="">Select Role</option>
          <option value="user">user</option>
          <option value="mod">mod</option>
        </select>
        <button disabled={disableButton === ''}>change role</button>
      </form>
      <form onSubmit={handleDelete}>
        <button>delete</button>
      </form>
    </div>
  )
}
