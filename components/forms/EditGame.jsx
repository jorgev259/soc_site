import { useEffect, useRef } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import serialize from 'form-serialize'
import { Col, Row, Form, FormControl } from 'react-bootstrap'
import { SeriesSelector, PublisherSelector, PlatformSelector, GameSelector } from '../Selectors'
import SubmitButton from '@/next/components/server/SubmitButton'
import { toast } from 'react-toastify'

const query = gql`
  query Game($slug: String!){
    game(slug:$slug){
      name
      releaseDate
      publishers {
        value: id
        label: name
      }
      platforms {
        value: id
        label: name
      }
      series {
        value: slug
        label: name
      }
    }
  }
`

const mutationUpdate = gql`
    mutation UpdateGame($cover:Upload, $releaseDate:String, $slug:String, $name:String, $series: [String], $publishers:[ID], $platforms:[ID]){
      updateGame(
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
const mutationDelete = gql`
    mutation DeleteGame($slug: String!){
      deleteGame(slug: $slug)
    }
`

export default function EditGame () {
  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)
  const [getGame, { data, loading, error }] = useLazyQuery(query)

  useEffect(() => {
    if (!error) return
    console.log(error)
    toast.error(error.message, { autoclose: false })
  }, [error])

  function handleSubmitForm (mutate, verb) {
    const target = formRef.current
    const game = serialize(target, { hash: true })

    game.cover = target.elements.cover.files[0]
    game.releaseDate = new Date(game.releaseDate).toISOString().substring(0, 10)

    mutate({ variables: game }).then(results => {
      toast.success(`${verb} "${game.name}" game succesfully!`)
      target.reset()
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  return (
    <>
      <div id='editGame' className='mb-2 mt-3'>Edit Game</div>
      <Form className='site-form blackblock' ref={formRef}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label htmlFor='slug'>Game:</Form.Label>
              <GameSelector
                options={{
                  isSingle: true,
                  required: true,
                  name: 'slug',
                  loading,
                  onChange: row => getGame({ variables: { slug: row.value } })
                }}
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label htmlFor='name'>Name:</Form.Label>
              <FormControl type='text' name='name' defaultValue={data && data.game.name} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor='releaseDate'>Release Date:</Form.Label>
              <FormControl type='date' name='releaseDate' defaultValue={data && data.game.releaseDate} />
            </Form.Group>
          </Col>
        </Row>
        {data && (
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor='series'>Series:</Form.Label>
                <SeriesSelector options={{ loading, name: 'series', defaultValue: data?.game.series }} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor='publishers'>Publishers:</Form.Label>
                <PublisherSelector options={{ loading, name: 'publishers', defaultValue: data?.game.publishers }} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label htmlFor='platforms'>Platforms:</Form.Label>
                <PlatformSelector categories={['Game']} options={{ name: 'platforms', defaultValue: data?.game.platforms }} />
              </Form.Group>
            </Col>
          </Row>
        )}
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='cover'>Cover:</Form.Label>
              <FormControl name='cover' type='file' accept='image/*' />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs='auto' className='my-auto mx-1'>
            <SubmitButton type='button' onClick={() => handleSubmitForm(mutateUpdate, 'Edited')} loading={loadingUpdate}>Save Changes</SubmitButton>
          </Col>
          <Col xs='auto' className='my-auto mx-1'>
            <SubmitButton type='button' onClick={() => handleSubmitForm(mutateDelete, 'Deleted')} loading={loadingDelete}>Delete Game</SubmitButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}
