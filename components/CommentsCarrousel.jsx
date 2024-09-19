import { useEffect, useRef, useState } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import serialize from 'form-serialize'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { useRouter, Link, usePathname } from '@/next/utils/navigation'
import useUser from '@/next/utils/useUser'
import Loader, { ButtonLoader } from './Loader'

import styles from '@/styles/Profile.module.scss'
import stylesSidebar from '@/styles/Sidebar.module.scss'

function SideButton(props) {
  const { side, onClick } = props

  return (
    <div className='col-auto'>
      <button
        onClick={onClick}
        className='h-100 rounded-3 btn btn-outline-light'
        style={{ fontSize: '30px' }}
      >
        <span className={`fas fa-angle-${side}`} />
      </button>
    </div>
  )
}

export function BasicCommentCarrousel(props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef(null)

  const { comments = [] } = props
  const current = comments[currentIndex]

  const plusIndex = () =>
    setCurrentIndex(currentIndex === comments.length - 1 ? 0 : currentIndex + 1)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(plusIndex, 10 * 1000)
  }, [currentIndex])

  if (comments.length === 0) return null

  return (
    <>
      <div className='row'>
        <div className='col m-2'>
          <div className='blackblock'>
            <div className='row'>
              {comments.length > 1 && (
                <SideButton
                  side='left'
                  onClick={() =>
                    setCurrentIndex(
                      currentIndex === 0
                        ? comments.length - 1
                        : currentIndex - 1
                    )
                  }
                />
              )}
              <div className='col py-3' style={{ fontSize: '18px' }}>
                {current.text}
                <br />
                <div className='mt-2'>
                  {current.album && (
                    <span>
                      {' '}
                      -{' '}
                      <Link
                        href={`/album/${current.album.id}`}
                        className={styles.albumSpan}
                      >
                        {current.album.title}
                      </Link>
                    </span>
                  )}
                  {!current.album && current.username && (
                    <span>
                      {' '}
                      -{' '}
                      <Link
                        href={`/profile/${current.username}`}
                        className={styles.albumSpan}
                      >
                        {current.username}
                      </Link>
                    </span>
                  )}
                </div>
              </div>
              {comments.length > 1 && (
                <SideButton side='right' onClick={plusIndex} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const getComment = gql`
  query ($albumId: ID!) {
    album(id: $albumId) {
      comments {
        text
        username
      }
      selfComment {
        text
        anon
      }
    }
  }
`

const mutateComment = gql`
  mutation ($text: String!, $anon: Boolean!, $albumId: ID!) {
    updateComment(text: $text, anon: $anon, albumId: $albumId)
  }
`

export default function CommentCarrousel(props) {
  const { albumId, comments: initialComments = [] } = props

  const router = useRouter()
  const t = useTranslations('common')
  const pathname = usePathname()

  const [show, setShow] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [defaultValue, setDefaultValue] = useState()

  const timeoutRef = useRef(null)
  const { user } = useUser()

  const [fetchComment, { data, refetch }] = useLazyQuery(getComment)
  const [updateComment, { loading: loadingComment }] =
    useMutation(mutateComment)

  const comments = data?.album.comments || initialComments
  const selfComment = data?.album?.selfComment

  useEffect(() => {
    fetchComment({ variables: { albumId } })
  }, [user, fetchComment, albumId])
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(plusIndex, 10 * 1000)
  }, [currentIndex])

  useEffect(() => {
    const selfComment = data?.album?.selfComment
    if (selfComment) setDefaultValue(selfComment.text)
  }, [data])
  useEffect(() => {
    setDefaultValue()
  }, [albumId])

  function submit(ev) {
    let variables = serialize(ev.target, { hash: true })
    variables = { ...variables, anon: variables.anon === 'on', albumId }

    updateComment({ variables }).then(() => {
      refetch()
      setShow(false)
    })

    ev.preventDefault()
  }

  const current = comments[currentIndex]
  const plusIndex = () =>
    setCurrentIndex(currentIndex === comments.length - 1 ? 0 : currentIndex + 1)

  return (
    <>
      <div
        className={`modal ${show ? 'show' : ''}`}
        style={{ display: show ? 'block' : 'none' }}
        tabIndex='-1'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-body m-3'>
              <form onSubmit={submit} style={{ color: 'black' }}>
                <div className='row'>
                  <div className='form-group col'>
                    <textarea
                      required
                      className='form-control'
                      name='text'
                      maxLength={300}
                      onChange={(ev) => setDefaultValue(ev.target.value)}
                      defaultValue={defaultValue}
                    />
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='form-group col'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='anon'
                      name='anon'
                      defaultChecked={selfComment ? selfComment.anon : false}
                    />
                    <label className='form-check-label' htmlFor='anon'>
                      {t('Comment_Anon')}
                    </label>
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col mx-auto'>
                    <ButtonLoader
                      loading={loadingComment}
                      type='submit'
                      color='primary'
                    >
                      {t('Save comment')}
                    </ButtonLoader>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col m-2'>
          <div className='blackblock'>
            {current && (
              <div className='row'>
                {comments.length > 1 && (
                  <SideButton
                    side='left'
                    onClick={() =>
                      setCurrentIndex(
                        currentIndex === 0
                          ? comments.length - 1
                          : currentIndex - 1
                      )
                    }
                  />
                )}
                <div className='col py-3' style={{ fontSize: '18px' }}>
                  {current.text}
                  <br />
                  <div className='mt-2'>
                    {current.album && (
                      <span>
                        {' '}
                        -{' '}
                        <Link
                          href={`/album/${current.album.id}`}
                          className={styles.albumSpan}
                        >
                          {current.album.title}
                        </Link>
                      </span>
                    )}
                    {!current.album && current.username && (
                      <span>
                        {' '}
                        -{' '}
                        <Link
                          href={`/profile/${current.username}`}
                          className={styles.albumSpan}
                        >
                          {current.username}
                        </Link>
                      </span>
                    )}
                  </div>
                </div>
                {comments.length > 1 && (
                  <SideButton side='right' onClick={plusIndex} />
                )}
              </div>
            )}

            {albumId && (
              <div className='mt-3 justify-content-center'>
                {user ? (
                  <div>
                    <button
                      onClick={() => (user ? setShow(true) : null)}
                      className='w-100 rounded-3 btn btn-outline-light'
                      style={{ fontSize: '18px' }}
                    >
                      {t(selfComment ? 'Edit comment' : 'Add comment')}
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => router.replace(`${pathname}?login`)}
                      className='w-100 rounded-3 btn btn-outline-light'
                      style={{ fontSize: '18px' }}
                    >
                      {t('Comment_Login')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const getRecentComments = gql`
  query {
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

export function CommentCarrouselSidebar(props) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const timeoutRef = useRef(null)
  const { data, loading } = useQuery(getRecentComments)

  const comments = data?.recentComments || []

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(plusIndex, 10 * 1000)
  }, [currentIndex])

  const current = comments[currentIndex]
  const plusIndex = () =>
    setCurrentIndex(currentIndex === comments.length - 1 ? 0 : currentIndex + 1)

  return (
    <>
      <div className='row mt-3 px-3'>
        <div className={clsx(stylesSidebar.socials, 'col')}>
          {loading ? (
            <Loader className='mx-auto' size={100} />
          ) : current ? (
            <>
              <div className='row'>
                <div className='col pb-3' style={{ fontSize: '18px' }}>
                  {current.text}
                  <br />
                  <div className='mt-2'>
                    {current.album && (
                      <span>
                        {' '}
                        -{' '}
                        <Link
                          href={`/album/${current.album.id}`}
                          className={styles.albumSpan}
                        >
                          {current.album.title}
                        </Link>
                      </span>
                    )}
                    {!current.album && current.username && (
                      <span>
                        {' '}
                        -{' '}
                        <Link
                          href={`/profile/${current.username}`}
                          className={styles.albumSpan}
                        >
                          {current.username}
                        </Link>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-between'>
                <SideButton
                  side='left'
                  onClick={() =>
                    setCurrentIndex(
                      currentIndex === 0
                        ? comments.length - 1
                        : currentIndex - 1
                    )
                  }
                />
                <div className='col d-flex align-items-center justify-content-center'>
                  <div>
                    {currentIndex + 1} / {comments.length}
                  </div>
                </div>
                <SideButton side='right' onClick={plusIndex} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}
