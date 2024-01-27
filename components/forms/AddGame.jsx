import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import serialize from 'form-serialize'
import { Col, Row, Form, FormControl } from 'react-bootstrap'
import { SeriesSelector, PublisherSelector, PlatformSelector } from '../Selectors'
import { toast } from 'react-toastify'

import { slugify } from '@/next/lib/utils'
import SubmitButton from '@/next/components/server/SubmitButton'

const mutation = gql`
mutation CreateGame($cover:Upload!, $releaseDate:String!, $slug:String!, $name:String!, $series: [String]!, $publishers:[ID]!, $platforms:[ID]){
  createGame(
    name: $name
    slug: $slug
    series: $series
    publishers: $publishers   
    releaseDate: $releaseDate
    cover: $cover,
    platforms: $platforms
  ) {
      slug
    }
  }
`

export default function AddGame () {
  const [slug, setSlug] = useState('')
  const [mutate, { loading }] = useMutation(mutation)

  function handleSubmitForm (e) {
    e.preventDefault()
    e.persist()
    const game = serialize(e.target, { hash: true })
    game.cover = e.target.elements.cover.files[0]
    game.releaseDate = new Date(game.releaseDate).toISOString().substring(0, 10)

    if (!game.series) game.series = []
    if (!game.publishers) game.publishers = []
    if (!game.platforms) game.platforms = []

    mutate({ mutation, variables: game })
      .then(results => {
        toast.success(`Added "${game.name}" game succesfully!`)
        e.target.reset()
      }).catch(err => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='addGame' className='mb-2 mt-3'>Add Game</div>
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
              <Form.Label htmlFor='releaseDate'>Release Date:</Form.Label>
              <FormControl type='date' name='releaseDate' />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='series'>Series:</Form.Label>
              <SeriesSelector options={{ name: 'series' }} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='publishers'>Publishers:</Form.Label>
              <PublisherSelector options={{ name: 'publishers' }} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='platforms'>Platforms:</Form.Label>
              <PlatformSelector categories={['Game']} options={{ name: 'platforms' }} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='cover'>Cover:</Form.Label>
              <FormControl name='cover' type='file' accept='image/*' />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='m-auto'>
            <SubmitButton loading={loading} type='submit' color='primary'>Add Game</SubmitButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}
