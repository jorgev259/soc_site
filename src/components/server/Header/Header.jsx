import classNames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { gql } from '@apollo/client'

import logo from '@/img/assets/winterlogo.png'
import logoES from '@/img/assets/logo_es.png'

import NavigationBar from './NavigationBar'
import LoginButton from './LoginButton'
// import LangSelector from './LangSelector'
import { getClient } from '@/next/lib/ApolloSSRClient'

import styles from './Header.module.scss'

/*
import { useEffect, useState, useRef } from 'react'

import { Row, Col, Container, Button, Navbar, Nav, NavDropdown, Modal, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'
import serialize from 'form-serialize'
import { useApolloClient, useMutation, useLazyQuery, useQuery, gql } from '@apollo/client'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'

import useUser from './useUser'
import { ButtonLoader } from './Loader'
import SubmitButton from './SubmitButton'
import { useTranslations } from 'next-intl'
import RequestCheck from './RequestCheck'

const cookies = new Cookies()

function ForgorForm (props) {
  const { defaultValue = false } = props
  const t = useTranslations('common')
  const forgorMutation = gql`
    mutation createForgorLink($key: String!){
      createForgorLink(key: $key)
    }
  `
  const [mutateForgor, { loading: loadingForgor }] = useMutation(forgorMutation)
  const [showForgorMessage, setForgorMessage] = useState(defaultValue)

  const handleForgor = ev => {
    ev.preventDefault()
    const variables = serialize(ev.target, { hash: true })

    mutateForgor({ variables })
      .then(() => {
        setForgorMessage(true)
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') console.log(err)
        toast.error(t('Failed_Recover'))
      })
  }

  return showForgorMessage
    ? (
      <Row>
        <Col style={{ color: 'black' }}>
          {t('Email_Sent')}
        </Col>
      </Row>
    )
    : (
      <Form onSubmit={handleForgor}>
        <Row>
          <Form.Group as={Col} >
            <Form.Label htmlFor='username' style={{ color: 'black' }}>{t('Username or email')}:</Form.Label>
            <Form.Control required type='text' name='key' />
          </Form.Group>
        </Row>
        <Row className='mt-4'>
          <Col md={6} className='mx-auto'>
            <ButtonLoader loading={loadingForgor} type='submit' className='w-100' color='primary'>{t('Recover password')}</ButtonLoader>
          </Col>
        </Row>
      </Form>
    )
}

function RegisterProfileButton (props) {
  const { navMobile = false } = props
  const registerMutation = gql`
    mutation ($username: String!, $email: String!, $password: String!, $pfp: Upload) {
      registerUser(username: $username, email: $email, password: $password, pfp: $pfp)
    }
  `

  const { user } = useUser()
  const [showRegister, setRegister] = useState(false)
  const [showForgor, setForgor] = useState(false)
  const t = useTranslations('common')
  const [mutateRegister, { loading: loadingRegister }] = useMutation(registerMutation)

  const p1 = useRef(null)
  const p2 = useRef(null)
  const [isInvalid, setInvalid] = useState(false)

  const checkInvalid = () => setInvalid(p1?.current?.value !== p2?.current?.value)

  const submitRegister = async e => {
    e.persist()
    e.preventDefault()

    const variables = serialize(e.target, { hash: true })
    variables.pfp = e.target.elements.pfp.files[0]

    mutateRegister({ variables })
      .then(res => {
        setRegister(false)
        setForgor(true)
      })
      .catch(error => {
        const { graphQLErrors } = error
        let message = 'Unknown error'

        if (graphQLErrors && graphQLErrors.length > 0) {
          const { message: messageGQL } = graphQLErrors[0]
          message = messageGQL
        }

        console.error(error)
        toast.error(message)
        // console.error('An unexpected error happened:', error)
      })
  }

  useEffect(() => {
    if (!showRegister) setForgor(false)
  }, [showRegister])

  if (navMobile) {
    return (
      user
        ? (
          <NavLink href={`/profile/${user.username}`} name='Profile' className='d-block d-sm-none' />
        )
        : (
          <NavLink onClick={() => setRegister(true)} name='Register' className='d-block d-sm-none' />
        )
    )
  }

  return (
    <>
      <Col xs='auto' className={classNames(styles.login, 'd-none d-sm-block ms-sm-auto mb-sm-5')}>
        {user
          ? (
            <Link href={`/profile/${user.username}`}><Button variant="primary">{t('Profile')}</Button></Link>
          )
          : (
            <Button onClick={() => setRegister(true)} className='me-0' variant="primary">{t('Register')}</Button>
          )}
      </Col>
      <Modal show={showRegister} centered onHide={() => setRegister(false)}>
        <Modal.Body className='m-3'>
          {showForgor
            ? <ForgorForm defaultValue={true} />
            : (
              <Form onSubmit={submitRegister}>
                <Row>
                  <Form.Group as={Col} >
                    <Form.Label htmlFor='username' style={{ color: 'black' }}>Username:</Form.Label>
                    <Form.Control required type='text' name='username' />
                  </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label htmlFor='email' style={{ color: 'black' }}>Email:</Form.Label>
                    <Form.Control required type='text' name='email' />
                  </Form.Group>
                </Row>
                <Row className='mt-3'>
                  <Form.Group as={Col} >
                    <Form.Label htmlFor='password' style={{ color: 'black' }}>Password:</Form.Label>
                    <Form.Control required type='password' name='password' isInvalid={isInvalid} ref={p1} onChange={checkInvalid} />
                  </Form.Group>
                </Row>
                <Row className='mt-3'>
                  <Form.Group as={Col} >
                    <Form.Label htmlFor='passwordCheck' style={{ color: 'black' }}>Repeat password:</Form.Label>
                    <Form.Control required type='password' name='passwordCheck' isInvalid={isInvalid} ref={p2} onChange={checkInvalid} />
                  </Form.Group>
                </Row>
                <Row className='mt-3'>
                  <Form.Group as={Col} >
                    <Form.Label htmlFor='pfp' style={{ color: 'black' }}>Profile pic:</Form.Label>
                    <Form.Control type='file' name='pfp' />
                  </Form.Group>
                </Row>
                <Row className='mt-4'>
                  <Col md={4} className='mx-auto'>
                    <SubmitButton loading={loadingRegister} type='submit' className='w-100' color='primary'>Register</SubmitButton>
                  </Col>
                </Row>
              </Form>
            )
          }
        </Modal.Body>
      </Modal>
    </>
  )
} */

