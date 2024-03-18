import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { gql } from '@apollo/client'
import { getTranslations } from 'next-intl/server'

import styles from './NavigationBar.module.scss'

import MobileLogoutBtn from './MobileLogoutBtn'
import SearchBar from '@/next/components/SearchBar'
import { ModalTemplate } from '@/next/components/common/Modal'
import SubmitAlbumForm from '@/next/components/Header/SubmitAlbumForm'

import { Link } from '@/next/lib/navigation'
import { getClient } from '@/next/lib/ApolloSSRClient'
import getSessionInfo from '@/next/lib/getSession'

export function Dropdown(props) {
  const { name, items = [] } = props
  const t = useTranslations('header')

  return items.length > 0 ? (
    <li className='nav-item dropdown'>
      <a
        className={classNames(
          styles.dropToggle,
          'nav-link dropdown-toggle mt-0'
        )}
        href='#'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {t(name)}
      </a>
      <ul className='dropdown-menu'>
        {items.map(({ href, name }, i) => (
          <li key={href}>
            <a
              className={classNames(styles.dropItem, 'dropdown-item')}
              href={href}
            >
              {t(name)}
            </a>
          </li>
        ))}
      </ul>
    </li>
  ) : null
}

export function NavLinkWrapper(props) {
  const { href, name, onClick, className } = props
  const t = useTranslations('header')

  const linkStyles = classNames(styles.navLink, 'nav-link', className)

  return onClick ? (
    <a onClick={onClick} className={linkStyles}>
      {t(name)}
    </a>
  ) : (
    <div className={classNames(styles.navItem, 'nav-item')}>
      <a className={linkStyles} href={href}>
        {t(name)}
      </a>
    </div>
  )
}

function SubmitAlbum() {
  const t = useTranslations('header')

  return (
    <>
      <ModalTemplate id='submitAlbumModal'>
        <SubmitAlbumForm />
      </ModalTemplate>
      <div className={classNames(styles.navItem, 'nav-item')}>
        <button
          className={classNames(styles.navLink, 'nav-link w-100 text-start')}
          data-bs-toggle='modal'
          data-bs-target='#submitAlbumModal'
        >
          {t('Submit Album')}
        </button>
      </div>
    </>
  )
}

async function MobileNav(props) {
  const t = await getTranslations('login')
  const { isFAU, session } = await getSessionInfo()
  const { username } = session

  return isFAU ? (
    <>
      <MobileLogoutBtn>{t('Logout')}</MobileLogoutBtn>
      <div className={classNames(styles.navItem, 'nav-item d-block d-sm-none')}>
        <Link
          href={`/profile/${username}`}
          className={classNames(styles.navLink, 'nav-link w-100 text-start')}
        >
          {t('Profile')}
        </Link>
      </div>
    </>
  ) : (
    <>
      <div className={classNames(styles.navItem, 'nav-item d-block d-sm-none')}>
        <button
          className={classNames(styles.navLink, 'nav-link w-100 text-start')}
          data-bs-toggle='modal'
          data-bs-target='#loginModal'
        >
          {t('Login')}
        </button>
      </div>
      <div className={classNames(styles.navItem, 'nav-item d-block d-sm-none')}>
        <button
          className={classNames(styles.navLink, 'nav-link w-100 text-start')}
          data-bs-toggle='modal'
          data-bs-target='#registerModal'
        >
          {t('Register')}
        </button>
      </div>
    </>
  )
}

const pagesQuery = gql`
  query Me {
    me {
      pages {
        url
      }
    }
  }
`

export default async function NavigationBar(props) {
  const { isFAU } = await getSessionInfo()
  const client = await getClient()
  const { data } = await client.query({ query: pagesQuery })

  const pages = data.me?.pages?.map((p) => p.url) || []
  const adminPages = [
    { name: 'Manage Albums', href: '/admin/1' },
    { name: 'Manage Users', href: '/admin/user' },
    { name: 'Manage Requests', href: '/admin/request' },
    { name: 'Manage Submissions', href: '/admin/submission' }
  ].filter((p) => pages.includes(p.href))

  return (
    <nav className='navbar navbar-expand-sm bg-dark py-md-0' id='navbar'>
      <div className='container'>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarToggler'
          aria-controls='navbarToggler'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse mt-2 mt-sm-0'
          id='navbarToggler'
        >
          <ul className='navbar-nav'>
            <MobileNav />
            <NavLinkWrapper href='/' name='Home' />
            <NavLinkWrapper href='/last-added' name='Last Added' />
            <NavLinkWrapper href='/album/list' name='Album List' />
            <Dropdown
              name='Games'
              items={[
                { name: 'Albums', href: '/game' },
                { name: 'Series', href: '/series/list' },
                { name: 'Publishers', href: '/publisher/list' },
                { name: 'Platforms', href: '/platform/list' },
                { name: 'Game List', href: '/game/list' }
              ]}
            />
            <Dropdown
              name='Animation'
              items={[
                { name: 'Albums', href: '/anim' },
                { name: 'Animation List', href: '/anim/list' },
                { name: 'Studios', href: '/studio/list' }
              ]}
            />
            {pages.includes('/request') ? (
              <NavLinkWrapper href='/request' name='Requests' />
            ) : null}
            {isFAU ? <SubmitAlbum /> : null}
            <Dropdown name='Admin Grounds' items={adminPages} />
          </ul>
        </div>
        <SearchBar />
      </div>
    </nav>
  )
}
