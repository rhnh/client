import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import { SearchBar } from 'components/SearchBar'
import { Button } from 'components/themed-button'
import React, { FC } from 'react'
/**
 * @todo Write a search for taxonomies
 * @returns
 */
export const SearchTaxonomies: FC = () => {
  return (
    <Modal>
      <ModalOpenButton>
        <Button variant="primary">Search</Button>
      </ModalOpenButton>
      <ModalContents aria-label="Search form" style={{ maxWidth: '100%' }}>
        <form>
          <SearchBar search="" handleChange={() => {}} data={[]} />
        </form>
      </ModalContents>
    </Modal>
  )
}
