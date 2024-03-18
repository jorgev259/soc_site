import { useRef, useState } from 'react'
import { Row, FormControl, Form, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { StudioSelector } from '../Selectors'
import SubmitButton from '@/next/components/common/SubmitButton'
import serialize from 'form-serialize'
import { gql, useMutation } from '@apollo/client'

const mutationUpdate = gql`
  mutation UpdateStudio($slug: String!, $name: String!) {
    updateStudio(slug: $slug, name: $name) {
      slug
    }
  }
`
const mutationDelete = gql`
  mutation DeleteStudio($slug: String!) {
    deleteStudio(slug: $slug)
  }
`

export default function EditStudio() {
  const formRef = useRef(null)
  const [defaultName, setName] = useState()
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)

  function handleSubmitForm(mutate, verb) {
    const target = formRef.current
    mutate({ variables: serialize(target, { hash: true }) })
      .then((results) => {
        toast.success(`${verb} studio succesfully!`)
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <div className='mt-3'>
      <div id='editStudio' className='mb-2'>
        Edit Studio
      </div>
      <div className='site-form blackblock'>
        <Form ref={formRef}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor='slug'>Studio:</Form.Label>
                <StudioSelector
                  options={{
                    isSingle: true,
                    required: true,
                    name: 'slug',
                    onChange: (row) => setName(row.label)
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor='name'>Name:</Form.Label>
                <FormControl
                  type='text'
                  name='name'
                  required
                  defaultValue={defaultName}
                />
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
                Delete Studio
              </SubmitButton>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}
