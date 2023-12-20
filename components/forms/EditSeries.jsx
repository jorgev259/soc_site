import { useEffect, useRef } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Col, Row, Form, FormControl } from 'react-bootstrap'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'
import SubmitButton from '@/next/components/server/SubmitButton'
import { SeriesSelector } from '../Selectors'

const query = gql`
  query Series($slug: String!){
    seriesOne(slug: $slug){
      name
    }
  }
`

const mutationUpdate = gql`
    mutation UpdateSeries($slug:String!, $name:String, $cover: Upload){
      updateSeries(
        name: $name
        slug: $slug
        cover: $cover
      ) {
        slug
        name
      }
    }
`
const mutationDelete = gql`
    mutation DeleteSeries($slug:String!){
      deleteSeries(slug: $slug)
    }
`

export default function EditSeries () {
  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)
  const [getSeries, { data, error, loading: loadingInfo }] = useLazyQuery(query)

  useEffect(() => {
    if (!error) return
    console.log(error)
    toast.error(error.message, { autoclose: false })
  }, [error])

  function handleSubmitForm (mutate, verb) {
    const target = formRef.current
    const data = serialize(target, { hash: true })
    if (target.elements.cover.files) data.cover = target.elements.cover.files[0]
    mutate({ variables: data }).then(results => {
      toast.success(`${verb} series succesfully!`)
      target.reset()
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  return (
    <>
      <div id='editSeries' className='mb-2 mt-3'>Edit Series</div>
      <Form className='site-form blackblock' ref={formRef}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='slug'>Series:</Form.Label>
              <SeriesSelector
                options={{
                  isSingle: true,
                  required: true,
                  name: 'slug',
                  loading: loadingInfo,
                  onChange: row => getSeries({ variables: { slug: row.value } })
                }}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='name'>Name:</Form.Label>
              <FormControl type='text' name='name' defaultValue={data && data.seriesOne.name} />
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
          <Col xs='auto' className='my-auto mx-1'>
            <SubmitButton type='button' onClick={() => handleSubmitForm(mutateUpdate, 'Edited')} loading={loadingUpdate}>Save Changes</SubmitButton>
          </Col>
          <Col xs='auto' className='my-auto mx-1'>
            <SubmitButton type='button' onClick={() => handleSubmitForm(mutateDelete, 'Deleted')} loading={loadingDelete}>Delete Series</SubmitButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}
