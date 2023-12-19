'use client'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'
import { Link } from '@/next/lib/navigation'

import styles from '@/next/components/server/Header/NavigationBar/NavigationBar.module.scss'
import useLogout from '@/next/lib/useLogout'

export default function MobileNav (props) {
  const { isFAU, username } = props
  const t = useTranslations('login')
  const { handleLogout } = useLogout()

  return isFAU
    ? (
      <>
        <div className={classNames(styles.navItem, 'nav-item d-block d-sm-none')}>
          <button className={classNames(styles.navLink, 'nav-link w-100 text-start')} onClick={handleLogout}>{t('Logout')}</button>
        </div>
        <div className={classNames(styles.navItem, 'nav-item d-block d-sm-none')}>
          <Link href={`/profile/${username}`} className={classNames(styles.navLink, 'nav-link w-100 text-start')}>{t('Profile')}</Link>
        </div>
      </>
    )
    : (
      <>
        <div className={classNames(styles.navItem, 'nav-item d-block d-sm-none')}>
          <button className={classNames(styles.navLink, 'nav-link w-100 text-start')} data-bs-toggle="modal" data-bs-target="#loginModal">{t('Login')}</button>
        </div>
        <div className={classNames(styles.navItem, 'nav-item d-block d-sm-none')}>
          <button className={classNames(styles.navLink, 'nav-link w-100 text-start')} data-bs-toggle="modal" data-bs-target="#registerModal">{t('Register')}</button>
        </div>
      </>
    )
}
