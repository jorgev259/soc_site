'use client'
import classNames from 'classnames'

import styles from './SearchBar.module.scss'
import { useCallback, useState } from 'react'

export default function SearchBar () {
  const [open, setOpen] = useState(false)
  const toggleShow = useCallback(() => setOpen(!open), [open])

  return (
    <div className={classNames(styles.searchContainer, '', { [styles.open]: open })}>
      {open ? <input className='mx-3'/> : null}
      <div onClick={toggleShow} className={classNames('fas me-3', `fa-${open ? 'times' : 'search'}`, styles.searchButton)} />
    </div>
  )
}
