import styled from '@emotion/styled'
import { Dialog as ReachDialog } from '@reach/dialog'

import * as colors from 'utils/colors'
import { keyframes } from '@emotion/css'
import { Link } from 'react-router-dom'

type ULProps = {
  isMobile: boolean
}

const fadeIn = keyframes`
    from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
export const NavUL = styled('ul')<ULProps>(
  {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    zIndex: 1000,
    background: colors.darkBlue,
    height: '60%',
    animation: `${fadeIn} .2s .2s both`,
    li: {
      width: '100%',
      padding: 0,
      margin: 0,
    },
    'li> a': {
      textDecoration: 'none',
      width: '100%',
      display: 'block',
      padding: '.5em 0',
      textAlign: 'center',
      color: colors.lightBlue,
      textTransform: 'capitalize',
    },
    'li > a:hover': {
      color: colors.lightBlue,
      background: colors.darkRed,
    },
  },
  ({ isMobile = false }) => {
    return !isMobile
      ? {
          // justifyContent: 'space-between',
          justifyContent: 'left',

          li: {
            maxWidth: '100px',
            float: 'left',
          },
          'li>a': {
            left: 0,
          },
          '.nav-right': {
            marginLeft: 'auto',
            display: 'flex',
          },
          '.nav-right--logged>li:last-child': {
            backgroundColor: colors.darkRed,
          },
          '.nav-right>li a': {
            padding: '.5em 2em',
          },
          '.nav-right--logged>li:last-child:hover': {
            color: 'white',
            backgroundColor: colors.red,
          },
        }
      : {
          position: 'absolute',
          listStyle: 'none',
          flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
          paddingTop: '6em',
          width: '100%',
          height: '100%',
          li: {
            width: '100%',
            paddingBottom: '.6em',
            marginTop: 0,
            paddingTop: 0,
            padding: '1em 0',
          },
          'li > a': {
            padding: '1em',
          },
        }
  },
)

export const Input = styled('input')({
  fontSize: '1em',
  // padding: '10px 10px 10px -40px',
  // display: 'block',
  // border: 'none',
  borderBottom: `1px solid ${colors.orangeDark}`,
  width: '100%',

  padding: '12px 20px',
  margin: '8px 0',
  display: 'inline-block',
  border: '1px solid #ccc',
  borderRadius: '4px',
})

export const Label = styled('label')({
  fontSize: '1.2rem;',
  margin: '.2em 0',
  display: 'block',
})

export const CircleButton = styled.button({
  fontsize: '1.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
})

export const Dialog = styled(ReachDialog)({
  display: 'block',
  borderRadius: '.6em',

  '@media only screen and (min-width: 600px)': {
    maxWidth: '450px',
    borderRadius: '.6em',
    paddingBottom: '3.5em',
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
    margin: '20vh auto',
  },
})

// export const LinkButton = styled(ButtonLink)({
//   padding: '.6em',
//   fontSize: '1em',
//   borderRadius: '2em',
//   width: '100%',
//   margin: '.5em .2em',
//   textTransform: 'uppercase',
//   transitionDuration: '0.2s',
//   cursor: 'pointer',
//   // color: 'black',
//   backgroundColor: colors.textLight,
//   color: 'gray',
//   border: `1px solid ${colors.textDark}`,

//   ':hover': {
//     backgroundColor: colors.textLight,
//     color: colors.textLight,
//   },
// })

export const StyledLink = styled(Link)({
  color: 'red',
})
