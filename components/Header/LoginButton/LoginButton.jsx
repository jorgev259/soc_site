'use client'
import { Button, Form, Modal, ModalBody, Row, Col, Label, Input, FormGroup } from 'reactstrap'
import classNames from 'classnames'
import { useCallback, useContext, useEffect, useState } from 'react'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import styles from './LoginButton.module.scss'

import SubmitButton from '@/components/SubmitButton'
// import { useRouter } from 'next/router'
import { UserContext } from '@/components/useUser'

const btnProps = { color: 'primary', className: classNames(styles.button, 'me-4') }

export default function LoginButton () {
  const [showForgor, setForgor] = useState(false)
  const [show, setShow] = useState(false)
  const { isAU, logout: [logoutQuery, { loading }] } = useContext(UserContext)

  const toggleShow = useCallback(event => { setShow(!show) }, [show])

  useEffect(() => {
    if (!show) setForgor(false)
  }, [show])

  return (
    <>
      {isAU
        ? <SubmitButton {...btnProps} loading={loading} onClick={logoutQuery}>Logout</SubmitButton>
        : <Button {...btnProps} onClick={toggleShow}>Login</Button>
      }
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
  const { login: [queryLogin, { loading }] } = useContext(UserContext)

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
      */}
    </Form>
  )
}

function ForgorForm () {
  return null
}
