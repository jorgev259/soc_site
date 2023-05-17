'use client'

import { Button, Form, Modal, ModalBody, Row, Col, Label, Input, FormGroup } from 'reactstrap'
import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import styles from './LoginButton.module.scss'

import SubmitButton from '@/components/SubmitButton'

export default function LoginButton () {
  const [showForgor, setForgor] = useState(false)
  const [show, setShow] = useState(false)

  const toggleShow = useCallback(event => { setShow(!show) }, [show])

  return (
    <>
      <Button color='primary' className={classNames(styles.button, 'me-4')} onClick={toggleShow}>Login</Button>
      <Modal centered isOpen={show} toggle={toggleShow}>
        <ModalBody className='m-3'>
          {showForgor ? <ForgorForm /> : <LoginForm setShow={setShow} />}
        </ModalBody>
      </Modal>
    </>
  )
}

function LoginForm (props) {
  const { setShow } = props

  const loginQuery = gql`
    query Login($username: String!, $password: String!){
      login(username: $username, password: $password)
    }
  `

  const [queryLogin, { loading }] = useLazyQuery(loginQuery)

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
            if (code === 'BAD_USER_INPUT') message = 'Invalid_Login'
          }

          console.error(error)
          toast.error(message)
        } else {
          // refetch()
          setShow(false)
        }
      })
      .catch(error => console.error('An unexpected error happened:', error))
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
      */}
    </Form>
  )
}

function ForgorForm () {
  return null
}
