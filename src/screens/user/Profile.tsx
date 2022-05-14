import { css } from '@emotion/css'
import { FullPageSpinner } from 'components/themed-components'
import { FC, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IProfile } from 'utils/types'
import { useProfile, useSetAvatar } from './user-api'
import * as colors from 'utils/colors'
import { useAuth } from 'contexts/userContext'
import { numberToDate } from 'utils/tools'
import { IconButtons } from 'components/themed-button'
import nextSvg from 'assets/next.svg'
import changeProfile from 'assets/change-profile.svg'
import { PanelNav } from '../admin/PanelNav'
import { DialogContent, DialogOverlay } from '@reach/dialog'

export const Profile: FC = () => {
  const { username } = useParams()
  const { username: owner } = useAuth()
  const { data, isError, isLoading } = useProfile(username || '')
  const { mutate: changeAvatar } = useSetAvatar()

  const user: IProfile | null = data as unknown as IProfile

  const handleSubmit = (u: string) => {
    changeAvatar(u)
  }
  if (isLoading) {
    return <FullPageSpinner />
  }
  if (isError) {
    return <p>Error: Something went wrong went retrieving your profile</p>
  }
  if (owner === username) {
    return (
      <div
        className={css({
          margin: 'auto',
          maxWidth: '300px',
          marginTop: '1em',
        })}
      >
        <div
          className={css({
            background: colors.plate,
            padding: '1em',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            margin: 'auto',
          })}
        >
          <div
            className={css({
              position: 'relative',
            })}
          >
            <div
              className={css({
                display: 'flex',
                position: 'absolute',
                flexDirection: 'row',
                bottom: 0,
              })}
            >
              <ThumbnailGallery handleSubmit={handleSubmit}></ThumbnailGallery>
            </div>

            <img
              src={`/thumbs/${user.avatar ?? 1}.jpg`}
              alt="profile"
              className={css({
                width: '100%',
                display: 'block',
                height: 'auto',
              })}
            />
          </div>
          <div>
            <p>
              Thank you for being a member since{' '}
              <i> {numberToDate(user.createdAt)}</i>
            </p>
            <div>
              <h1>Hello, {user.username}</h1>
            </div>
            You have {user.totalLists}
            <Link to={`/lists/${user.username}`}> Lists.</Link>
          </div>
        </div>
        <p>close account</p>
        <PanelNav />
      </div>
    )
  }
  return (
    <div
      className={css({
        background: colors.plate,
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: 'auto',
      })}
    >
      <img
        src="/profiles/images/profile.png"
        alt="profile"
        className={css({
          width: '100%',
        })}
      ></img>
      <p>
        {' '}
        They are member since <i> {numberToDate(user.createdAt)}</i>{' '}
      </p>
      <div>
        <h1>{user.username}</h1>
      </div>
      {user.username} has {user.totalLists}
      <Link to={`/lists/${user.username}`}> Lists.</Link>
    </div>
  )
}

const ThumbnailGallery: FC<{ handleSubmit(u: string): void }> = ({
  handleSubmit,
}) => {
  const TOTAL = 245
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const totalIndex = Array.from(Array(TOTAL).keys()).map(n => n + 1)
  const chunks = 10
  const pics = [...Array(Math.ceil(totalIndex.length / chunks))].map(_ =>
    totalIndex.splice(0, chunks),
  )

  const max = pics.length

  const [index, setIndex] = useState(0)
  return (
    <>
      <IconButtons
        style={{ background: '#B7ADCF', opacity: 0.5 }}
        toolTip="Change Avatar"
        bgImage={changeProfile}
        onClick={() => {
          setIsOpen(true)
        }}
        imgStyle={{ maxWidth: '20px' }}
      ></IconButtons>
      <DialogOverlay isOpen={isOpen} onDismiss={() => setIsOpen(false)}>
        <DialogContent aria-label="form avatar" className={css({})}>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <IconButtons
              toolTip="Previous"
              bgImage={nextSvg}
              imgStyle={{ transform: 'rotate(180deg)' }}
              onClick={() => {
                setIndex(i => {
                  if (i > 0) return i - 1
                  else {
                    return 0
                  }
                })
              }}
            ></IconButtons>
            <div
              className={css({
                display: 'grid',
                '@media screen and (min-width:700px)': {
                  gridTemplateColumns: 'repeat(5,1fr)',
                  gridTemplateRows: 'repeat(2,1fr)',
                  gap: '.6em',
                  margin: 'auto',
                },
                gridTemplateColumns: 'repeat(5,1fr)',
                gridTemplateRows: 'repeat(2,1fr)',
                gap: '.2em',
              })}
            >
              {pics[index].map(k => (
                <img
                  key={k}
                  className={css({
                    maxWidth: '50px',
                    '@media screen and (min-width:700px)': {
                      maxWidth: '150px',
                    },
                  })}
                  src={`/thumbs/${k}.jpg`}
                  alt="avatar"
                  onClick={() => {
                    handleSubmit(`${k}`)
                    setIsOpen(false)
                  }}
                />
              ))}
            </div>
            <IconButtons
              toolTip="Next"
              bgImage={nextSvg}
              disabled={index === 3}
              onClick={() => {
                setIndex(i => {
                  if (i < max - 1) return i + 1
                  else {
                    return max - 1
                  }
                })
              }}
              imgStyle={{ opacity: index === max ? 0 : 1 }}
            ></IconButtons>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}
