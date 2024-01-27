import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Col, Row, Form, FormControl } from 'react-bootstrap'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import SubmitButton from '@/next/components/server/SubmitButton'
import { slugify } from '@/next/lib/utils'

const mutation = gql`
    mutation CreateSeries($slug:String!, $name:String!, $cover: Upload!){
      createSeries(
        name: $name
        slug: $slug
        cover: $cover
      ) {
        slug
        name
      }
    }
    
`

export default function AddSeries () {
  const [slug, setSlug] = useState('')
  const [mutate, { loading }] = useMutation(mutation)

  function handleSubmitForm (e) {
    e.preventDefault()
    e.persist()

    const data = serialize(e.target, { hash: true })
    data.cover = e.target.elements.cover.files[0]

    mutate({ mutation, variables: data }).then(results => {
      toast.success(`Added "${data.name}" series succesfully!`)
      e.target.reset()
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  return (
    <>
      <div id='addSeries' className='mb-2 mt-3'>Add Series</div>
      <Form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='slug'>Slug:</Form.Label>
              <FormControl type='text' name='slug' readOnly value={slug} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='name'>Name:</Form.Label>
              <FormControl type='text' name='name' onChange={e => setSlug(slugify(e.target.value))} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='cover'>Cover:</Form.Label>
              <FormControl name='cover' type='file' accept='image/*' />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='m-auto'>
            <SubmitButton loading={loading} type='submit'>Add Series</SubmitButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}
