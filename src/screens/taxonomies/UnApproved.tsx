import React, { FC, useEffect, useState } from 'react'
import { ITaxonomy } from 'utils/types'
import { useGetUnApproved } from './taxonomies-api'
import { Species } from './Species'
import { css } from '@emotion/css'
import * as colors from 'utils/colors'
import { ApprovalForm } from './ApprovalForms'
import { DeleteApproveForm } from './DeleteById'

interface WithContributor extends ITaxonomy {
  contributor: string
  role: string
}

export const UnApproved: FC = () => {
  const { data } = useGetUnApproved()
  const [taxonomies, setTaxonomies] = useState<WithContributor[]>([])
  useEffect(() => {
    setTaxonomies((data as WithContributor[]) || [])
  }, [data])
  return (
    <div>
      {taxonomies.map(t => (
        <div
          key={t.createdAt}
          className={css({
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'stretch',
            margin: '2px',
          })}
        >
          <Species {...t} />
          <div
            className={css({
              flexDirection: 'column',
              height: 'auto',
              width: 'auto',
              maxWidth: '100%',
              backgroundColor: colors.plate,
              padding: '1em',
              transition: ' height 0.25s linear',
            })}
          >
            <ApprovalForm _id={t._id} />
            <DeleteApproveForm _id={t._id} />
          </div>
        </div>
      ))}
    </div>
  )
}
