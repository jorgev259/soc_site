import { useRef, useState } from 'react'
import { Col, Row, Form, Container, Table, InputGroup, FormControl, Modal } from 'react-bootstrap'
import { gql, useMutation, useQuery } from '@apollo/client'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'
import classNames from 'classnames'

import { SimpleSelector } from '@/components/Selectors'
import Loader, { ButtonLoader } from '@/components/Loader'
import { hasRolePage } from '@/components/resolvers'

import styles from '../../styles/Request.module.scss'

export const getServerSideProps = hasRolePage(['REQUESTS'])
const stateOptions = ['Complete', 'Pending', 'Hold'].map(label => ({ label, value: label.toLowerCase() }))
const userOptions = ['Donators', 'Members'].map(label => ({ label, value: label === 'Donators' }))

const requestFields = `
  id
  title
  link
  user
  userID
  state
  donator
  reason
  comments
`

export default function AlbumAdmin () {
  return (
    <Container>
      <Col>
        <RequestBoard />
      </Col>
    </Container>
  )
}

function RequestModal (props) {
  const { request, setRequest } = props

  const rejectMutation = gql`
    mutation ($id: ID!, $reason: String){
      rejectRequest(id: $id, reason: $reason)
    }
  `
  const editMutation = gql`
    mutation ($id: ID!, $title: String, $link: String, $state: String, $comments: String, $reason: String){
      editRequest(id: $id, title: $title, link: $link, state: $state, comments: $comments, reason: $reason){
        ${requestFields}
      }
    }
  `
  const [rejectRequest, { loading: loadingReject }] = useMutation(rejectMutation)
  const [editRequest, { loading: loadingEdit }] = useMutation(editMutation)
  const formRef = useRef(null)

  function handleEdit () {
    const target = formRef.current
    const variables = serialize(target, { hash: true })
    variables.id = request.id

    editRequest({ variables }).then(results => {
      toast.success('Updated request succesfully!')
      setRequest(results.data.editRequest)
      target.reset()
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  function handleReject () {
    const target = formRef.current
    const variables = serialize(target, { hash: true })
    variables.id = request.id

    rejectRequest({ variables }).then(results => {
      toast.success('Request rejected succesfully!')
      setRequest()
      target.reset()
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  return (
    <Modal show={request} onHide={() => setRequest()} centered>
      <Modal.Body>
        <Form ref={formRef}>
          <Row>
            <Form.Group as={Col} >
              <Form.Label htmlFor='title' style={{ color: 'black' }}>Title:</Form.Label>
              <Form.Control required type='text' name='title' defaultValue={request?.title} />
            </Form.Group>
          </Row>

          <Row className='mt-3'>
            <Form.Group as={Col} >
              <Form.Label htmlFor='link' style={{ color: 'black' }}>Link:</Form.Label>
              <Form.Control required type='text' name='link' defaultValue={request?.link} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor='state' style={{ color: 'black' }}>Status:</Form.Label>
              <select className='form-control' name='state' defaultValue={request?.state}>
                {stateOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Form.Group>
          </Row>

          <Row className='mt-3'>
            <Form.Group as={Col}>
              <Form.Label htmlFor='comment' style={{ color: 'black' }} defaultValue={request?.comment}>Comments:</Form.Label>
              <FormControl required as='textarea' name='comment' />
            </Form.Group>
          </Row>

          <Row className='mt-3'>
            <Form.Group as={Col}>
              <Form.Label htmlFor='reason' style={{ color: 'black' }} defaultValue={request?.reason}>Reason:</Form.Label>
              <FormControl required as='textarea' name='reason' />
            </Form.Group>
          </Row>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <ButtonLoader loading={loadingReject} disabled={loadingEdit} variant="danger" onClick={handleReject}>Reject</ButtonLoader>
        <ButtonLoader loading={loadingEdit} disabled={loadingReject} variant="primary" onClick={handleEdit}>Save Changes</ButtonLoader>
      </Modal.Footer>
    </Modal>

  )
}

function RequestBoard () {
  const [state, setState] = useState(['pending'])
  const [users, setUsers] = useState(userOptions.map(s => s.value))
  const [search, setSearch] = useState('')
  const [request, setRequest] = useState()

  const handleSearch = e => {
    e.persist()
    e.preventDefault()

    setSearch(e.target.value)
  }

  return (
    <>
      <RequestModal request={request} setRequest={setRequest} />
      <Form className='site-form blackblock mt-5 py-4'>
        <Row className='mb-3'>
          <Col>
            <Form.Group>
              <InputGroup>
                <InputGroup.Text>&#128270;</InputGroup.Text>
                <FormControl type='text'
                  onBlur={handleSearch}
                  onKeyDown={e => { if (e.key === 'Enter') handleSearch(e) }}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row className='my-3'>
          <Col md='auto'><Form.Label htmlFor='status'>Status:</Form.Label></Col>
          <Col>
            <SimpleSelector
              onChange={e => setState(e.map(v => v.value))}
              required name='status'
              defaultValue={[{ label: 'Pending', value: 'pending' }]} options={stateOptions}
            />
          </Col>
        </Row>
        <Row className='my-3'>
          <Col md='auto'><Form.Label htmlFor='status'>Users:</Form.Label></Col>
          <Col>
            <SimpleSelector
              onChange={e => setUsers(e.map(v => v.value))}
              required name='users'
              defaultValue={userOptions} options={userOptions}
            />
          </Col>
        </Row>

        {state.map(s => <RequestTable key={s} state={s} users={users} search={search.toLowerCase()} setRequest={setRequest} />)}
      </Form>
    </>
  )
}

function RequestTable (props) {
  const { state, users, search, setRequest } = props
  const isHold = state === 'hold'

  const query = gql`
  query ($state: String!, $donator: [Boolean!]!) {
    requests(state: [$state], donator: $donator) {
      ${requestFields}
    }
  }
`

  const { data, loading, error } = useQuery(query, { variables: { state, donator: users } })

  if (error) {
    console.log(error)
    toast.error('Failed to fetch requests')
  }

  function Rows () {
    return (
      data.requests
        .filter(({ title, link }) => title?.toLowerCase().includes(search) || link?.toLowerCase() === search)
        .map(request => {
          const { id, title, link, user, userID, donator, reason, comments } = request

          return (
            <tr key={id} style={{ cursor: 'pointer' }} onClick={() => setRequest(request)}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{link}</td>
              <td>{user || (userID ? `<@${userID}>` : 'Not Found')}</td>
              <td style={{ textAlign: 'center' }}>{donator ? '⭐' : ''}</td>
              {isHold && <td>{reason}</td>}
              <td>{comments}</td>
            </tr>
          )
        })
    )
  }

  return (
    <>
      <Row className='mt-4'>
        <Col>
          <h3 className='text-capitalize'>{state}</h3>
        </Col>
      </Row>
      <Row>
        <Col style={{ height: '500px' }}>
          <div className={classNames('overflow-auto h-100', styles.table)} >
            {loading && <Loader dev className='mx-auto' />}
            {data && (
              <Table variant='dark' hover responsive style={{ overflowX: 'visible' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Link</th>
                    <th>User</th>
                    <th>Donator</th>
                    {isHold && <th>Reason</th>}
                    <th>Comments</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <Rows />
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}