const bannerQuery = gql`
  query getBanner{
    config(name: "banner"){
      value
    }
  }
`

const pagesQuery = gql`
  query getPages{
    me {
      pages {
        url
      }
    }
  }
`

async function LogoCol (props) {
  const { locale } = props
  const client = getClient()
  const { data: headerData } = await client.query({ query: bannerQuery })

  return (
    <>
      <div className={classNames(styles.bgImage)}>
        <Image
          fill priority alt=''
          src={`https://cdn.sittingonclouds.net/live/${headerData.config.value}.png`}
          quality={50}
          style={{ objectFit: 'cover' }}/>
      </div>
      <div className='col-auto'>
        <Link className='ps-5 ms-4' href="/">
          <Image alt='SOC Logo' src={locale === 'es' ? logoES : logo} height={150} width={265} />
        </Link>
      </div>
    </>
  )
}

export default async function Header (props) {
  const { locale } = props
  const client = getClient()

  const { data: pagesData } = await client.query({ query: pagesQuery })

  return (
    <div className='container-fluid'>
      <div className={classNames('row', styles.logoRow)}>
        <LogoCol locale={locale} />
        {/* <LangSelector /> */}
        <div className='col-auto ms-auto pe-4 me-5'>
          {/* <RegisterProfileButton /> */}
          <LoginButton />
        </div>
      </div>
      <div className='row'>
        <div className='col px-0'>
          <NavigationBar pages={pagesData?.me?.pages || []} />
        </div>
      </div>
    </div>
  )
}

/* const vgmQuery = gql`
  query ($search: String!){
    vgmdb(search: $search){
      vgmdbUrl
      name
      subTitle
      releaseDate
      artists
      categories
      classifications
      tracklist {
        number
        body
      }
    }
  }
`

const submitQuery = gql`
  mutation ($title: String!, $vgmdb: String, $request: ID, $links: String!) {
    submitAlbum (title: $title, vgmdb: $vgmdb, request: $request, links: $links) {
      id
    }
  }
`

function SubmitAlbum () {
  const [show, setShow] = useState(false)
  const vgmdbRef = useRef(null)
  const titleRef = useRef(null)

  const [getVgmdb, { loading: loadingFetch }] = useLazyQuery(vgmQuery)
  const [submitMutation, { loading: loadingSubmit }] = useMutation(submitQuery)

  async function fetchInfo () {
    const { data } = await getVgmdb({ variables: { search: vgmdbRef.current.value } })

    if (data?.vgmdb) {
      const { vgmdb } = data
      const { vgmdbUrl, name } = vgmdb

      vgmdbRef.current.value = vgmdbUrl
      titleRef.current.value = name
    }
  }

  function submit (ev) {
    ev.persist()
    ev.preventDefault()

    const variables = serialize(ev.target, { hash: true })
    submitMutation({ variables })
      .then(() => {
        toast.success('Album submitted for review!')
        ev.target.reset()
        setShow(false)
      })
  }

  return (
    <>
      <NavLink href='/submit' name='Submit Album' privileged onClick={() => setShow(true)} />
      <Modal show={show} centered onHide={() => setShow(false)}>
        <Modal.Body className='m-3'>
          <Form onSubmit={submit} style={{ color: 'black' }}>
            <Row>
              <Form.Group as={Col} >
                <Form.Label htmlFor='title' >Title:</Form.Label>
                <Form.Control required type='text' name='title' ref={titleRef} />
              </Form.Group>
            </Row>
            <Row className='mt-3'>
              <Form.Group as={Col}>
                <Form.Label htmlFor='vgmdb'>VGMdb:</Form.Label>
                <Form.Control ref={vgmdbRef} name='vgmdb' type='text' />
              </Form.Group>

              <Form.Group as={Col} className='col-auto mt-auto'>
                <ButtonLoader color='primary' loading={loadingFetch} onClick={fetchInfo}>Fetch info</ButtonLoader>
              </Form.Group>
            </Row>

            <RequestCheck hideTag element={vgmdbRef.current} className='mt-3' />

            <Row className='mt-3'>
              <Form.Group as={Col} >
                <Form.Label htmlFor='links'><Link style={{ color: '#0d6efd', textDecoration: 'underline' }} href="https://www.squid-board.org/">Forum Links</Link> / Download Links:</Form.Label>
                <Form.Control required as='textarea' name='links' />
              </Form.Group>
            </Row>

            <Row className='mt-3'>
              <Col>
                <SubmitButton loading={loadingSubmit} type='submit' color='primary'>Submit</SubmitButton>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

*/
