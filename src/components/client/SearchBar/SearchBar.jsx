'use client'
import { useCallback, useRef, useState, useEffect } from 'react'
import classNames from 'classnames'

import styles from './SearchBar.module.scss'

import { useRouter } from '@/next/lib/navigation'

export default function SearchBar () {
  const [open, setOpen] = useState(false)
  const toggleShow = useCallback(() => setOpen(!open), [open])
  const ref = useRef(null)
  const router = useRouter()

  const onKeyDownHandler = e => {
    const query = ref.current.value.trim()
    if (e.keyCode === 13 && ref.current && query.length > 0) {
      router.push({ pathname: '/search', query: { q: query } })
      setOpen(false)
    }
  }

  useEffect(() => { if (open) ref.current.focus() }, [open])

  return (
    <div className={classNames(styles.searchContainer, '', { [styles.open]: open })}>
      {open ? <input ref={ref} onKeyDown={onKeyDownHandler} className='mx-3'/> : null}
      <div onClick={toggleShow} className={classNames('fas me-3', `fa-${open ? 'times' : 'search'}`, styles.searchButton)} />
    </div>
  )
}
