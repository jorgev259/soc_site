import { useRef, useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'
import clsx from 'clsx'

import { SimpleSelector } from '@/components/Selectors'
import Loader, { ButtonLoader } from '@/components/Loader'
import { hasRolePage } from '@/next/utils/resolversPages'

import styles from '@/styles/Request.module.scss'

export const getServerSideProps = hasRolePage(['REQUESTS'])
const stateOptions = ['Complete', 'Pending', 'Hold'].map((label) => ({
  label,
  value: label.toLowerCase()
}))
const userOptions = ['Donators', 'Members'].map((label) => ({
  label,
  value: label === 'Donators'
}))

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

export default function AlbumAdmin() {
  return (
    <div className='container'>
      <div className='col'>
        <RequestBoard />
      </div>
    </div>
  )
}

function RequestModal(props) {
  const { request, setRequest } = props

  const rejectMutation = gql`
    mutation ($id: ID!, $reason: String) {
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
  const [rejectRequest, { loading: loadingReject }] =
    useMutation(rejectMutation)
  const [editRequest, { loading: loadingEdit }] = useMutation(editMutation)
  const formRef = useRef(null)

  function handleEdit() {
    const target = formRef.current
    const variables = serialize(target, { hash: true })
    variables.id = request.id

    editRequest({ variables })
      .then((results) => {
        toast.success('Updated request successfully!')
        setRequest(results.data.editRequest)
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  function handleReject() {
    const target = formRef.current
    const variables = serialize(target, { hash: true })
    variables.id = request.id

    rejectRequest({ variables })
      .then((results) => {
        toast.success('Request rejected successfully!')
        setRequest()
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  const show = !!request

  return (
    <div
      className='modal'
      sclassName={clsx('modal', { show })}
      tabIndex='-1'
      style={{ display: show ? 'block' : 'none' }}
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-body'>
            <form ref={formRef}>
              <div className='row'>
                <div className='form-group col'>
                  <label htmlFor='title' style={{ color: 'black' }}>
                    Title:
                  </label>
                  <input
                    required
                    type='text'
                    name='title'
                    defaultValue={request?.title}
                    className='form-control'
                  />
                </div>
              </div>

              <div className='row mt-3'>
                <div className='form-group col'>
                  <label htmlFor='link' style={{ color: 'black' }}>
                    Link:
                  </label>
                  <input
                    required
                    type='text'
                    name='link'
                    defaultValue={request?.link}
                    className='form-control'
                  />
                </div>
                <div className='form-group col'>
                  <label htmlFor='state' style={{ color: 'black' }}>
                    Status:
                  </label>
                  <select
                    className='form-control'
                    name='state'
                    defaultValue={request?.state}
                  >
                    {stateOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='row mt-3'>
                <div className='form-group col'>
                  <label
                    htmlFor='comment'
                    style={{ color: 'black' }}
                    defaultValue={request?.comment}
                  >
                    Comments:
                  </label>
                  <textarea required name='comment' className='form-control' />
                </div>
              </div>

              <div className='row mt-3'>
                <div className='form-group col'>
                  <label
                    htmlFor='reason'
                    style={{ color: 'black' }}
                    defaultValue={request?.reason}
                  >
                    Reason:
                  </label>
                  <textarea required name='reason' className='form-control' />
                </div>
              </div>
            </form>
          </div>
          <div className='modal-footer'>
            <button
              className='btn btn-primary me-auto'
              onClick={() => setRequest()}
            >
              Close
            </button>
            <ButtonLoader
              loading={loadingReject}
              disabled={loadingEdit}
              className='btn btn-danger'
              onClick={handleReject}
            >
              Reject
            </ButtonLoader>
            <ButtonLoader
              loading={loadingEdit}
              disabled={loadingReject}
              className='btn btn-primary'
              onClick={handleEdit}
            >
              Save Changes
            </ButtonLoader>
          </div>
        </div>
      </div>
    </div>
  )
}

function RequestBoard() {
  const [state, setState] = useState(['pending'])
  const [users, setUsers] = useState(userOptions.map((s) => s.value))
  const [search, setSearch] = useState('')
  const [request, setRequest] = useState()

  const handleSearch = (e) => {
    e.persist()
    e.preventDefault()

    setSearch(e.target.value)
  }

  return (
    <>
      <RequestModal request={request} setRequest={setRequest} />
      <form className='site-form blackblock mt-5 py-4'>
        <div className='row mb-3'>
          <div className='col'>
            <div className='form-group'>
              <div className='input-group'>
                <div className='input-group-text'>&#128270;</div>
                <input
                  type='text'
                  onBlur={handleSearch}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch(e)
                  }}
                  className='form-control'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='row my-3'>
          <div className='col-md-auto'>
            <label htmlFor='status'>Status:</label>
          </div>
          <div className='col'>
            <SimpleSelector
              onChange={(e) => setState(e.map((v) => v.value))}
              required
              name='status'
              defaultValue={[{ label: 'Pending', value: 'pending' }]}
              options={stateOptions}
            />
          </div>
        </div>
        <div className='row my-3'>
          <div className='col-md-auto'>
            <label htmlFor='status'>Users:</label>
          </div>
          <div className='col'>
            <SimpleSelector
              onChange={(e) => setUsers(e.map((v) => v.value))}
              required
              name='users'
              defaultValue={userOptions}
              options={userOptions}
            />
          </div>
        </div>

        {state.map((s) => (
          <RequestTable
            key={s}
            state={s}
            users={users}
            search={search.toLowerCase()}
            setRequest={setRequest}
          />
        ))}
      </form>
    </>
  )
}

function RequestTable(props) {
  const { state, users, search, setRequest } = props
  const isHold = state === 'hold'

  const query = gql`
  query ($state: String!, $donator: [Boolean!]!) {
    requests(state: [$state], donator: $donator) {
      ${requestFields}
    }
  }
`

  const { data, loading, error } = useQuery(query, {
    variables: { state, donator: users }
  })

  if (error) {
    console.log(error)
    toast.error('Failed to fetch requests')
  }

  function Rows() {
    return data.requests
      .filter(
        ({ title, link }) =>
          title?.toLowerCase().includes(search) ||
          link?.toLowerCase() === search
      )
      .map((request) => {
        const { id, title, link, user, userID, donator, reason, comments } =
          request

        return (
          <tr
            key={id}
            style={{ cursor: 'pointer' }}
            onClick={() => setRequest(request)}
          >
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
  }

  return (
    <>
      <div className='row mt-4'>
        <div className='col'>
          <h3 className='text-capitalize'>{state}</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col' style={{ height: '500px' }}>
          <div className={clsx('overflow-auto h-100', styles.table)}>
            {loading && <Loader dev className='mx-auto' />}
            {data && (
              <table
                className='table table-dark table-hover table-responsive'
                style={{ overflowX: 'visible' }}
              >
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
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
