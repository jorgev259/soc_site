import classNames from 'classnames'

import styles from './Login.module.scss'

import SubmitButton from '@/next/components/server/SubmitButton'
import getServerActionSession from '@/next/lib/getServerActionSession'
import { login, logout } from '@/next/lib/actions'
import LoginForm from './LoginForm/LoginForm'

export default async function Login (props) {
  const session = await getServerActionSession()
  const { username } = session
  const isFAU = username !== undefined

  return (
    <>
      {isFAU
        ? (
          <form action={logout}>
            <SubmitButton className={classNames(styles.button, 'me-4')} /* loading={loading} */>Logout</SubmitButton>
          </form>
        )
        : (
          <LoginForm login={login} />
        )
      }
    </>
  )
}

/* function LoginForm (props) {
  const { setShow } = props
  const { login: [queryLogin, { loading }] } = useUser()

  const submit = e => {
    e.persist()
    e.preventDefault()
    const variables = serialize(e.target, { hash: true })

    queryLogin(variables)
      .then(() => {
        setShow(false)
      })
      .catch(err => {
        toast.error(err.message)
      })
  }

  return (
    <Form onSubmit={submit} className={styles.form}>
      <Row>
        <Col>
          <FormGroup >
            <Label for='username'>Username:</Label>
            <Input required type='text' name='username' />
          </FormGroup>
        </Col>

        <Col>
          <FormGroup>
            <Label for='password'>Password:</Label>
            <Input required type='password' name='password' />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4} className='mx-auto'>
          <SubmitButton loading={loading} className='w-100'>Login</SubmitButton>
        </Col>
      </Row>
      {/*
      <Row className='mt-2'>
        <Col md={6} className='mx-auto'>
          <Button onClick={() => setForgor(true)} className='w-100' color='primary'>{t('Recover password')}</Button>
        </Col>
      </Row>
      *//* }
    </Form>
  )
}

function ForgorForm () {
  return null
}
*/
