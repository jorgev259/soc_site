import { Col, Button, Modal, Form, Row, FormControl } from 'react-bootstrap'
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
    <Col xs={'auto'}>
      <Button
        onClick={onClick}
        className='h-100 rounded-3'
        variant='outline-light'
        style={{ fontSize: '30px' }}
      >
        <span className={`fas fa-angle-${side}`} />
      </Button>
    </Col>
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
      <Row>
        <Col className='m-2'>
          <div className='blackblock'>
            <Row>
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
              <Col className='py-3' style={{ fontSize: '18px' }}>
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
              </Col>
              {comments.length > 1 && (
                <SideButton side='right' onClick={plusIndex} />
              )}
            </Row>
          </div>
        </Col>
      </Row>
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
      <Modal show={show} centered onHide={() => setShow(false)}>
        <Modal.Body className='m-3'>
          <Form onSubmit={submit} style={{ color: 'black' }}>
            <Row>
              <Form.Group as={Col}>
                <FormControl
                  required
                  as='textarea'
                  name='text'
                  maxLength={300}
                  onChange={(ev) => setDefaultValue(ev.target.value)}
                  defaultValue={defaultValue}
                />
              </Form.Group>
            </Row>
            <Row className='mt-2'>
              <Form.Group as={Col}>
                <Form.Check
                  type='checkbox'
                  label={t('Comment_Anon')}
                  name='anon'
                  defaultChecked={selfComment ? selfComment.anon : false}
                />
              </Form.Group>
            </Row>
            <Row className='mt-2'>
              <Col className='mx-auto'>
                <ButtonLoader
                  loading={loadingComment}
                  type='submit'
                  color='primary'
                >
                  {t('Save comment')}
                </ButtonLoader>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        <Col className='m-2'>
          <div className='blackblock'>
            {current && (
              <Row>
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
                <Col className='py-3' style={{ fontSize: '18px' }}>
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
                </Col>
                {comments.length > 1 && (
                  <SideButton side='right' onClick={plusIndex} />
                )}
              </Row>
            )}

            {albumId && (
              <Row className='mt-3 justify-content-center'>
                {user ? (
                  <Col xs={3}>
                    <Button
                      onClick={() => (user ? setShow(true) : null)}
                      className='w-100 rounded-3'
                      variant='outline-light'
                      style={{ fontSize: '18px' }}
                    >
                      {t(selfComment ? 'Edit comment' : 'Add comment')}
                    </Button>
                  </Col>
                ) : (
                  <Col xs='4'>
                    <Button
                      onClick={() => router.replace(`${pathname}?login`)}
                      className='w-100 rounded-3'
                      variant='outline-light'
                      style={{ fontSize: '18px' }}
                    >
                      {t('Comment_Login')}
                    </Button>
                  </Col>
                )}
              </Row>
            )}
          </div>
        </Col>
      </Row>
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
      <Row className='mt-3 px-3'>
        <Col className={clsx(stylesSidebar.socials, '')}>
          {loading ? (
            <Loader className='mx-auto' size={100} />
          ) : current ? (
            <>
              <Row>
                <Col className='pb-3' style={{ fontSize: '18px' }}>
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
                </Col>
              </Row>
              <Row className='d-flex justify-content-between'>
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
                <Col className='d-flex align-items-center justify-content-center'>
                  <div>
                    {currentIndex + 1} / {comments.length}
                  </div>
                </Col>
                <SideButton side='right' onClick={plusIndex} />
              </Row>
            </>
          ) : null}
        </Col>
      </Row>
    </>
  )
}
