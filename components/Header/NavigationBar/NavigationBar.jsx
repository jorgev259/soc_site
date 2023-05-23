'use client'
import classNames from 'classnames'
import { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

import styles from './NavigationBar.module.scss'
import './NavigationBar.scss'
import SearchBar from '../SearchBar'

function Dropdown (props) {
  const { name, items = [], privileged = false } = props

  /* const { user } = useUser()
  const t = useTranslation() */

  // const pages = user?.pages.map(p => p.url) || []
  // const links = items.filter(i => !privileged || pages.includes(i.href))

  // if (links.length === 0) return null

  return (
    <>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret className={classNames(styles.dropToggle)}>{name}</DropdownToggle>
        <DropdownMenu end className={classNames(styles.dropMenu)}>
          {items.map(({ href, name }, i) => (
            <DropdownItem key={i} className={classNames(styles.dropItem)}>{name}</DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  )
}

function NavLinkWrapper (props) {
  const { href, name, onClick, className, privileged } = props

  // const { user } = useUser()
  // const t = useTranslation()

  // const title = t(name)
  // const pages = user?.pages.map(p => p.url) || []

  /* if (privileged) {
      if (!user || !pages.includes(href)) return null
    } */

  return onClick
    ? <a onClick={onClick} className={classNames(styles.navLink, 'nav-link', className)}>{name}</a>
    : (
      <NavItem className={classNames(styles.navItem, 'mx-1')}>
        <NavLink className={classNames(styles.navLink, className)} href={href}>{name}</NavLink>
      </NavItem>
    )
}

export default function NavigationBar () {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar color='dark' dark full="true" expand="sm" className='py-md-0'>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ps-md-5 ms-md-4 mt-2 mt-md-0" navbar>
          {/*
            <RegisterProfileButton navMobile />
              <LoginButton navMobile />
              */}
          <NavLinkWrapper href='/' name='Home' />
          <NavLinkWrapper href='/last-added' name='Last Added_header' />
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

          <NavLinkWrapper href='/request' name='Requests' privileged />
          {/* <SubmitAlbum /> */}
          <Dropdown name='Admin Grounds' privileged items={[
            { name: 'Manage Albums', href: '/admin/1' },
            { name: 'Manage Users', href: '/admin/user' },
            { name: 'Manage Requests', href: '/admin/request' },
            { name: 'Manage Submissions', href: '/admin/submission' }
          ]} />
        </Nav>
      </Collapse>
      <SearchBar />
    </Navbar>
  )
}
