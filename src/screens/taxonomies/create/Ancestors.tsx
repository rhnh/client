import { css } from '@emotion/css'
import { FC } from 'react'
import { IRank, ITaxonomy } from 'utils/types'

type Props = {
  rank: IRank

  taxonomy: ITaxonomy
}

export const Ancestors: FC<Props> = ({ rank, taxonomy }) => {
  switch (rank) {
    case 'order':
    case 'suborder':
      return (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '.6em',
          })}
        >
          <label htmlFor="order">Order</label>
          <input
            onBlur={e => {
              taxonomy.ancestors?.push(e.target.value)
            }}
            type="text"
            id="order"
          />
        </div>
      )
    case 'subfamily':
    case 'family':
      return (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '.6em',
          })}
        >
          <label htmlFor="order">Order</label>
          <input
            onBlur={e => {
              taxonomy.ancestors?.push(e.target.value)
            }}
            type="text"
            id="order"
          />
        </div>
      )
    case 'subgenus':
    case 'genus':
      return (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '.6em',
          })}
        >
          <label htmlFor="family">Family</label>
          <input
            onBlur={e => {
              taxonomy.ancestors?.push(e.target.value)
            }}
            type="text"
            id="family"
          />
          <label htmlFor="order">Order</label>
          <input
            onBlur={e => {
              taxonomy.ancestors?.push(e.target.value)
            }}
            type="text"
            id="order"
          />
        </div>
      )
    case 'species':
    case 'subspecies':
    default:
      return (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '.6em',
          })}
        >
          <label htmlFor="species">Species</label>
          <input
            onBlur={e => {
              taxonomy.ancestors?.push(e.target.value)
            }}
            type="text"
            id="species"
          />
          <label htmlFor="genus">Genus</label>
          <input
            onBlur={e => {
              taxonomy.ancestors?.push(e.target.value)
            }}
            type="text"
            id="genus"
          />
          <label htmlFor="family">Family</label>
          <input
            onBlur={e => {
              taxonomy.ancestors?.push(e.target.value)
            }}
            type="text"
            id="family"
          />
          <label>Order</label>
          <input
            onBlur={e => {
              taxonomy.ancestors?.push(e.target.value)
            }}
            type="text"
            id="order"
          />
        </div>
      )
  }
}
