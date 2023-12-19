import { useState } from 'react'
import { Col, Row, Form, Container, Table, InputGroup, FormControl, Modal } from 'react-bootstrap'
import { gql, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import classNames from 'classnames'

import { SimpleSelector } from '@/components/Selectors'
import Loader from '@/components/Loader'

import styles from '@/styles/Request.module.scss'
import { isAuthedPage } from '@/components/resolvers'

const limit = 15
const stateOptions = ['Complete', 'Pending', 'Hold'].map(label => ({ label, value: label.toLowerCase() }))
const userOptions = ['Donators', 'Members'].map(label => ({ label, value: label === 'Donators' }))

export const getServerSideProps = isAuthedPage

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

  return (
    <Modal show={request} onHide={() => setRequest()} centered>
      <Modal.Body>
        <Form>
          <Row>
            <Form.Group as={Col} >
              <Form.Label htmlFor='title' style={{ color: 'black' }}>Title:</Form.Label>
              <Form.Control required type='text' name='title' defaultValue={request?.title} readOnly />
            </Form.Group>
          </Row>

          <Row className='mt-3'>
            <Form.Group as={Col} >
              <Form.Label htmlFor='link' style={{ color: 'black' }}>Link:</Form.Label>
              <Form.Control required type='text' name='link' defaultValue={request?.link} readOnly />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label htmlFor='state' style={{ color: 'black' }}>Status:</Form.Label>
              <Form.Control required type='text' name='state' defaultValue={request?.state} readOnly style={{ textTransform: 'capitalize' }} />
            </Form.Group>
          </Row>

          {request?.reason
            ? (
              <Row className='mt-3'>
                <Form.Group as={Col}>
                  <Form.Label htmlFor='reason' style={{ color: 'black' }} defaultValue={request?.reason}>Reason:</Form.Label>
                  <FormControl required as='textarea' name='reason' readOnly />
                </Form.Group>
              </Row>
            )
            : null}
        </Form>
      </Modal.Body>
    </Modal>

  )
}

function RequestBoard () {
  const [state, setState] = useState(['pending'])
  const [users, setUsers] = useState([false])
  const [filter, setFilter] = useState('')
  const [request, setRequest] = useState()

  const handleSearch = e => {
    e.persist()
    e.preventDefault()

    setFilter(e.target.value)
  }

  return (
    <>
      <RequestModal request={request} setRequest={setRequest} />
      <Form className='site-form blackblock my-5 py-4'>
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
              onChange={e => setState(e.map(v => v.value)) }
              name='status'
              defaultValue={state.map(value => stateOptions.find(o => value === o.value))}
              options={stateOptions}
            />
          </Col>
        </Row>
        <Row className='my-3'>
          <Col md='auto'><Form.Label htmlFor='status'>Users:</Form.Label></Col>
          <Col>
            <SimpleSelector
              onChange={e => setUsers(e.map(v => v.value))}
              name='users'
              defaultValue={users.map(value => ({ label: value ? 'Donators' : 'Members', value }))}
              options={userOptions}
            />
          </Col>
        </Row>

        {state.map(s => <RequestTable key={s} state={s} users={users} filter={filter} setRequest={setRequest} />)}
      </Form>
    </>
  )
}

function RequestTable (props) {
  const { state, users, filter, setRequest } = props
  const isHold = state === 'hold'

  const query = gql`
  query ($state: String!, $donator: [Boolean!]!, $filter: String, $page: Int!, $limit: Int!) {
    searchRequests(state: [$state], donator: $donator, filter: $filter, limit: $limit, page: $page) {
      rows {
        id
        title
        link
        user
        userID
        state
        donator
        reason
      }
      count
    }
  }
`
  const [page, setPage] = useState(0)
  const { data, loading, error } = useQuery(query, { variables: { state, donator: users, filter, page, limit } })
  const { rows, count } = data?.searchRequests || {}
  const isBig = count && count > limit

  if (error) {
    console.log(error)
    toast.error('Failed to fetch requests')
  }

  function Rows () {
    return (
      rows?.map(request => {
        const { id, title, link, user, userID, donator, reason } = request

        return (
          <tr key={id} style={{ cursor: 'pointer' }} onClick={() => setRequest(request)}>
            <td>{id}</td>
            <td>{title}</td>
            <td>{link}</td>
            <td>{user || (userID ? `<@${userID}>` : 'Not Found')}</td>
            <td style={{ textAlign: 'center' }}>{donator ? '⭐' : ''}</td>
            {isHold && <td>{reason}</td>}
          </tr>
        )
      })
    )
  }

  function PageList () {
    const maxPage = Math.floor(count / limit)

    const items = []
    for (let i = 0; i <= maxPage; i++) {
      items.push(
        <li className='page-item' key={i}>
          <span
            onClick={() => setPage(i)}
            className={classNames(styles.pageLink, { disabled: i === page }, 'nav-link')}
          >
            {i + 1}
          </span>
        </li>
      )
    }

    return (
      <ul className={classNames(styles.pagination, 'pagination justify-content-center m-auto')}>
        {page > 0 && (
          <>
            <li className='page-item my-auto'>
              <span
                onClick={() => setPage(0)}
                className='fas fa-angle-double-left align-middle nav-link'
              >
              </span>
            </li>
            <li className='page-item my-auto'>
              <span
                onClick={() => setPage(page - 1)}
                className='fas fa-angle-left align-middle nav-link'
              >
              </span>
            </li>
          </>
        )}
        {items}
        {page !== maxPage
          ? (
            <>
              <li className='page-item my-auto'>
                <span
                  onClick={() => setPage(page + 1)}
                  className='fas fa-angle-right align-middle nav-link'
                >
                </span>
              </li>
              <li className='page-item my-auto'>
                <span
                  onClick={() => setPage(maxPage)}
                  className='fas fa-angle-double-right align-middle nav-link'
                >
                </span>
              </li>
            </>
          )
          : null }
      </ul>
    )
  }

  return loading || rows?.length > 0
    ? (
      <>
        <Row className='mt-4'>
          <Col className='d-flex'>
            <h3 className='text-capitalize me-2'>{state}</h3>
            {isBig ? <h3>(Showing {limit} results of {count})</h3> : null}
          </Col>
        </Row>
        <Row>
          <Col style={{ height: '500px' }}>
            <div className={classNames('overflow-auto h-100', styles.table)} >
              {loading && <Loader dev className='mx-auto' />}
              {rows?.length > 0 && (
                <>
                  <Table variant='dark' hover responsive style={{ overflowX: 'visible' }}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Link</th>
                        <th>User</th>
                        <th>Donator</th>
                        {isHold && <th>Reason</th>}
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <Rows />
                    </tbody>
                  </Table>
                </>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          {isBig ? <PageList /> : null}
        </Row>
      </>
    )
    : null
}
