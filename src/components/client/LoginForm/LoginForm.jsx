'use client'
import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { gql, useApolloClient, useMutation } from '@apollo/client'
import serialize from 'form-serialize'

import styles from './LoginForm.module.scss'

import SubmitButton from '@/next/components/client/SubmitButton'
import { hideModal } from '@/next/lib/modal'

function useRefresh () {
  const router = useRouter()
  const client = useApolloClient()

  function refresh () {
    client.resetStore()
    router.refresh()
  }

  return refresh
}

const loginMutation = gql`
    mutation Login($username: String!, $password: String!){
      login(username: $username, password: $password)
    }
  `

export function LoginForm (props) {
  const t = useTranslations('login')
  const [loginMutate, { loading }] = useMutation(loginMutation)
  const refresh = useRefresh()

  const handleSubmit = useCallback(ev => {
    ev.persist()
    ev.preventDefault()
    const variables = serialize(ev.target, { hash: true })

    loginMutate({ variables })
      .then(() => {
        hideModal('#loginModal')
        refresh()
      })
      .catch(err => {
        console.log(err)
      })
  }, [loginMutate, refresh])

  return (
    <form onSubmit={handleSubmit}>
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
          <SubmitButton type='submit' className='w-100' color='primary' loading={loading}>{t('Login')}</SubmitButton>
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-md-6 mx-auto'>
          <button className='w-100 btn btn-primary' data-bs-toggle="modal" data-bs-target="#forgorModal">{t('Recover password')}</button>
        </div>
      </div>
    </form>
  )
}

export function ForgorForm (props) {
  return (
    <form>

    </form>
  )
}

const logoutMutation = gql`
    mutation Logout {
      logout
    }
  `

export function LogoutForm (props) {
  const t = useTranslations('login')
  const [logoutMutate, { loading }] = useMutation(logoutMutation)
  const refresh = useRefresh()

  const handleLogout = useCallback(ev => {
    ev.preventDefault()

    logoutMutate()
      .then(() => {
        refresh()
      })
      .catch(err => {
        console.log(err)
      })
  }, [logoutMutate, refresh])

  return (
    <SubmitButton className={classNames(styles.button, 'me-4')} loading={loading} onClick={handleLogout}>{t('Logout')}</SubmitButton>
  )
}
