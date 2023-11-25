'use client'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { gql, useQuery } from '@apollo/client'

import styles from './CommentCarrousel.module.scss'

import sidebarStyles from '@/next/components/server/Sidebar/Sidebar.module.scss'

function SideButton (props) {
  const { side, onClick } = props

  return (
    <div className='col-auto'>
      <button className='btn btn-outline-light h-100 rounded-3' onClick={onClick} style={{ fontSize: '30px' }}><span className={`fas fa-angle-${side}`} /></button>
    </div>
  )
}

const getRecentComments = gql`
  query RecentComments {
    recentComments {
      text
      anon
      username
      album {
        id
        title
      }
    }
  }
`

export function CommentCarrouselSidebar () {
  const [currentIndex, setCurrentIndex] = useState(0)

  const timeoutRef = useRef(null)
  const { data, loading } = useQuery(getRecentComments)

  const comments = data?.recentComments || []

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(plusIndex, 10 * 1000)
  }, [currentIndex])

  const current = comments[currentIndex]
  const plusIndex = () => setCurrentIndex(currentIndex === comments.length - 1 ? 0 : currentIndex + 1)

  return (
    <div className='row mt-3 px-3'>
      <div className={classNames('col', sidebarStyles.section, styles.comments, { loadingAnim: loading })}>
        {!loading || current
          ? (
            <>
              <div className='row'>
                <div className='col pb-3' style={{ fontSize: '18px' }}>
                  {current.text}
                  <br />
                  <div className='mt-2'>
                    {current.album && <span> - <Link href={`/album/${current.album.id}`} className={styles.albumSpan}>{current.album.title}</Link></span>}
                    {!current.album && current.username && <span> - <Link href={`/profile/${current.username}`} className={styles.albumSpan}>{current.username}</Link></span>}
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-between'>
                <SideButton side='left' onClick={() => setCurrentIndex(currentIndex === 0 ? comments.length - 1 : currentIndex - 1)} />
                <div className='col d-flex align-items-center justify-content-center'><div>{currentIndex + 1} / {comments.length}</div></div>
                <SideButton side='right' onClick={plusIndex} />
              </div>
            </>
          )
          : null}
      </div>
    </div>
  )
}
