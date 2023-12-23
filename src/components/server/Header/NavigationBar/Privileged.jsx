'use client'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'

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
  const { children } = props
  const { data } = useQuery(pagesQuery)
  const pages = data?.me?.pages?.map(p => p.url) || []

  return (
    <>
      {data && pages.includes('/request') ? <NavLinkWrapper href='/request' name='Requests' /> : null}
      {children}
      {data
        ? (
          <DropdownWrapper pages={pages} name='Admin Grounds' items={[
            { name: 'Manage Albums', href: '/admin/1' },
            { name: 'Manage Users', href: '/admin/user' },
            { name: 'Manage Requests', href: '/admin/request' },
            { name: 'Manage Submissions', href: '/admin/submission' }
          ]} />
        )
        : null }
    </>
  )
}
