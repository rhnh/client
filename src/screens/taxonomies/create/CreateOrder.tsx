import { css } from '@emotion/css'
import * as colors from 'utils/colors'
import { Button } from 'components/themed-button'
import {
  FlexColumn,
  InfoBox,
  ReLoginButton,
} from 'components/themed-components'
import { useAuth } from 'contexts/userContext'
import { ChangeEvent, FC, FormEvent, useState } from 'react'
import { ITaxonomy } from 'utils/types'
import { useCreateTaxonomy, useGetByRank } from '../taxonomies-api'
import {
  Modal,
  ModalContents,
  ModalDismissButton,
  ModalOpenButton,
} from 'components/modal'

import { Hintput } from '@ribrary/hintput'

export const CreateOrder: FC = () => {
  const { username, isLogin } = useAuth()
  const [taxonomy, setTaxonomy] = useState<ITaxonomy>({
    rank: 'order',
    isApproved: false,
    username,
    taxonomyName: '',
    englishName: '',
    parent: '',
    image: '',
    ancestors: [''],
  })
  const { data: alreadyExistingOrder } = useGetByRank('order')
  const [isExist, setIsExit] = useState(false)

  const { mutate: save, isSuccess, reset } = useCreateTaxonomy()

  if (isSuccess) {
    return (
      <Modal>
        <ModalContents>
          <InfoBox>Thanks for add new {taxonomy.rank}</InfoBox>
          <ModalDismissButton>
            <Button variant="secondary" onClick={() => reset()}>
              Close
            </Button>
          </ModalDismissButton>
        </ModalContents>
      </Modal>
    )
  }

  const names: string[] = alreadyExistingOrder?.map(
    (t: ITaxonomy) => t.englishName,
  ) || ['']

  const orders: string[] = alreadyExistingOrder?.map(
    (t: ITaxonomy) => t.taxonomyName,
  ) || ['']

  const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const k = e.target.value
    //check if the taxonomy already exist;
    const found = orders.find(t => t.toLowerCase() === k.toLowerCase())
    //set isExist true;
    if (found) {
      setIsExit(true)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    save({ taxonomy })
  }
  if (!isLogin) {
    return <ReLoginButton />
  }

  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="secondary">Order</Button>
      </ModalOpenButton>
      <ModalContents>
        <form onSubmit={handleSubmit}>
          <h3>Adding new Order</h3>
          <FlexColumn
            className={css({
              color: colors.primaryDark,
              label: {
                color: 'rebeccapurple',
                letterSpacing: '.6em',
                fontSize: '1.125rem',
                fontWeight: 'bold',
              },
            })}
          >
            <label htmlFor="order">Order</label>
            <Hintput
              value={taxonomy?.taxonomyName}
              items={orders}
              type="text"
              id="order"
              onBlur={onBlur}
              placeholder="Type of name of the scientific name of Order"
              onChange={e => {
                setTaxonomy(t => ({ ...t, taxonomyName: e.target.value }))
              }}
            />
            {isExist && <span>Already exist</span>}
            <label htmlFor="english">English</label>
            <Hintput
              items={names}
              type="text"
              id="english"
              placeholder="Type of name of the english name of the Order"
              value={taxonomy?.englishName}
              onChange={e => {
                setTaxonomy(t => ({ ...t, englishName: e.target.value }))
              }}
            />
            <label htmlFor="info">Info</label>
            <textarea name="info" id="info" cols={10} rows={10}></textarea>
            <Button
              variant="primary"
              type="submit"
              disabled={
                taxonomy.taxonomyName === '' ||
                taxonomy.englishName === '' ||
                isExist
              }
            >
              Save
            </Button>
          </FlexColumn>
        </form>
      </ModalContents>
    </Modal>
  )
}
