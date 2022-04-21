import { css } from '@emotion/css'

import '@reach/dialog/styles.css'
import '@reach/tooltip/styles.css'
import addSvg from 'assets/add.svg'
import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { ITaxonomy } from 'utils/types'
import { useGetBirdIds, useLists } from 'screens/lists/list-api'
import * as colors from 'utils/colors'
import Tooltip from '@reach/tooltip'

import { AddTaxonomy } from './AddTaxonomy'
import { CircleButton } from 'components/themed-button'
import { FullPageSpinner } from 'components/themed-components'

export const Taxonomy: FC<ITaxonomy> = ({
  _id,
  englishName,
  image,
  taxonomy,
  info,
}) => {
  const { data: lists, isLoading } = useLists()
  const [isOpen, setIsOpen] = useState(false)
  const { data, isLoading: isLoadingBirdIds, isError } = useGetBirdIds()

  if (!data && isLoadingBirdIds && !isError) {
    return <FullPageSpinner />
  }

  if (!lists && !isLoading) {
    return <FullPageSpinner />
  }
  if (isLoading || isLoadingBirdIds) {
    return <FullPageSpinner />
  }
  const birdIds = data ?? []
  const ids: string[] = (birdIds as string[]) || []
  const alreadyInList = Array.isArray(ids) ? ids.includes(_id || '') : false
  // const alreadyInList = true
  if (!_id) {
    return null
  }

  return (
    <div
      key={_id}
      className={css({
        display: 'flex',
        border: '2px solid #ffeae2',
        maxWidth: '100%',
        gap: '1em',
        margin: '1em',
        overflow: 'hidden',
        background: colors.plate,
        flexDirection: 'column',
        '@media screen and (min-width:700px)': {
          flexDirection: 'row',
          margin: '1em auto',

          maxWidth: '1024px',
        },
        img: {
          width: '100%',
        },
      })}
    >
      <Link
        to={`/taxonomy/${_id
          ?.toString()
          .toLowerCase()
          .replace(/[^a-z0-9]+/, '-')}`}
      >
        {image !== undefined ? (
          <div
            className={css({
              position: 'relative',
            })}
          >
            <img
              src={`/assets/${image}`}
              className={css({
                width: '200px',
                height: 'auto',
                minWidth: '200px',
                '@media screen and (min-width:700px)': {
                  maxWidth: '200px',
                },
              })}
              alt={englishName}
            ></img>
          </div>
        ) : (
          <img
            src={`/assets/bird-placeholder.jpg`}
            className={css({
              height: 'auto',
              '@media screen and (min-width:700px)': {
                maxWidth: '200px',
              },
            })}
            alt={englishName}
          />
        )}
      </Link>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div className="taxonomyName">Name: {englishName}</div>
        <div className="taxonomy">Species: {taxonomy}</div>
        {info ? <div className="taxonomy">Info: {info}</div> : null}
      </div>
      <div
        className={css({
          marginLeft: 'auto',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        {alreadyInList ? (
          <Tooltip label="You have this already in your list">
            <CircleButton
              className={css({
                '@media screen and (min-width:700px)': {
                  marginLeft: 'auto',
                },
              })}
              onClick={() => setIsOpen(true)}
            ></CircleButton>
          </Tooltip>
        ) : (
          <section
            className={css({
              maxWidth: '120px',
            })}
          >
            <Tooltip label="Add to you watch lists.">
              <CircleButton
                className={css({
                  marginLeft: 'auto',
                  maxWidth: '120px',
                })}
                onClick={() => setIsOpen(true)}
              >
                <img
                  src={addSvg}
                  alt="+"
                  className={css({
                    height: '20px',
                    weight: '20px',
                    ':hover': {
                      opacity: 0.5,
                    },
                  })}
                />
              </CircleButton>
            </Tooltip>
            <AddTaxonomy
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              lists={lists}
              englishName={englishName}
              taxonomy={taxonomy}
            />
          </section>
        )}
      </div>
    </div>
  )
}
