'use client'
import styles from '@/styles/Header.module.scss'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/legacy/image'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'
import serialize from 'form-serialize'
import { useMutation, useLazyQuery, useQuery, gql } from '@apollo/client'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'

import logo from '../public/img/assets/winterlogo.png'
import logoES from '../public/img/assets/logo_es.png'

import { Link, usePathname, useRouter } from '@/next/utils/navigation'
import useUser from '@/next/utils/useUser'
import { ButtonLoader } from './Loader'
import SubmitButton from '@/next/components/common/SubmitButton'
import RequestCheck from './RequestCheck'

// import LangSelector from '@/next/components/Header/LangSelector'

function ForgorForm(props) {
  const { defaultValue = false } = props
  const t = useTranslations('login')
  const forgorMutation = gql`
    mutation createForgorLink($key: String!) {
      createForgorLink(key: $key)
    }
  `
  const [mutateForgor, { loading: loadingForgor }] = useMutation(forgorMutation)
  const [showForgorMessage, setForgorMessage] = useState(defaultValue)

  const handleForgor = (ev) => {
    ev.preventDefault()
    const variables = serialize(ev.target, { hash: true })

    mutateForgor({ variables })
      .then(() => {
        setForgorMessage(true)
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') console.log(err)
        toast.error(t('Failed_Recover'))
      })
  }

  return showForgorMessage ? (
    <div className='row'>
      <div className='col' style={{ color: 'black' }}>
        {t('Email_Sent')}
      </div>
    </div>
  ) : (
    <form onSubmit={handleForgor}>
      <div className='row'>
        <div className='col'>
          <label htmlFor='username' style={{ color: 'black' }}>
            {t('Username or email')}:
          </label>
          <input required type='text' name='key' className='form-control' />
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-6 mx-auto'>
          <ButtonLoader
            loading={loadingForgor}
            type='submit'
            className='w-100'
            color='primary'
          >
            {t('Recover password')}
          </ButtonLoader>
        </div>
      </div>
    </form>
  )
}

const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`
const logoutMutation = gql`
  mutation Logout {
    logout
  }
