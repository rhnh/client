import React from 'react'
import bg from 'assets/background.jpg'
import { css } from '@emotion/css'

export const Hero = () => {
  return (
    <div
      className={css({
        backgroundImage: `linear-gradient(rgba(180, 180,180, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
        height: '30%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        marginBottom: '2em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <span>
        <h1
          className={css({
            color: '#fff',
            opacity: '0.5',
          })}
        >
          Experience the safari at home
        </h1>
      </span>
    </div>
  )
}
