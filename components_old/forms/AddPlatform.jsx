import { Row, Button, FormControl, Form, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import serialize from 'form-serialize'
import { gql, useMutation } from '@apollo/client'

const mutation = gql`
    mutation CreatePlatform($name:String!, $type: String!){
      createPlatform(
        name: $name
        type: $type
      ) {
        id
        name
      }
    }
    
`

export default function AddPlatform () {
  const [mutate] = useMutation(mutation)
  function handleSubmitForm (e) {
    const variables = serialize(e.target, { hash: true })

    mutate({ mutation, variables }).then(results => {
      toast.success(`Added "${e.target.elements.name.value}" platform succesfully!`)
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
      <div id='addPlat' className='mb-2'>Add Platform</div>
      <div className='site-form blackblock'>
        <Form onSubmit={handleSubmitForm}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor='name'>Name:</Form.Label>
                <FormControl type='text' name='name' required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label htmlFor='type'>Type:</Form.Label>
                <select className='form-control' name='type'>
                  <option value='Game'>Game</option>
                  <option value='Animation'>Animation</option>
                </select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className='m-auto'>
              <Button type='submit' color='primary'>Add Platform</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}
