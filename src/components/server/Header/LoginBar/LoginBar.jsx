import classNames from 'classnames'
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'
import { Link } from '@/next/lib/navigation'
import pick from 'lodash/pick'

import styles from './LoginBar.module.scss'

import { ForgorForm, LoginForm, LogoutForm, RegisterForm } from '@/next/components/client/LoginForm/LoginForm'
import { ModalTemplate } from '@/next/components/server/Modal'
import getSession from '@/next/lib/getSession'

export default async function LoginBar (props) {
  const session = await getSession()
  const { username } = session
  const isFAU = username !== undefined

  return isFAU ? <LoggedIn username={username} /> : <LoggedOut />
}

function LoggedIn (props) {
  const { username } = props
  const t = useTranslations('login')
  const messages = useMessages()

  return (
    <>
      <div className='col-auto ms-auto'>
        <Link href={`/profile/${username}`} className={classNames(styles.button, 'd-none d-sm-block btn btn-primary')}>{t('Profile')}</Link>
      </div>
      <div className='col-auto pe-sm-5 me-sm-4'>
        <NextIntlClientProvider messages={pick(messages, 'login')}>
          <LogoutForm />
        </NextIntlClientProvider>
      </div>
    </>
  )
}

function LoggedOut (props) {
  const t = useTranslations('login')

  return (
    <>
      <div className='col-auto ms-auto'>
        <button className={classNames(styles.button, 'd-none d-sm-block btn btn-primary')} data-bs-toggle="modal" data-bs-target="#registerModal">{t('Register')}</button>
      </div>
      <div className='col-auto pe-sm-5 me-sm-4'>
        <button className={classNames(styles.button, 'd-none d-sm-block btn btn-primary')} data-bs-toggle="modal" data-bs-target="#loginModal">{t('Login')}</button>
      </div>
      <EmailSentModal />
      <RegisterModal />
      <LoginModal />
      <ForgorModal />
    </>
  )
}

function EmailSentModal () {
  const t = useTranslations('login')
  return (
    <ModalTemplate id="emailSentModal">
      <div className='row'>
        <div className='col'>{t('Email_Sent')}</div>
      </div>
    </ModalTemplate>
  )
}

function RegisterModal () {
  const messages = useMessages()

  return (
    <ModalTemplate id="registerModal">
      <NextIntlClientProvider messages={pick(messages, 'login')}>
        <RegisterForm />
      </NextIntlClientProvider>
    </ModalTemplate>
  )
}

function LoginModal () {
  const messages = useMessages()

  return (
    <ModalTemplate id="loginModal">
      <NextIntlClientProvider messages={pick(messages, 'login')}>
        <LoginForm />
      </NextIntlClientProvider>
    </ModalTemplate>
  )
}

function ForgorModal () {
  const messages = useMessages()

  return (
    <ModalTemplate id='forgorModal'>
      <NextIntlClientProvider messages={pick(messages, 'login')}>
        <ForgorForm />
      </NextIntlClientProvider>
    </ModalTemplate>
  )
}
