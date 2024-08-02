import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import clsx from 'clsx'

import { SimpleSelector } from '@/components/Selectors'
import Loader from '@/components/Loader'
import { isAuthedPage } from '@/next/utils/resolversPages'

import styles from '@/styles/Request.module.scss'

const limit = 15
const stateOptions = ['Complete', 'Pending', 'Hold'].map((label) => ({
  label,
  value: label.toLowerCase()
}))
const userOptions = ['Donators', 'Members'].map((label) => ({
  label,
  value: label === 'Donators'
}))

export const getServerSideProps = isAuthedPage

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

  return (
    <div
      className={`modal ${request ? 'show' : ''}`}
      style={{ display: request ? 'block' : 'none' }}
      onClick={() => setRequest(null)}
    >
      <div
        className='modal-dialog modal-dialog-centered'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal-content'>
          <div className='modal-body'>
            <form>
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
                    readOnly
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
                    readOnly
                    className='form-control'
                  />
                </div>
                <div className='form-group col'>
                  <label htmlFor='state' style={{ color: 'black' }}>
                    Status:
                  </label>
                  <input
                    required
                    type='text'
                    name='state'
                    defaultValue={request?.state}
                    readOnly
                    className='form-control'
                    style={{ textTransform: 'capitalize' }}
                  />
                </div>
              </div>

              {request?.reason ? (
                <div className='row mt-3'>
                  <div className='form-group col'>
                    <label htmlFor='reason' style={{ color: 'black' }}>
                      Reason:
                    </label>
                    <textarea
                      required
                      name='reason'
                      readOnly
                      className='form-control'
                      defaultValue={request?.reason}
                    />
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function RequestBoard() {
  const [state, setState] = useState(['pending'])
  const [users, setUsers] = useState([false])
  const [filter, setFilter] = useState('')
  const [request, setRequest] = useState()

  const handleSearch = (e) => {
    e.preventDefault()
    setFilter(e.target.value)
  }

  return (
    <>
      <RequestModal request={request} setRequest={setRequest} />
      <form className='site-form blackblock my-5 py-4'>
        <div className='row mb-3'>
          <div className='col'>
            <div className='form-group'>
              <div className='input-group'>
                <span className='input-group-text'>&#128270;</span>
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
              name='status'
              defaultValue={state.map((value) =>
                stateOptions.find((o) => value === o.value)
              )}
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
              name='users'
              defaultValue={users.map((value) => ({
                label: value ? 'Donators' : 'Members',
                value
              }))}
              options={userOptions}
            />
          </div>
        </div>

        {state.map((s) => (
          <RequestTable
            key={s}
            state={s}
            users={users}
            filter={filter}
            setRequest={setRequest}
          />
        ))}
      </form>
    </>
  )
}

function RequestTable(props) {
  const { state, users, filter, setRequest } = props
  const isHold = state === 'hold'

  const query = gql`
    query (
      $state: String!
      $donator: [Boolean!]!
      $filter: String
      $page: Int!
      $limit: Int!
    ) {
      searchRequests(
        state: [$state]
        donator: $donator
        filter: $filter
        limit: $limit
        page: $page
      ) {
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
  const { data, loading, error } = useQuery(query, {
    variables: { state, donator: users, filter, page, limit }
  })
  const { rows, count } = data?.searchRequests || {}
  const isBig = count && count > limit

  if (error) {
    console.log(error)
    toast.error('Failed to fetch requests')
  }

  function Rows() {
    return rows?.map((request) => {
      const { id, title, link, user, userID, donator, reason } = request

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
        </tr>
      )
    })
  }

  function PageList() {
    const maxPage = Math.floor(count / limit)

    const items = []
    for (let i = 0; i <= maxPage; i++) {
      items.push(
        <li className='page-item' key={i}>
          <span
            onClick={() => setPage(i)}
            className={clsx(
              styles.pageLink,
              { disabled: i === page },
              'nav-link'
            )}
          >
            {i + 1}
          </span>
        </li>
      )
    }

    return (
      <ul
        className={clsx(
          styles.pagination,
          'pagination justify-content-center m-auto'
        )}
      >
        {page > 0 && (
          <>
            <li className='page-item my-auto'>
              <span
                onClick={() => setPage(0)}
                className='fas fa-angle-double-left align-middle nav-link'
              ></span>
            </li>
            <li className='page-item my-auto'>
              <span
                onClick={() => setPage(page - 1)}
                className='fas fa-angle-left align-middle nav-link'
              ></span>
            </li>
          </>
        )}
        {items}
        {page !== maxPage ? (
          <>
            <li className='page-item my-auto'>
              <span
                onClick={() => setPage(page + 1)}
                className='fas fa-angle-right align-middle nav-link'
              ></span>
            </li>
            <li className='page-item my-auto'>
              <span
                onClick={() => setPage(maxPage)}
                className='fas fa-angle-double-right align-middle nav-link'
              ></span>
            </li>
          </>
        ) : null}
      </ul>
    )
  }

  return loading || rows?.length > 0 ? (
    <>
      <div className='row mt-4'>
        <div className='col d-flex'>
          <h3 className='text-capitalize me-2'>{state}</h3>
          {isBig ? (
            <h3>
              (Showing {limit} results of {count})
            </h3>
          ) : null}
        </div>
      </div>
      <div className='row'>
        <div className='col' style={{ height: '500px' }}>
          <div className={clsx('overflow-auto h-100', styles.table)}>
            {loading && <Loader dev className='mx-auto' />}
            {rows?.length > 0 && (
              <>
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
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <Rows />
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
      <div className='row'>{isBig ? <PageList /> : null}</div>
    </>
  ) : null
}
