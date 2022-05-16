import { css } from '@emotion/css'

import React, { ChangeEvent, useState } from 'react'
import { CreateFamily } from './CreateFamily'
import { CreateGenus } from './CreateGenus'
import { CreateOrder } from './CreateOrder'
import { CreateSpecies } from './CreateSpecies'
import { useGetTaxonomyByName } from './taxonomies-api'
import * as colors from 'utils/colors'

type Props = {}

export const CreateTaxonomy = (props: Props) => {
  const [rest, setRest] = useState<boolean>(false)
  const [taxonomyName, setTaxonomyName] = useState<string>('')
  const { data } = useGetTaxonomyByName({ taxonomyName })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaxonomyName(e.target.value)
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        margin: 'auto',
        gap: '1em',
        marginTop: '1em',
        padding: '1em',
        background: colors.plate,
        borderRadius: '10px',
      })}
    >
      <CreateOrder />
      <CreateFamily />
      <CreateGenus />
      <CreateSpecies />
    </div>
  )
}
