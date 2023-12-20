import { useEffect, useRef } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import serialize from 'form-serialize'
import { Col, Row, Form, FormControl } from 'react-bootstrap'
import { StudioSelector, AnimSelector } from '../Selectors'
import SubmitButton from '@/next/components/server/SubmitButton'
import { toast } from 'react-toastify'

const query = gql`
  query Anim($id: ID!){
    animation(id: $id){
      title
      subTitle
      releaseDate
      studios {
        value: slug
        label: name
      }
    }
  }
`

const mutationUpdate = gql`
mutation UpdateAnimation($id: ID!, $cover:Upload, $subTitle:String, $releaseDate:String, $title:String, $studios: [String]){
  updateAnimation(
    id: $id
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
const mutationDelete = gql`
mutation DeleteAnimation($id: ID!){
  deleteAnimation(id: $id) 
}
`

export default function AddAnimation () {
  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)
  const [getAnim, { data, error, loading: loadingInfo }] = useLazyQuery(query)

  useEffect(() => {
    if (!error) return
    console.log(error)
    toast.error(error.message, { autoclose: false })
  }, [error])

  function handleSubmitForm (mutate, verb) {
    const target = formRef.current
    const animation = serialize(target, { hash: true })
    animation.cover = target.elements.cover.files[0]
    animation.releaseDate = new Date(animation.releaseDate).toISOString().substring(0, 10)

    mutate({ variables: animation })
      .then(results => {
        toast.success(`${verb} "${animation.title}" animation succesfully!`)
        target.reset()
      }).catch(err => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='editAnim' className='mb-2 mt-3'>Edit Animation</div>
      <Form className='site-form blackblock' ref={formRef}>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='name'>Animation:</Form.Label>
              <AnimSelector
                options={{
                  isSingle: true,
                  name: 'id',
                  loading: loadingInfo,
                  onChange: row => getAnim({ variables: { id: row.value } })
                }}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='name'>Title:</Form.Label>
              <FormControl type='text' name='title' defaultValue={data && data.animation.title} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='name'>Sub-title:</Form.Label>
              <FormControl type='text' name='subTitle' defaultValue={data && data.animation.subTitle} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label htmlFor='releaseDate'>Release Date:</Form.Label>
              <FormControl type='date' name='releaseDate' defaultValue={data && data.animation.releaseDate} />
            </Form.Group>
          </Col>
          {data && (
            <Col>
              <Form.Group>
                <Form.Label htmlFor='studios'>Studios:</Form.Label>
                <StudioSelector options={{ name: 'studios', defaultValue: data.animation.studios }} />
              </Form.Group>
            </Col>
          )}
          <Col>
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
            <SubmitButton type='button' onClick={() => handleSubmitForm(mutateDelete, 'Deleted')} loading={loadingDelete}>Delete Animation</SubmitButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}
