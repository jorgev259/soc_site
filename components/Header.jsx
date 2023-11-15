'use client'
import styles from '@/styles/Header.module.scss'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { Row, Col, Container, Button, Navbar, Nav, NavDropdown, Modal, Form, ModalBody } from 'react-bootstrap'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import serialize from 'form-serialize'
import { useApolloClient, useMutation, useLazyQuery, useQuery, gql } from '@apollo/client'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'

import logo from '../public/img/assets/winterlogo.png'
import logoES from '../public/img/assets/logo_es.png'

import useUser from './useUser'
import { ButtonLoader } from './Loader'
import SubmitButton from './SubmitButton'
import RequestCheck from './RequestCheck'
// import LangSelector from '@/next/components/Header/LangSelector'

function ForgorForm (props) {
  const { defaultValue = false } = props
  const t = useTranslations('login')
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

function LoginButton (props) {
  const { navMobile = false } = props
  const loginQuery = gql`
    query Login($username: String!, $password: String!){
      login(username: $username, password: $password)
    }
  `
  const logoutQuery = gql`
    query {
      logout
    }
  `
  const router = useRouter()
  const { user, refetch } = useUser()
  const client = useApolloClient()
  const [queryLogin, { loading: loadingLogin }] = useLazyQuery(loginQuery)

  const [showForgor, setForgor] = useState(false)
  const [show, setShow] = useState(false)
  const t = useTranslations('login')

  function setUrl (value) {
    const url = value ? `${router.asPath}?login` : router.asPath.replace('?login', '')
    router.replace(url, url, { scroll: false })
  }

  useEffect(() => {
    if (!show) setForgor(false)
  }, [show])

  useEffect(() => {
    const flag = router.query.login !== undefined
    if (flag !== show) setShow(flag)
  }, [router.query.login])

  const handleLogin = () => {
    if (user) {
      client.query({ query: logoutQuery })
        .then(() => {
          refetch()
          setUrl(false)
        })
        .catch(error => console.error('An unexpected error happened:', error))
    } else setUrl(true)
  }

  const submit = e => {
    e.persist()
    e.preventDefault()
    const variables = serialize(e.target, { hash: true })

    queryLogin({ variables })
      .then(res => {
        const { error } = res
        if (error) {
          const { graphQLErrors } = error
          let message = 'Unknown error'

          if (graphQLErrors && graphQLErrors.length > 0) {
            const { code } = graphQLErrors[0].extensions
            if (code === 'BAD_USER_INPUT') message = t('Invalid_Login')
          }

          console.error(error)
          toast.error(message)
        } else {
          refetch()
          setUrl(false)
        }
      })
      .catch(error => console.error('An unexpected error happened:', error))
  }

  if (navMobile) {
    return <NavLink onClick={handleLogin} name={user ? 'Logout' : 'Login'} className='d-block d-sm-none' />
  }

  return (
    <>
      <Col xs='auto' className={classNames(styles.login, 'd-none d-sm-block ms-sm-auto mb-sm-5')}>
        <Button onClick={handleLogin} variant="primary">{t(user ? 'Logout' : 'Login')}</Button>
      </Col>
      <Modal show={show} centered onHide={() => setUrl(false)}>
        <Modal.Body className='m-3'>
          {showForgor
            ? <ForgorForm />
            : (
              <Form onSubmit={submit}>
                <Row>
                  <Form.Group as={Col} >
                    <Form.Label htmlFor='username' style={{ color: 'black' }}>{t('Username')}:</Form.Label>
                    <Form.Control required type='text' name='username' />
                  </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label htmlFor='password' style={{ color: 'black' }}>{t('Password')}:</Form.Label>
                    <Form.Control required type='password' name='password' />
                  </Form.Group>
                </Row>
                <Row className='mt-4'>
                  <Col md={4} className='mx-auto'>
                    <SubmitButton loading={loadingLogin} type='submit' className='w-100' color='primary'>{t('Login')}</SubmitButton>
                  </Col>
                </Row>
                {/* <Row className='mt-2'>
                  <Col md={6} className='mx-auto'>
                    <Button onClick={() => setForgor(true)} className='w-100' color='primary'>{t('Recover password')}</Button>
                  </Col>
            </Row> */}
              </Form>
            )
          }
        </Modal.Body>
      </Modal>
    </>
  )
}

function RegisterProfileButton (props) {
  const { navMobile = false } = props
  const registerMutation = gql`
    mutation ($username: String!, $email: String!, $pfp: Upload) {
      registerUser(username: $username, email: $email, pfp: $pfp)
    }
  `

  const { user } = useUser()
  const [showRegister, setRegister] = useState(false)
  const [showForgor, setForgor] = useState(false)
  const [showSuccess, setSuccess] = useState(false)
  const t = useTranslations('login')
  const [mutateRegister, { loading: loadingRegister }] = useMutation(registerMutation)

  const submitRegister = async e => {
    e.persist()
    e.preventDefault()

    const variables = serialize(e.target, { hash: true })
    variables.pfp = e.target.elements.pfp.files[0]

    mutateRegister({ variables })
      .then(res => {
        setRegister(false)
        setSuccess(true)
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
      <Modal show={showSuccess} centered onHide={() => setSuccess(false)}>
        <ModalBody style={{ color: 'black' }}>
          {t('Email_Sent')}
        </ModalBody>
      </Modal>
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
}

export default function Header () {
  const router = useRouter()

  const queryHeader = gql`
    query {
      config(name: "banner"){
        value
      }
    }
  `

  const { data: headerData } = useQuery(queryHeader)

  return <>
    <header>
      <div id={styles.bannerBg} style={headerData ? { backgroundImage: `url('/_next/image?w=3840&q=100&url=${`https://cdn.sittingonclouds.net/live/${headerData.config.value}.png`}` } : {}}>
        <Container>
          <Row className='h-100'>
            <Col className='my-auto'>
              <Link href="/">
                <Image alt='SOC Logo' src={router.locale === 'es' ? logoES : logo} height={150} width={265} />
              </Link>
            </Col>

            {/* <LangSelector /> */}
            <RegisterProfileButton />
            <LoginButton />
          </Row>
        </Container>
      </div>

      <Navbar expand='sm' bg="dark" variant="dark" className='py-md-0'>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto d-flex align-items-center">
              <RegisterProfileButton navMobile />
              <LoginButton navMobile />
              <NavLink href='/' name='Home' />
              <NavLink href='/last-added' name='Last Added' />
              <NavLink href='/album/list' name='Album List' />
              <Dropdown name='Games' items={[
                { name: 'Albums', href: '/game' },
                { name: 'Series', href: '/series/list' },
                { name: 'Publishers', href: '/publisher/list' },
                { name: 'Platforms', href: '/platform/list' },
                { name: 'Game List', href: '/game/list' }
              ]} />
              <Dropdown name='Animation' items={[
                { name: 'Albums', href: '/anim' },
                { name: 'Animation List', href: '/anim/list' },
                { name: 'Studios', href: '/studio/list' }
              ]} />

              <NavLink href='/request' name='Requests' privileged />
              <SubmitAlbum />
              <Dropdown name='Admin Grounds' privileged items={[
                { name: 'Manage Albums', href: '/admin/1' },
                { name: 'Manage Users', href: '/admin/user' },
                { name: 'Manage Requests', href: '/admin/request' },
                { name: 'Manage Submissions', href: '/admin/submission' }
              ]} />
            </Nav>
          </Navbar.Collapse>
          <SearchBar />
        </Container>
      </Navbar>
    </header>
  </>
}

const vgmQuery = gql`
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

function Dropdown (props) {
  const { name, items = [], privileged = false } = props

  const { user } = useUser()
  const t = useTranslations('header')

  const pages = user?.pages.map(p => p.url) || []
  const links = items.filter(i => !privileged || pages.includes(i.href))

  if (links.length === 0) return null

  return (
    <NavDropdown title={t(name)} className={classNames(styles.navLink, styles.dropMenu)}>
      {links.map(({ href, name }, i) => (
        <Link key={i} href={href} passHref legacyBehavior>
          <NavDropdown.Item>{t(name)}</NavDropdown.Item>
        </Link>
      ))}
    </NavDropdown>
  )
}

function NavLink (props) {
  const { href, name, onClick, className, privileged } = props

  const { user } = useUser()
  const t = useTranslations('header')

  const title = t(name)
  const pages = user?.pages.map(p => p.url) || []

  if (privileged) {
    if (!user || !pages.includes(href)) return null
  }

  return onClick
    ? <a onClick={onClick} className={classNames(styles.navLink, 'nav-link', className)}>{title}</a>
    : (
      <Link href={href} passHref legacyBehavior>
        <Nav.Link className={classNames(styles.navLink, className)}>{title}</Nav.Link>
      </Link>
    )
}

function SearchBar () {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
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
    <div id={styles.search} className={classNames({ 'w-100': open })}>
      <input ref={ref} onBlur={() => setOpen(false)} onKeyDown={onKeyDownHandler} type='text' style={{ display: open ? 'block' : 'none' }} />
      <i className={`fas fa-${open ? 'times' : 'search'}`} style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)} />
    </div>
  )
}
