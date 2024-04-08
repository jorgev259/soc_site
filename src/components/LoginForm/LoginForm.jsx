'use client'
import { useCallback } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import { gql, useMutation } from '@apollo/client'
import serialize from 'form-serialize'

import styles from './LoginForm.module.scss'

import SubmitButton from '@/next/components/common/SubmitButton'
import { hideModal, showModal } from '@/next/components/common/Modal'
import useRefresh from '@/next/utils/useRefresh'
import useLogout from '@/next/utils/useLogout'

const registerMutation = gql`
  mutation Register($username: String!, $email: String!, $pfp: Upload) {
    registerUser(username: $username, email: $email, pfp: $pfp)
  }
`

const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`

const forgorMutation = gql`
  mutation createForgorLink($key: String!) {
    createForgorLink(key: $key)
  }
`

export function RegisterForm(props) {
  const t = useTranslations('')
  const [mutate, { loading }] = useMutation(registerMutation)

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault()
      const variables = serialize(ev.target, { hash: true })
      variables.pfp = ev.target.elements.pfp.files[0]

      mutate({ variables })
        .then(() => {
          hideModal('#registerModal')
          showModal('#emailSentModal')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [mutate]
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col'>
          <label className='form-label' htmlFor='username'>
            {t('Username')}:
          </label>
          <input
            className='form-control'
            required
            type='text'
            name='username'
          />
        </div>
        <div className='col'>
          <label className='form-label' htmlFor='email'>
            {t('Email')}:
          </label>
          <input className='form-control' required type='text' name='email' />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col'>
          <label className='form-label' htmlFor='pfp'>
            {t('Profile pic')}:
          </label>
          <input className='form-control' type='file' name='pfp' />
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-4 mx-auto'>
          <SubmitButton
            type='submit'
            className='w-100'
            color='primary'
            loading={loading}
          >
            {t('Register')}
          </SubmitButton>
        </div>
      </div>
    </form>
  )
}

function showForgor() {
  hideModal('#loginModal')
  showModal('#forgorModal')
}

export function LoginForm(props) {
  const t = useTranslations('')
  const [mutate, { loading }] = useMutation(loginMutation)
  const refresh = useRefresh()

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault()
      const variables = serialize(ev.target, { hash: true })

      mutate({ variables })
        .then(() => {
          hideModal('#loginModal')
          refresh()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [mutate, refresh]
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col'>
          <label className='form-label' htmlFor='username'>
            {t('Username')}:
          </label>
          <input
            className='form-control'
            required
            type='text'
            name='username'
          />
        </div>
        <div className='col'>
          <label className='form-label' htmlFor='password'>
            {t('Password')}:
          </label>
          <input
            className='form-control'
            required
            type='password'
            name='password'
          />
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-4 mx-auto'>
          <SubmitButton
            type='submit'
            className='w-100'
            color='primary'
            loading={loading}
          >
            {t('Login')}
          </SubmitButton>
        </div>
      </div>
      <div className='row mt-2'>
        <div className='col-md-6 mx-auto'>
          <button className='w-100 btn btn-primary' onClick={showForgor}>
            {t('Recover password')}
          </button>
        </div>
      </div>
    </form>
  )
}

export function ForgorForm(props) {
  const t = useTranslations('')
  const [mutate, { loading }] = useMutation(forgorMutation)

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault()
      const variables = serialize(ev.target, { hash: true })

      mutate({ variables })
        .then(() => {
          hideModal('#forgorModal')
          showModal('#emailSentModal')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    [mutate]
  )

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col'>
          <label className='form-label' htmlFor='username'>
            {t('Username or email')}:
          </label>
          <input className='form-control' required type='text' name='key' />
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-6 mx-auto'>
          <SubmitButton
            type='submit'
            className='w-100'
            color='primary'
            loading={loading}
          >
            {t('Recover password')}
          </SubmitButton>
        </div>
      </div>
    </form>
  )
}

export function LogoutForm(props) {
  const t = useTranslations('')
  const { handleLogout, loading } = useLogout()

  return (
    <SubmitButton
      className={clsx(styles.button, 'd-none d-sm-block me-4')}
      loading={loading}
      onClick={handleLogout}
    >
      {t('Logout')}
    </SubmitButton>
  )
}
