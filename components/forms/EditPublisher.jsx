import { useRef } from 'react'
import { Row, FormControl, Form, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import serialize from 'form-serialize'
import { gql, useMutation } from '@apollo/client'

import { PublisherSelector } from '../Selectors'
import SubmitButton from '@/next/components/common/SubmitButton'

const mutationUpdate = gql`
  mutation UpdatePublisher($id: ID!, $name: String!) {
    updatePublisher(id: $id, name: $name) {
      id
      name
    }
  }
`
const mutationDelete = gql`
  mutation DeletePublisher($id: ID!) {
    deletePublisher(id: $id)
  }
`

export default function EditPublisher() {
  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)

  function handleSubmitForm(mutate, verb) {
    const target = formRef.current
    mutate({ variables: serialize(target, { hash: true }) })
      .then((results) => {
        toast.success(`${verb} publisher succesfully!`)
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <div className='mt-3'>
      <div id='editPub' className='mb-2'>
        Edit Publisher
      </div>
      <div className='site-form blackblock'>
        <Form ref={formRef}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor='id'>Publisher:</Form.Label>
                <PublisherSelector
                  options={{ isSingle: true, required: true, name: 'id' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor='name'>Name:</Form.Label>
                <FormControl type='text' name='name' required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs='auto' className='my-auto mx-1'>
              <SubmitButton
                type='button'
                onClick={() => handleSubmitForm(mutateUpdate, 'Edited')}
                loading={loadingUpdate}
              >
                Save Changes
              </SubmitButton>
            </Col>
            <Col xs='auto' className='my-auto mx-1'>
              <SubmitButton
                type='button'
                onClick={() => handleSubmitForm(mutateDelete, 'Deleted')}
                loading={loadingDelete}
              >
                Delete Publisher
              </SubmitButton>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}
