import { css } from '@emotion/css'
import { Hintput } from '@ribrary/hintput'
import { Button } from 'components/themed-button'
import { FlexColumn } from 'components/themed-components'
import { ChangeEvent, FC, useState } from 'react'
import * as colors from 'utils/colors'
import { capitalize } from 'utils/tools'
import { ITaxonomy } from 'utils/types'
import { useGetByRank, useUpdateTaxonomy } from '../taxonomies-api'

type Props = {
  taxonomy: ITaxonomy
  updateTaxonomy(t: ITaxonomy): void
}
/**
 *
 * @param taxonomy a taxonomy that will be used for inputs values
 * @returns
 */
export const BaseTaxonomy: FC<Props> = ({ taxonomy, updateTaxonomy }) => {
  const rank = taxonomy.rank

  if (!rank) {
    throw new Error('Rank of the given taxonomy as to be set')
  }

  const [isExist, setIsExist] = useState<boolean>(false)
  const { mutate: update } = useUpdateTaxonomy()

  const { data } = useGetByRank(rank)
  const names: string[] = data?.map((t: ITaxonomy) => t.englishName ?? '')

  const tName: string[] = data?.map((t: ITaxonomy) => t.taxonomyName)

  const handleChangeRank = (e: ChangeEvent<HTMLInputElement>) => {
    const f = taxonomy
    f.taxonomyName = e.target.value
    updateTaxonomy(f)
  }
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const f = taxonomy
    f.englishName = e.target.value
    updateTaxonomy(f)
  }
  const handleChangeParent = (e: ChangeEvent<HTMLInputElement>) => {
    const f = taxonomy
    f.parent = e.target.value
    updateTaxonomy(f)
  }
  const handleChangeInfo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const f = taxonomy
    f.info = e.target.value
    updateTaxonomy(f)
  }

  const OnBlurEnglish = (e: ChangeEvent<HTMLInputElement>) => {
    const found = names?.find(
      s => s?.toLowerCase() === e.target.value.toLowerCase(),
    )

    if (found) {
      const f: ITaxonomy = data?.find((t: ITaxonomy) => t.englishName === found)
      updateTaxonomy(f)
      setIsExist(true)
    } else {
      setIsExist(false)
    }
  }
  const onBlurTaxonomyName = (e: ChangeEvent<HTMLInputElement>) => {
    const found = tName?.find(
      s => s?.toLowerCase() === e.target.value.toLowerCase(),
    )

    if (found) {
      const f: ITaxonomy = data?.find(
        (t: ITaxonomy) => t.taxonomyName === found,
      )
      updateTaxonomy(f)
      setIsExist(true)
    } else {
      setIsExist(false)
    }
  }

  const handleUpdate = () => {
    update({
      taxonomy,
      id: taxonomy._id || '',
    })
  }

  return (
    <FlexColumn
      className={css({
        color: colors.primaryDark,
        label: {
          color: 'rebeccapurple',
          letterSpacing: '.2em',
          fontSize: '1.125rem',
          fontWeight: 'bold',
        },
      })}
    >
      <label htmlFor="english">English</label>
      <Hintput
        items={names}
        type="text"
        id="english"
        onBlur={OnBlurEnglish}
        placeholder="Type of name of the english name of the English/common Name"
        value={taxonomy?.englishName}
        onChange={handleChangeName}
      />
      <label htmlFor="rank">{capitalize(rank)}</label>
      <Hintput
        items={tName}
        value={taxonomy.taxonomyName}
        type="text"
        id="rank"
        onBlur={onBlurTaxonomyName}
        placeholder={`Type of name of the scientific name of ${rank}`}
        onChange={handleChangeRank}
      />

      <label htmlFor="parent">Parent</label>
      <input
        type="text"
        id="parent"
        value={taxonomy?.parent}
        onChange={handleChangeParent}
      />
      <label htmlFor="info">Info</label>
      <textarea
        name="info"
        value={taxonomy?.info}
        onChange={handleChangeInfo}
        id="info"
        cols={10}
        rows={10}
      ></textarea>

      {isExist && (
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      )}
    </FlexColumn>
  )
}