`

function LoginButton(props) {
  const { navMobile = false } = props

  const router = useRouter()
  const { user, refetch } = useUser()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [loginMutate, { loading: loadingLogin }] = useMutation(loginMutation)
  const [logoutMutate /*, { loading: loadingLogout } */] =
    useMutation(logoutMutation)

  const [showForgor, setForgor] = useState(false)
  const [show, setShow] = useState(false)
  const t = useTranslations('login')

  const loginParam = searchParams.get('login')

  function setUrl(value) {
    const url = value ? `${pathname}?login` : pathname.replace('?login', '')
    router.replace(url, url, { scroll: false })
  }

  useEffect(() => {
    if (!show) setForgor(false)
  }, [show])

  useEffect(() => {
    const flag = loginParam !== null
    if (flag !== show) setShow(flag)
  }, [loginParam])

  const handleLogin = () => {
    if (user) {
      logoutMutate()
        .then(() => {
          refetch()
          setUrl(false)
        })
        .catch((error) => console.error('An unexpected error happened:', error))
    } else setUrl(true)
  }

  const submit = (e) => {
    e.persist()
    e.preventDefault()
    const variables = serialize(e.target, { hash: true })

    loginMutate({ variables })
      .then((res) => {
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
      .catch((error) => console.error('An unexpected error happened:', error))
  }

  if (navMobile) {
    return (
      <NavLink onClick={handleLogin} className='d-block d-sm-none'>
        {t(user ? 'Logout' : 'Login')}
      </NavLink>
    )
  }

  return (
    <>
      <div
        className={clsx(
          styles.login,
          'col-auto d-none d-sm-block ms-sm-auto mb-sm-5'
        )}
      >
        <button onClick={handleLogin} className='btn btn-primary'>
          {t(user ? 'Logout' : 'Login')}
        </button>
      </div>
      <div
        className={clsx('modal', { show, 'd-block': show })}
        tabIndex='-1'
        role='dialog'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body m-3'>
              {showForgor ? (
                <ForgorForm />
              ) : (
                <form onSubmit={submit}>
                  <div className='row'>
                    <div className='col'>
                      <label htmlFor='username' style={{ color: 'black' }}>
                        {t('Username')}:
                      </label>
                      <input
                        required
                        type='text'
                        name='username'
                        className='form-control'
                      />
                    </div>

                    <div className='col'>
                      <label htmlFor='password' style={{ color: 'black' }}>
                        {t('Password')}:
                      </label>
                      <input
                        required
                        type='password'
                        name='password'
                        className='form-control'
                      />
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col-md-4 mx-auto'>
                      <SubmitButton
                        loading={loadingLogin}
                        type='submit'
                        className='w-100'
                        color='primary'
                      >
                        {t('Login')}
                      </SubmitButton>
                    </div>
                  </div>
                  {/* <div className='row mt-2'>
                      <div className='col-md-6 mx-auto'>
                        <button onClick={() => setForgor(true)} className='btn btn-primary w-100'>{t('Recover password')}</button>
                      </div>
                  </div> */}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function RegisterProfileButton(props) {
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
  const [mutateRegister, { loading: loadingRegister }] =
    useMutation(registerMutation)

  const submitRegister = async (e) => {
    e.persist()
    e.preventDefault()

    const variables = serialize(e.target, { hash: true })
    variables.pfp = e.target.elements.pfp.files[0]

    mutateRegister({ variables })
      .then((res) => {
        setRegister(false)
        setSuccess(true)
      })
      .catch((error) => {
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
    return user ? (
      <NavLink href={`/profile/${user.username}`} className='d-block d-sm-none'>
        {t('Profile')}
      </NavLink>
    ) : (
      <NavLink
        onClick={() => setRegister(true)}
        name='Register'
        className='d-block d-sm-none'
      />
    )
  }

  return (
    <>
      <div className={clsx('col-auto ms-auto mb-sm-5', styles.login)}>
        {user ? (
          <Link href={`/profile/${user.username}`} className='btn btn-primary'>
            {t('Profile')}
          </Link>
        ) : (
          <button className='btn btn-primary' onClick={() => setRegister(true)}>
            {t('Register')}
          </button>
        )}
      </div>
      <div
        className={clsx('modal', {
          show: showRegister,
          'd-block': showRegister
        })}
        tabIndex='-1'
        role='dialog'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body m-3'>
              {showForgor ? (
                <ForgorForm defaultValue={true} />
              ) : (
                <form onSubmit={submitRegister}>
                  <div className='row'>
                    <div className='col'>
                      <label htmlFor='username' style={{ color: 'black' }}>
                        {t('Username')}:
                      </label>
                      <input
                        required
                        type='text'
                        name='username'
                        className='form-control'
                      />
                    </div>

                    <div className='col'>
                      <label htmlFor='email' style={{ color: 'black' }}>
                        {t('Email')}:
                      </label>
                      <input
                        required
                        type='email'
                        name='email'
                        className='form-control'
                      />
                    </div>
                  </div>
                  <div className='row mt-4'>
                    <div className='col'>
                      <label htmlFor='pfp' style={{ color: 'black' }}>
                        {t('Profile pic')}:
                      </label>
                      <input type='file' name='pfp' className='form-control' />
                    </div>
                  </div>

                  <div className='row mt-4'>
                    <div className='col-md-6 mx-auto'>
                      <SubmitButton
                        loading={loadingRegister}
                        type='submit'
                        className='w-100'
                        color='primary'
                      >
                        {t('Register')}
                      </SubmitButton>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={clsx('modal', { show: showSuccess, 'd-block': showSuccess })}
        tabIndex='-1'
        role='dialog'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-body m-3'>
              <div className='row'>
                <div className='col' style={{ color: 'black' }}>
                  {t('Email_Sent')}
                </div>
              </div>
              <div className='row mt-4'>
                <div className='col-md-4 mx-auto'>
                  <button
                    className='btn btn-primary w-100'
                    onClick={() => setSuccess(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Header(props) {
  const router = useRouter()

  const queryHeader = gql`
    query {
      config(name: "banner") {
        value
      }
    }
  `

  const { data: headerData } = useQuery(queryHeader)

  return (
    <>
      <header>
        <div
          id={styles.bannerBg}
          style={
            headerData
              ? {
                  backgroundImage: `url('/_next/image?w=3840&q=100&url=${`https://cdn.sittingonclouds.net/live/${headerData.config.value}.png`}`
                }
              : {}
          }
        >
          <div className='container'>
            <div className='row h-100'>
              <div className='col my-auto'>
                <Link href='/'>
                  <Image
                    alt='SOC Logo'
                    src={router.locale === 'es' ? logoES : logo}
                    height={150}
                    width={265}
                  />
                </Link>
              </div>
              {/* <LangSelector /> */}
              <RegisterProfileButton />
              <LoginButton />
            </div>
          </div>
        </div>

        <nav
          data-bs-theme='dark'
          className='navbar navbar-expand-sm bg-dark py-md-0'
        >
          <div className='container'>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#responsive-navbar-nav'
              aria-controls='responsive-navbar-nav'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse'
              id='responsive-navbar-nav'
            >
              <ul className='navbar-nav me-auto d-flex align-items-center'>
                <RegisterProfileButton navMobile />
                <LoginButton navMobile />
                <NavLink href='/' name='Home' />
                <NavLink href='/last-added' name='Last Added' />
                <NavLink href='/album/list' name='Album List' />
                <Dropdown
                  name='Games'
                  items={[
                    { name: 'Albums', href: '/game' },
                    { name: 'Series', href: '/series/list' },
                    { name: 'Publishers', href: '/publisher/list' },
                    { name: 'Platforms', href: '/platform/list' },
                    { name: 'Game List', href: '/game/list' }
                  ]}
                />
                <Dropdown
                  name='Animation'
                  items={[
                    { name: 'Albums', href: '/anim' },
                    { name: 'Animation List', href: '/anim/list' },
                    { name: 'Studios', href: '/studio/list' }
                  ]}
                />

                <NavLink href='/request' name='Requests' privileged />
                <SubmitAlbum />
                <Dropdown
                  name='Admin Grounds'
                  privileged
                  items={[
                    { name: 'Manage Albums', href: '/admin/1' },
                    { name: 'Manage Users', href: '/admin/user' },
                    { name: 'Manage Requests', href: '/admin/request' },
                    { name: 'Manage Submissions', href: '/admin/submission' }
                  ]}
                />
              </ul>
            </div>
            <SearchBar />
          </div>
        </nav>
      </header>
    </>
  )
}

