'use client'
import { Suspense, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { gql, useSuspenseQuery, useMutation } from '@apollo/client'
import { useTranslations } from 'next-intl'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import styles from './CommentCarrousel.module.scss'

import { Link } from '@/next/lib/navigation'
import sidebarStyles from '@/next/components/common/Sidebar/Sidebar.module.scss'
import {
  ModalTemplate,
  hideModal,
  showModal
} from '@/next/components/common/Modal'
import SubmitButton from '@/next/components/common/SubmitButton'

function SideButton(props) {
  const { side, onClick } = props

  return (
    <div className='col-auto'>
      <button
        className='btn btn-outline-light h-100 rounded-3'
        onClick={onClick}
        style={{ fontSize: '30px' }}
      >
        <span className={`fas fa-angle-${side}`} />
      </button>
    </div>
  )
}

const getRecentComments = gql`
  query RecentComments {
    recentComments {
      id
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

const getComments = gql`
  query GetComments($id: ID!) {
    album(id: $id) {
      id
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
  mutation UpdateComment($text: String!, $anon: Boolean!, $id: ID!) {
    updateComment(text: $text, anon: $anon, albumId: $id)
  }
`

const sideBarClassnames = classNames(
  'col',
  sidebarStyles.section,
  styles.comments
)
const albumClassnames = classNames('row mb-3', styles.comments)

const modalId = 'commentForm'
const modalSelector = `#${modalId}`

export default function CommentCarrousel(props) {
  const { isFAU, id } = props

  const { data, refetch } = useSuspenseQuery(getComments, { variables: { id } })
  const { comments, selfComment } = data.album

  const [updateComment, { loading }] = useMutation(mutateComment)

  const t = useTranslations('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [defaultValue, setDefaultValue] = useState()
  const timeoutRef = useRef(null)

  const nextIndex = currentIndex === comments.length - 1 ? 0 : currentIndex + 1
  const pastIndex = currentIndex === 0 ? comments.length - 1 : currentIndex - 1
  const current = comments[currentIndex]
  const isMultiple = comments.length >= 2

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCurrentIndex(nextIndex), 10 * 1000)
  }, [currentIndex, setCurrentIndex, nextIndex])

  function submit(ev) {
    let variables = serialize(ev.target, { hash: true })
    variables = { ...variables, anon: variables.anon === 'on', id }

    updateComment({ variables })
      .then(() => {
        refetch()
        hideModal(modalSelector)
      })
      .catch((err) => {
        console.log(err)
        toast.error(t('Comment_error'))
      })

    ev.preventDefault()
  }

  return (
    <>
      <div className='blackBox'>
        <Suspense
          fallback={
            <div
              className={classNames(
                'loadingAnim position-relative',
                albumClassnames
              )}
            />
          }
        >
          {comments.length > 0 ? (
            <div className={albumClassnames}>
              {isMultiple ? (
                <SideButton
                  side='left'
                  onClick={() => setCurrentIndex(pastIndex)}
                />
              ) : null}
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
              {isMultiple ? (
                <SideButton
                  side='right'
                  onClick={() => setCurrentIndex(nextIndex)}
                />
              ) : null}
            </div>
          ) : null}
        </Suspense>
        <div className='row justify-content-center'>
          {isFAU ? (
            <>
              <ModalTemplate id={modalId}>
                <form onSubmit={submit}>
                  <div className='row'>
                    <div className='col'>
                      <textarea
                        className='form-control'
                        required
                        name='text'
                        maxLength={300}
                        onChange={(ev) => setDefaultValue(ev.target.value)}
                        defaultValue={defaultValue}
                      />
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          defaultChecked={
                            selfComment ? selfComment.anon : false
                          }
                          name='anon'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='flexCheckDefault'
                        >
                          {t('Comment_Anon')}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='row mt-2'>
                    <div className='col mx-auto'>
                      <SubmitButton loading={loading}>
                        {t('Save comment')}
                      </SubmitButton>
                    </div>
                  </div>
                </form>
              </ModalTemplate>
              <div className='col col-3'>
                <button
                  onClick={() => showModal(modalSelector)}
                  className='btn btn-outline-light w-100 rounded-3'
                  style={{ fontSize: '18px' }}
                >
                  {t(selfComment ? 'Edit comment' : 'Add comment')}
                </button>
              </div>
            </>
          ) : (
            <div className='col col-4'>
              <button
                onClick={() => showModal('#loginModal')}
                className='btn btn-outline-light w-100 rounded-3'
                style={{ fontSize: '18px' }}
              >
                {t('Comment_Login')}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export function CommentCarrouselSidebar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef(null)

  const { data } = useSuspenseQuery(getRecentComments)
  const comments = data?.recentComments || []

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(plusIndex, 10 * 1000)
  }, [currentIndex])

  const current = comments[currentIndex]
  const plusIndex = () =>
    setCurrentIndex(currentIndex === comments.length - 1 ? 0 : currentIndex + 1)

  return (
    <div className='row mt-3 px-3'>
      <Suspense
        fallback={
          <div className={classNames(sideBarClassnames, 'loadingAnim')} />
        }
      >
        <div className={sideBarClassnames}>
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
                  currentIndex === 0 ? comments.length - 1 : currentIndex - 1
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
        </div>
      </Suspense>
    </div>
  )
}
