import { useTranslations } from 'next-intl'
import classNames from 'classnames'

import styles from '../Login.module.scss'

import SubmitButton from '@/next/components/server/SubmitButton'
import { login } from '@/next/lib/actions'
import Portal from '@/next/components/client/Portal'

function LoginModal (props) {
  const t = useTranslations('login')

  return (
    <Portal selector="#modal">
      <div id='loginModal' className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-body m-3">
              <form action={login}>
                <div className='row'>
                  <div className='col'>
                    <label className="form-label" htmlFor='username'>{t('Username')}:</label>
                    <input className="form-control"required type='text' name='username' />
                  </div>
                  <div className='col'>
                    <label className="form-label" htmlFor='password'>{t('Password')}:</label>
                    <input className="form-control" required type='password' name='password' />
                  </div>
                </div>
                <div className='row mt-4'>
                  <div className='col-md-4 mx-auto'>
                    <SubmitButton type='submit' className='w-100' color='primary'>{t('Login')}</SubmitButton>
                  </div>
                </div>
                <div className='row mt-2'>
                  <div className='col-md-6 mx-auto'>
                    <button className='w-100 btn btn-primary' data-bs-toggle="modal" data-bs-target="#forgorModal">{t('Recover password')}</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

function ForgorModal (props) {
  const t = useTranslations('login')

  return (
    <Portal selector="#modal">
      <div id='forgorModal' className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content ">
            <div className="modal-body m-3">
              <form action={login}>

              </form>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  )
}

export default function LoginForm (props) {
  const t = useTranslations('login')

  return (
    <>
      <button className={classNames(styles.button, 'btn btn-primary me-4')} data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
      <LoginModal />
      <ForgorModal />
    </>
  )
}