const vgmQuery = gql`
  query ($url: String!) {
    vgmdb(url: $url) {
      title
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
    submitAlbum(
      title: $title
      vgmdb: $vgmdb
      request: $request
      links: $links
    ) {
      id
    }
  }
`

function SubmitAlbum() {
  const [show, setShow] = useState(false)
  const vgmdbRef = useRef(null)
  const titleRef = useRef(null)

  const [getVgmdb, { loading: loadingFetch }] = useLazyQuery(vgmQuery)
  const [submitMutation, { loading: loadingSubmit }] = useMutation(submitQuery)

  async function fetchInfo() {
    const { data } = await getVgmdb({
      variables: { url: vgmdbRef.current.value }
    })
    titleRef.current.value = data?.vgmdb?.title
  }

  function submit(ev) {
    ev.persist()
    ev.preventDefault()

    const variables = serialize(ev.target, { hash: true })
    submitMutation({ variables }).then(() => {
      toast.success('Album submitted for review!')
      ev.target.reset()
      setShow(false)
    })
  }

  return (
    <>
      <NavLink
        href='/submit'
        name='Submit Album'
        privileged
        onClick={() => setShow(true)}
      />
      <div
        className={`modal ${show ? 'show' : ''}`}
        tabIndex='-1'
        style={{ display: show ? 'block' : 'none' }}
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-body m-3'>
              <form onSubmit={submit} style={{ color: 'black' }}>
                <div className='row'>
                  <div className='form-group col'>
                    <label htmlFor='title'>Title:</label>
                    <input
                      required
                      type='text'
                      name='title'
                      ref={titleRef}
                      className='form-control'
                    />
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='form-group col'>
                    <label htmlFor='vgmdb'>VGMdb:</label>
                    <input
                      ref={vgmdbRef}
                      name='vgmdb'
                      type='text'
                      className='form-control'
                    />
                  </div>
                  <div className='form-group col-auto mt-auto'>
                    <ButtonLoader
                      color='primary'
                      loading={loadingFetch}
                      onClick={fetchInfo}
                    >
                      Fetch info
                    </ButtonLoader>
                  </div>
                </div>

                <RequestCheck
                  hideTag
                  element={vgmdbRef.current}
                  className='mt-3'
                />

                <div className='row mt-3'>
                  <div className='form-group col'>
                    <label htmlFor='links'>
                      <a
                        style={{
                          color: '#0d6efd',
                          textDecoration: 'underline'
                        }}
                        href='https://www.squid-board.org/'
                      >
                        Forum Links
                      </a>{' '}
                      / Download Links:
                    </label>
                    <textarea
                      required
                      name='links'
                      className='form-control'
                    ></textarea>
                  </div>
                </div>

                <div className='row mt-3'>
                  <div className='col'>
                    <SubmitButton
                      loading={loadingSubmit}
                      type='submit'
                      color='primary'
                    >
                      Submit
                    </SubmitButton>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className='modal-backdrop show'
          onClick={() => setShow(false)}
        ></div>
      </div>
    </>
  )
}

