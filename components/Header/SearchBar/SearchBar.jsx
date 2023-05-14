'use client'
import classNames from 'classnames'

import styles from './SearchBar.module.scss'
import { useState } from 'react'

export default function SearchBar () {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div onClick={() => {}} className={classNames('fas fa-search me-2', styles.searchButton)} />
    </>
  )
}
