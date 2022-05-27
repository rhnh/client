import { css } from '@emotion/css'
import { FC, useState } from 'react'
import { IconButtons } from './themed-button'
import nextSvg from 'assets/next.svg'
import changeProfile from 'assets/change-profile.svg'
import { DialogContent, DialogOverlay } from '@reach/dialog'

export const ThumbnailGallery: FC<{ handleSubmit(u: string): void }> = ({
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
        style={{
          background: '#B7ADCF',
          opacity: 1,
          boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
          border: '1px solid red',
        }}
        toolTip="Change Avatar"
        bgImage={changeProfile}
        onClick={() => {
          setIsOpen(true)
        }}
        imgStyle={{
          maxWidth: '20px',
          background: '#B7ADCF',
          opacity: 0.5,
          boxShadow: '0 5px 25px rgba(0, 0, 0, 0.2)',
          padding: '.6em',
          margin: '.2em',
          border: '1px solid white',
        }}
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