function Dropdown(props) {
  const { name, items = [], privileged = false } = props

  const { user } = useUser()
  const t = useTranslations('header')

  const pages = user?.pages.map((p) => p.url) || []
  const links = items.filter((i) => !privileged || pages.includes(i.href))

  if (links.length === 0) return null

  return (
    <li className={clsx('dropdown nav-item', styles.navLink, styles.dropMenu)}>
      <button
        className='nav-link dropdown-toggle'
        href='#'
        role='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {t(name)}
      </button>
      <ul className='dropdown-menu'>
        {links.map(({ href, name }, i) => (
          <li key={i}>
            <Link href={href} passHref legacyBehavior>
              <a className='dropdown-item'>{t(name)}</a>
            </Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

function NavLink(props) {
  const { href, name, onClick, className, privileged } = props

  const { user } = useUser()
  const t = useTranslations('header')

  const title = t(name)
  const pages = user?.pages.map((p) => p.url) || []

  if (privileged) {
    if (!user || !pages.includes(href)) return null
  }

  return onClick ? (
    <a
      onClick={onClick}
      className={clsx(styles.navLink, 'nav-link', className)}
    >
      {title}
    </a>
  ) : (
    <Link href={href} passHref legacyBehavior>
      <a className={clsx('nav-link', styles.navLink, className)}>{title}</a>
    </Link>
  )
}

function SearchBar() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const onKeyDownHandler = (e) => {
    const query = ref.current.value.trim()
    if (e.keyCode === 13 && ref.current && query.length > 0) {
      router.push({ pathname: '/search', query: { q: query } })
      setOpen(false)
    }
  }

  useEffect(() => {
    if (open) ref.current.focus()
  }, [open])

  return (
    <div id={styles.search} className={clsx({ 'w-100': open })}>
      <input
        ref={ref}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDownHandler}
        type='text'
        style={{ display: open ? 'block' : 'none' }}
      />
      <i
        className={`fas fa-${open ? 'times' : 'search'}`}
        style={{ cursor: 'pointer' }}
        onClick={() => setOpen(!open)}
      />
    </div>
  )
}
