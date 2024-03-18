import clsx from 'clsx'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import { Link } from '@/next/lib/navigation'
import { getTranslations } from 'next-intl/server'

import styles from './LoginBar.module.scss'

import {
  ForgorForm,
  LoginForm,
  LogoutForm,
  RegisterForm
} from '@/next/components/LoginForm'
import { ModalTemplate } from '@/next/components/common/Modal'
import getSessionInfo from '@/next/lib/getSession'
import { getMessageObject } from '@/next/lib/transl'

export default async function LoginBar(props) {
  const t = await getTranslations('login')
  const { session, isFAU } = await getSessionInfo()
  const { username } = session

  return (
    <>
      <NextIntlClientProvider
        messages={getMessageObject(t, [
          'Username',
          'Email',
          'Password',
          'Profile pic',
          'Register',
          'Login',
          'Logout',
          'Recover password',
          'Username or email'
        ])}
      >
        {isFAU ? <LoggedIn username={username} /> : <LoggedOut />}
      </NextIntlClientProvider>
    </>
  )
}

function LoggedIn(props) {
  const { username } = props
  const t = useTranslations('login')

  return (
    <>
      <div className='col-auto ms-auto'>
        <Link
          href={`/profile/${username}`}
          className={clsx(styles.button, 'd-none d-sm-block btn btn-primary')}
        >
          {t('Profile')}
        </Link>
      </div>
      <div className='col-auto pe-sm-5 me-sm-4'>{/* <LogoutForm /> */}</div>
    </>
  )
}

function LoggedOut(props) {
  const t = useTranslations('login')

  return (
    <>
      <div className='col-auto ms-auto'>
        <button
          className={clsx(styles.button, 'd-none d-sm-block btn btn-primary')}
          data-bs-toggle='modal'
          data-bs-target='#registerModal'
        >
          {t('Register')}
        </button>
      </div>
      <div className='col-auto pe-sm-5 me-sm-4'>
        <button
          className={clsx(styles.button, 'd-none d-sm-block btn btn-primary')}
          data-bs-toggle='modal'
          data-bs-target='#loginModal'
        >
          {t('Login')}
        </button>
      </div>
      <EmailSentModal />
      <RegisterModal />
      <LoginModal />
      <ForgorModal />
    </>
  )
}

function EmailSentModal() {
  const t = useTranslations('login')
  return (
    <ModalTemplate id='emailSentModal'>
      <div className='row'>
        <div className='col'>{t('Email_Sent')}</div>
      </div>
    </ModalTemplate>
  )
}

function RegisterModal() {
  return (
    <ModalTemplate id='registerModal'>
      <RegisterForm />
    </ModalTemplate>
  )
}

function LoginModal() {
  return (
    <ModalTemplate id='loginModal'>
      <LoginForm />
    </ModalTemplate>
  )
}

function ForgorModal() {
  return (
    <ModalTemplate id='forgorModal'>
      <ForgorForm />
    </ModalTemplate>
  )
}
