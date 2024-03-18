import { gql, useMutation } from '@apollo/client'
import serialize from 'form-serialize'
import { Col, Row, Form, FormControl } from 'react-bootstrap'
import { toast } from 'react-toastify'

import SubmitButton from '@/next/components/common/SubmitButton'
import { StudioSelector } from '../Selectors'

const mutation = gql`
  mutation CreateAnimation(
    $cover: Upload
    $subTitle: String
    $releaseDate: String!
    $title: String!
    $studios: [String]!
  ) {
    createAnimation(
      title: $title
      subTitle: $subTitle
      studios: $studios
      releaseDate: $releaseDate
      cover: $cover
    ) {
      id
    }
  }
`

export default function AddAnimation() {
  const [mutate, { loading }] = useMutation(mutation)

  function handleSubmitForm(e) {
    e.preventDefault()
    e.persist()
    const animation = serialize(e.target, { hash: true })
    animation.cover = e.target.elements.cover.files[0]
    animation.releaseDate = new Date(animation.releaseDate)
      .toISOString()
      .substring(0, 10)

    mutate({ mutation, variables: animation })
      .then((results) => {
        toast.success(`Added "${animation.title}" animation succesfully!`)
        e.target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='addAnim' className='mb-2 mt-3'>
        Add Animation
      </div>
      <Form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='name'>Title:</Form.Label>
              <FormControl type='text' name='title' />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='name'>Sub-title:</Form.Label>
              <FormControl type='text' name='subTitle' />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='releaseDate'>Release Date:</Form.Label>
              <FormControl type='date' name='releaseDate' />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='studios'>Studios:</Form.Label>
              <StudioSelector options={{ name: 'studios' }} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='cover'>Cover:</Form.Label>
              <FormControl name='cover' type='file' accept='image/*' required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='m-auto'>
            <SubmitButton loading={loading} type='submit' color='primary'>
              Add Animation
            </SubmitButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}
