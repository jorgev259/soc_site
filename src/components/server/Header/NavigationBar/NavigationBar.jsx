'use client'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'

import styles from './NavigationBar.module.scss'

import SearchBar from '../../../client/SearchBar'

function Dropdown (props) {
  const { name, items = [], privileged = false, pages = [] } = props
  const t = useTranslations('header')
  const links = privileged ? items.filter(i => pages.includes(i.href)) : items

  return links.length > 0
    ? (
      <li className="nav-item dropdown">
        <a className={classNames(styles.dropToggle, 'nav-link dropdown-toggle mt-0')} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          {t(name)}
        </a>
        <ul className="dropdown-menu">
          {items.map(({ href, name }, i) => (
            <li key={href}>
              <a className={classNames(styles.dropItem, 'dropdown-item')} href={href}>{t(name)}</a>
            </li>
          ))}
        </ul>
      </li>
    )
    : null
}

function NavLinkWrapper (props) {
  const { href, name, onClick, className } = props
  const t = useTranslations('header')

  const linkStyles = classNames(styles.navLink, 'nav-link', className)

  return onClick
    ? <a onClick={onClick} className={linkStyles}>{t(name)}</a>
    : (
      <div className={classNames(styles.navItem, 'nav-item mx-1')}>
        <a className={linkStyles} href={href}>{t(name)}</a>
      </div>
    )
}

function Privileged (props) {
  const { children, pages, href } = props
  return pages.includes(href) ? children : null
}

export default function NavigationBar (props) {
  const { pages: pageObjects } = props
  const pages = pageObjects.map(p => p.url)

  return (
    <nav className='navbar navbar-expand-sm bg-dark py-md-0' id="navbar">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className= "collapse navbar-collapse" id="navbarToggle">
          <ul className="navbar-nav">

            {/*
            <RegisterProfileButton navMobile />
              <Login navMobile />
              */}
            <NavLinkWrapper href='/' name='Home' />
            <NavLinkWrapper href='/last-added' name='Last Added' />
            <NavLinkWrapper href='/album/list' name='Album List' />
            <Dropdown name='Games' items={[
              { name: 'Albums', href: '/game' },
              { name: 'Series', href: '/series/list' },
              { name: 'Publishers', href: '/publisher/list' },
              { name: 'Platforms', href: '/platform/list' },
              { name: 'Game List', href: '/game/list' }
            ]} />
            <Dropdown name='Animation' items={[
              { name: 'Albums', href: '/anim' },
              { name: 'Animation List', href: '/anim/list' },
              { name: 'Studios', href: '/studio/list' }
            ]} />

            <Privileged href='/request' pages={pages}>
              <NavLinkWrapper href='/request' name='Requests' />
            </Privileged>
            {/* <SubmitAlbum /> */}
            <Dropdown name='Admin Grounds' privileged pages={pages} items={[
              { name: 'Manage Albums', href: '/admin/1' },
              { name: 'Manage Users', href: '/admin/user' },
              { name: 'Manage Requests', href: '/admin/request' },
              { name: 'Manage Submissions', href: '/admin/submission' }
            ]} />
          </ul>
        </div>
        <SearchBar />
      </div>
    </nav>
  )
}
