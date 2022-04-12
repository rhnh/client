import { css } from '@emotion/css'
import { CircleButton } from 'components/themed-components'
import '@reach/dialog/styles.css'
import '@reach/tooltip/styles.css'

import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import { useLists } from 'screens/lists/list-api'

import Tooltip from '@reach/tooltip'

import { AddTaxonomy } from './AddTaxonomy'

export const Taxonomy: FC<ITaxonomy> = ({
  _id,
  englishName,
  image,
  taxonomy,
  info,
}) => {
  const { data: lists } = useLists()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      key={_id}
      className={css({
        display: 'flex',
        flexDirection: 'row',
        border: '2px solid #ffeae2',
        padding: '2em',
        gap: '2em',
        margin: '.2em',
        maxWidth: '60%',
        minWidth: '200px',
      })}
    >
      <div>
        <Link to={`/taxonomy/${_id?.toLowerCase().replace(/[^a-z0-9]+/, '-')}`}>
          {image !== undefined ? (
            <div
              className={css({
                position: 'relative',
              })}
            >
              <img
                src={`/assets/${image}`}
                width="200px"
                alt={englishName}
              ></img>
            </div>
          ) : (
            <img
              src={`/assets/bird-placeholder.jpg`}
              width="200px"
              alt={englishName}
            />
          )}
        </Link>
      </div>
      <div className="desc">
        <div className="taxonomyName">Name: {englishName}</div>
        <div className="taxonomy">Species: {taxonomy}</div>
        <div className="taxonomy">{info ? <p>Info: {info}</p> : null}</div>
      </div>
      <div
        className={css({
          marginLeft: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        })}
      >
        <Tooltip label="Add to you watch lists.">
          <CircleButton
            className={css({
              marginLeft: 'auto',
            })}
            onClick={() => setIsOpen(true)}
          >
            +
          </CircleButton>
        </Tooltip>
        <AddTaxonomy
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          lists={lists}
          englishName={englishName}
          taxonomy={taxonomy}
        />
      </div>
    </div>
  )
}
