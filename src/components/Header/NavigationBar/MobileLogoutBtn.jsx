'use client'
import classNames from 'classnames'

import styles from './NavigationBar.module.scss'
import useLogout from '@/next/lib/useLogout'

export default function MobileLogoutBtn(props) {
  const { children } = props
  const { handleLogout } = useLogout()

  return (
    <div className={classNames(styles.navItem, 'nav-item d-block d-sm-none')}>
      <button
        className={classNames(styles.navLink, 'nav-link w-100 text-start')}
        onClick={handleLogout}
      >
        {children}
      </button>
    </div>
  )
}
