import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Col, Row, Form, FormControl } from 'react-bootstrap'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import { slugify } from '@/next/lib/utils'

const mutation = gql`
mutation CreateStudio($slug:String!, $name:String!){
  createStudio(
    name: $name
    slug: $slug
  ) {
    slug
    name
  }
}

`

export default function AddStudio () {
  const [slug, setSlug] = useState('')
  const [mutate] = useMutation(mutation)

  function handleSubmitForm (e) {
    e.preventDefault()
    e.persist()

    const data = serialize(e.target, { hash: true })

    mutate({ mutation, variables: data }).then(results => {
      toast.success(`Added "${data.name}" studio succesfully!`)
      e.target.reset()
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  return (
    <>
      <div id='addStudio' className='mb-2 mt-3'>Add Studio</div>
      <Form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='slug'>Slug:</Form.Label>
              <FormControl type='text' name='slug' readOnly value={slug} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='name'>Name:</Form.Label>
              <FormControl type='text' name='name' onChange={e => setSlug(slugify(e.target.value))} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='m-auto'>
            <Button type='submit' color='primary'>Add Studio</Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}
