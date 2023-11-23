'use client'
import { gql, useQuery } from '@apollo/client'

import { NavLinkWrapper, Dropdown } from './NavigationBar'

const pagesQuery = gql`
  query Me{
    me {
      pages {url}
    }
  }
`

function DropdownWrapper (props) {
  const { items, pages, ...restProps } = props
  const allowedItems = items.filter(it => pages.includes(it.href))

  return (
    <Dropdown items={allowedItems} {...restProps}/>
  )
}

export default function Privileged (props) {
  const { data } = useQuery(pagesQuery)
  if (!data) return null

  const pages = data.me?.pages?.map(p => p.url) || []
  if (pages.length === 0) return null

  return (
    <>
      {pages.includes('/request') ? <NavLinkWrapper href='/request' name='Requests' /> : null}
      {/* <SubmitAlbum /> */}
      <DropdownWrapper pages={pages} name='Admin Grounds' items={[
        { name: 'Manage Albums', href: '/admin/1' },
        { name: 'Manage Users', href: '/admin/user' },
        { name: 'Manage Requests', href: '/admin/request' },
        { name: 'Manage Submissions', href: '/admin/submission' }
      ]} />
    </>
  )
}
