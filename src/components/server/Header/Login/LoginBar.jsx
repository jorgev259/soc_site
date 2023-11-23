import classNames from 'classnames'
import { useTranslations } from 'next-intl'

import styles from './LoginBar.module.scss'

import { ForgorForm, LoginForm, LogoutForm } from '@/next/components/client/LoginForm/LoginForm'
import Portal from '@/next/components/client/Portal'
import Modal from '@/next/components/server/Modal'
import getSession from '@/next/lib/getSession'

export default async function LoginBar (props) {
  const session = await getSession()
  const { username } = session
  const isFAU = username !== undefined

  return (
    <>
      {isFAU ? <LogoutForm /> : <LoggedOut /> }
    </>
  )
}

function LoggedOut (props) {
  const t = useTranslations('login')

  return (
    <>
      <button className={classNames(styles.button, 'btn btn-primary me-4')} data-bs-toggle="modal" data-bs-target="#loginModal">{t('Login')}</button>
      <LoginModal />
      <ForgorModal />
    </>
  )
}

function LoginModal (props) {
  return (
    <Portal selector="#modal">
      <Modal id="loginModal">
        <div className="modal-content">
          <div className="modal-body m-3">
            <LoginForm />
          </div>
        </div>
      </Modal>
    </Portal>
  )
}

function ForgorModal (props) {
  return (
    <Portal selector="#modal">
      <div id='forgorModal' className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-body m-3">
              <ForgorForm />
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}
