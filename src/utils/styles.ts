import { css } from '@emotion/css'
import * as colors from 'utils/colors'
export const horizontalNavUL = css({
  display: 'flex',
  width: '100%',

  listStyle: 'none',
  justifyContent: 'center',
  'li>a': {
    color: '#fff',
    display: 'block',
    padding: '2em',
    alignSelf: 'center',
    margin: 'auto',
  },
})

export const verticalNavUL = css({
  width: '100%',
  margin: 'auto',
  listStyle: 'none',

  // display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  '>li': {
    margin: 'auto',
  },
  'li>a': {
    // color: '#f3f3f3',
    color: '#fff',
    display: 'block',
    padding: '2em',
    alignSelf: 'center',
    margin: 'auto',
  },
  'li>a:hover': {
    background: colors.secondary,
  },
})
