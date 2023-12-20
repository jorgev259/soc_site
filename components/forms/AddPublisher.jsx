import { Row, FormControl, Form, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import SubmitButton from '@/next/components/server/SubmitButton'

import { gql, useMutation } from '@apollo/client'
const mutation = gql`
mutation createPublisher($name:String!){
  createPublisher(
    name: $name
  ) {
    id
    name
  }
}

`

export default function AddPublisher () {
  const [mutate, { loading }] = useMutation(mutation)

  function handleSubmitForm (e) {
    mutate({ mutation, variables: { name: e.target.elements.name.value } }).then(results => {
      toast.success(`Added "${e.target.elements.name.value}" publisher succesfully!`)
      e.target.reset()
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })

    e.preventDefault()
    e.persist()
  }

  return (
    <div className='mt-3'>
      <div id='addPub' className='mb-2'>Add Publisher</div>
      <div className='site-form blackblock'>
        <Form onSubmit={handleSubmitForm}>
          <Row>
            <Col md={8}>
              <FormControl type='text' name='name' />
            </Col>
            <Col md={4}>
              <SubmitButton loading={loading} type='submit' color='primary' className='mb-2'>Add Publisher</SubmitButton>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}
