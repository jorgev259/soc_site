import { useRef } from 'react'
import { Row, FormControl, Form, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import serialize from 'form-serialize'
import { PlatformSelector } from '../Selectors'
import { gql, useMutation, useLazyQuery, useQuery } from '@apollo/client'
import SubmitButton from '@/next/components/common/SubmitButton'

const query = gql`
  query Platform($key: ID!) {
    platform(id: $key) {
      name
      type
    }
  }
`

const queryCategories = gql`
  query {
    categories {
      name
    }
  }
`

const mutationUpdate = gql`
  mutation UpdatePlatform($key: ID!, $name: String, $type: String!) {
    updatePlatform(key: $key, name: $name, type: $type) {
      id
      name
    }
  }
`
const mutationDelete = gql`
  mutation DeletePlatform($key: ID!) {
    deletePlatform(key: $key)
  }
`

export default function EditPlatform() {
  const { data: categoryData = {} } = useQuery(queryCategories)
  const { categories = [] } = categoryData

  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)
  const [getPlatform, { data, loading: loadingInfo }] = useLazyQuery(query)

  function handleSubmitForm(mutate, verb) {
    const target = formRef.current
    const variables = serialize(target, { hash: true })

    mutate({ variables })
      .then((results) => {
        toast.success(`${verb} platform succesfully!`)
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <div className='mt-3'>
      <div id='editPlat' className='mb-2'>
        Edit Platform
      </div>
      <div className='site-form blackblock'>
        <Form ref={formRef}>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor='key'>Platform:</Form.Label>
                <PlatformSelector
                  categories={categories.map((c) => c.name)}
                  options={{
                    isSingle: true,
                    required: true,
                    name: 'key',
                    onChange: (row) =>
                      getPlatform({ variables: { key: row.value } }),
                    loading: loadingInfo
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor='name'>Name:</Form.Label>
                <FormControl
                  type='text'
                  name='name'
                  required
                  defaultValue={data && data.platform.name}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor='type'>Type:</Form.Label>
                <select className='form-control' name='type'>
                  {categories.map((c) => (
                    <option
                      selected={data && data.platform.type === c.name}
                      key={c.name}
                      value={c.name}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
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
                Delete Platform
              </SubmitButton>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}
