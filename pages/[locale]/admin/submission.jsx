import { useRef, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import clsx from 'clsx'

import { SimpleSelector } from '@/components_pages/Selectors'
import Loader from '@/components_pages/Loader'
import { hasRolePage } from '@/next/utils/resolversPages'

import styles from '@/styles/Request.module.scss'

export const getServerSideProps = hasRolePage(['REQUESTS'])
const stateOptions = ['Pending', 'Rejected', 'Accepted', 'Published'].map(
  (label) => ({ label, value: label.toLowerCase() })
)

const requestFields = `
  id
  title
  vgmdb
  links
  request {
    id
  }
  submitter {
    username
  }
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
  const { submission, setRequest } = props
  const formRef = useRef(null)

  /* const rejectMutation = gql`
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
  } */

  return (
    <div className='modal centered show' onHide={() => setRequest()}>
      <div className='modal-body'>
        <form ref={formRef} style={{ color: 'black' }}>
          <div className='row'>
            <div className='form-group col'>
              <label htmlFor='title'>Title:</label>
              <input
                required
                type='text'
                name='title'
                defaultValue={submission?.title}
                className='form-control'
              />
            </div>
          </div>

          <div className='row mt-3'>
            <div className='form-group col'>
              <label htmlFor='link'>VGMDB:</label>
              <input
                required
                type='text'
                name='link'
                defaultValue={submission?.vgmdb}
                className='form-control'
              />
            </div>
          </div>

          <div className='row mt-3'>
            <div className='form-group col'>
              <label htmlFor='state'>State:</label>
              <select
                className='form-control'
                name='state'
                defaultValue={submission?.state}
              >
                {stateOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group col'>
              <label htmlFor='submitter'>Submitter:</label>
              <input
                required
                type='text'
                name='submitter'
                defaultValue={submission?.submitter.username}
                readOnly
                className='form-control'
              />
            </div>
          </div>

          <div className='row mt-3'>
            <div className='form-group col'>
              <label htmlFor='links'>Links:</label>
              <textarea
                required
                name='links'
                value={submission?.links}
                readOnly
                className='form-control'
              />
            </div>
          </div>

          <div className='row mt-3'>
            <div className='form-group col'>
              <label htmlFor='observations'>Observations:</label>
              <textarea
                required
                name='observations'
                defaultValue={submission?.observations}
                className='form-control'
              />
            </div>
          </div>

          <div className='row mt-4'>
            <div className='form-group col'>
              <input
                type='checkbox'
                name='lossy'
                defaultChecked={submission?.lossy}
                className='form-check-input'
              />
              <label className='form-check-label' htmlFor='lossy'>
                Lossy / MP3 Only
              </label>
            </div>
            <div className='form-group col'>
              <input
                type='checkbox'
                name='hold'
                defaultChecked={submission?.hold}
                className='form-check-input'
              />
              <label className='form-check-label' htmlFor='hold'>
                &quot;Hold&quot; request bonus
              </label>
            </div>
          </div>
        </form>
      </div>
      {/* <div className='modal-footer'>
        <ButtonLoader loading={loadingReject} disabled={loadingEdit} variant="danger" onClick={handleReject}>Reject</ButtonLoader>
        <ButtonLoader loading={loadingEdit} disabled={loadingReject} variant="primary" onClick={handleEdit}>Save Changes</ButtonLoader>
      </div> */}
    </div>
  )
}

function RequestBoard() {
  const [state, setState] = useState(['pending'])
  const [search, setSearch] = useState('')
  const [submission, setRequest] = useState()

  const handleSearch = (e) => {
    e.persist()
    e.preventDefault()

    setSearch(e.target.value)
  }

  return (
    <>
      <RequestModal submission={submission} setRequest={setRequest} />
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

        {state.map((s) => (
          <RequestTable
            key={s}
            state={s}
            search={search.toLowerCase()}
            setRequest={setRequest}
          />
        ))}
      </form>
    </>
  )
}

function RequestTable(props) {
  const { state, search, setRequest } = props

  const query = gql`
  query ($state: String!) {
    submissions(state: [$state]) {
      ${requestFields}
    }
  }
`

  const { data, loading, error } = useQuery(query, { variables: { state } })

  if (error) {
    console.log(error)
    toast.error('Failed to fetch submissions')
  }

  function Rows() {
    return data.submissions
      .filter(
        (row) =>
          row?.title?.toLowerCase().includes(search) ||
          row?.link?.toLowerCase() === search
      )
      .map((submission) => {
        const { id, title, vgmdb, submitter, request } = submission

        return (
          <tr
            key={id}
            style={{ cursor: 'pointer' }}
            onClick={() => setRequest(submission)}
          >
            <td>{id}</td>
            <td>{title}</td>
            <td>{vgmdb}</td>
            {request ? <td>✓</td> : <td />}
            <td>{submitter.username}</td>
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
                    <th>Requested</th>
                    <th>Submitter</th>
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
