import { IconLinks } from 'components/themed-button'
import { useAuth } from 'contexts/userContext'
import { FC } from 'react'
import membersIcon from 'assets/people.svg'
import notifyIcon from 'assets/notification.svg'
import addBirdIcon from 'assets/add.svg'
import { css } from '@emotion/css'
type Props = {}

export const PanelNav: FC<Props> = (props: Props) => {
  const { userInfo } = useAuth()
  if (userInfo?.role === 'admin' || userInfo?.role === 'mod') {
    return (
      <div
        className={css({
          display: 'flex',
          gap: '1em',
        })}
      >
        <IconLinks
          to="/users/members"
          toolTip="Members"
          bgImage={membersIcon}
        />
        <IconLinks
          to="/users/panel"
          toolTip="Notification"
          bgImage={notifyIcon}
        />
        <IconLinks
          to="/taxonomies/taxonomy/create"
          toolTip="Add Taxonomy"
          bgImage={addBirdIcon}
          imgStyle={{ width: '20px', height: 'auto' }}
        />
      </div>
    )
  } else {
    return null
  }
}
