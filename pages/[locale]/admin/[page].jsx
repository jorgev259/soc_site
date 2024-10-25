import { useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import clsx from 'clsx'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useSearchParams } from 'next/navigation'

import { Link } from '@/next/utils/navigation'
import { AlbumSelector, SimpleSelector } from '@/components/Selectors'
import Loader from '@/components/Loader'
import {
  ModalTemplate,
  hideModal,
  showModal
} from '../../../src/components/common/Modal'

import { hasRolePage } from '@/next/utils/resolversPages'
import { getFullPageList, getPageList } from '@/server/utils/pagination'

export const getServerSideProps = hasRolePage(['CREATE', 'UPDATE'])

const limit = 10

export default function AlbumAdmin() {
  return (
    <div className='container-fluid d-flex'>
      <div className='col-2 pe-3'>
        <div className='sticky-top'>
          <div className='mb-2 mt-3 text-center'>Navigation</div>
          <div className='py-2 site-form blackblock d-flex flex-column'>
            <a href='#addAlbum'>Album List</a>
            <a href='#addSeries'>Edit highlight</a>
            <a href='#addGame'>Edit banner</a>
          </div>
        </div>
      </div>
      <div className='col-10'>
        <AlbumTable />
        <div className='row'>
          <Highlight />
          <Banner />
        </div>
        <div className='row'>
          <SelectBanner />
        </div>
      </div>
    </div>
  )
}

const DELETE_MODAL = 'deleteAlbumModal'

function AlbumTable() {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || '1'

  const mutation = gql`
    mutation deleteAlbum($id: ID!) {
      deleteAlbum(id: $id)
    }
  `
  const query = gql`
    query searchAlbum(
      $title: String
      $page: Int
      $limit: Int
      $name: String
      $status: [String!]!
    ) {
      searchAlbum(title: $title, page: $page, limit: $limit, status: $status) {
        rows {
          id
          title
          createdAt
          updatedAt
        }
        count
      }

      config(name: $name) {
        label: name
        value
      }
    }
  `

  const [status, setStatus] = useState(['show', 'hidden', 'coming'])
  const [deleteAlbum, { loading: loadingMutation }] = useMutation(mutation)
  const { data, loading, error, refetch } = useQuery(query, {
    variables: { title: '', page: page - 1, limit, name: 'highlight', status }
  })

  if (error) {
    console.log(error)
    toast.error('Failed to fetch server info')
  }

  function handleSearch(e) {
    e.persist()
    e.preventDefault()

    refetch({
      title: e.target.value,
      page: page - 1,
      limit,
      name: 'highlight',
      status
    })
  }

  function Rows() {
    const [modalData, setModalData] = useState({})

    const { searchAlbum } = data
    const { id, title } = modalData

    function handleDelete(ev) {
      ev.preventDefault()

      deleteAlbum({ variables: { id } })
        .then((results) => {
          toast.success(`Deleted album "${title}" (${id}) succesfully`)
          hideModal(`#${DELETE_MODAL}`)
          refetch()
        })
        .catch((err) => {
          console.log(err)
          toast.error(`Failed to delete album "${title}" (${id})`)
        })
        .finally(() => setModalData(false))
    }

    return (
      <>
        <ModalTemplate
          id={DELETE_MODAL}
          style={{ color: 'black' }}
          data-bs-backdrop={false}
        >
          <div className='row'>
            <div className='col'>{`Delete the album "${title}" (ID: ${id})?`}</div>
          </div>
          <div className='row mt-2'>
            <div className='col'>
              <button className='btn btn-primary mx-2' onClick={handleDelete}>
                {loadingMutation ? <Loader dev /> : 'Yes'}
              </button>
              <button
                className='btn btn-primary mx-2'
                onClick={() => {
                  setModalData(false)
                  hideModal(`#${DELETE_MODAL}`)
                }}
              >
                No
              </button>
            </div>
          </div>
        </ModalTemplate>

        {searchAlbum.rows &&
          searchAlbum.rows.map(({ id, title, createdAt, updatedAt }) => (
            <tr key={id}>
              <td style={{ cursor: 'pointer' }}>
                <Link href={`/admin/album/${id}`}>{title} </Link>
              </td>
              <td style={{ cursor: 'pointer' }}>
                <Link href={`/admin/album/${id}`}>
                  {moment(createdAt).format('DD/MM/YYYY HH:mm:ss')}{' '}
                </Link>
              </td>
              <td style={{ cursor: 'pointer' }}>
                <Link href={`/admin/album/${id}`}>
                  {moment(updatedAt).format('DD/MM/YYYY HH:mm:ss')}
                </Link>
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={(ev) => {
                    ev.preventDefault()
                    setModalData({ id, title })
                    showModal(`#${DELETE_MODAL}`)
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
      </>
    )
  }

  function NavRows() {
    const { searchAlbum } = data
    const fullPageList = getFullPageList(searchAlbum.count, limit)
    const { pageList, currentList, currentListIndex } = getPageList(
      fullPageList,
      15,
      page
    )

    return (
      <div className='col-auto pagination mx-auto page-bar'>
        {currentList && (
          <>
            {currentListIndex > 0 && (
              <>
                <Link
                  href={'/admin/1'}
                  className='fas fa-angle-double-left align-middle nav-link'
                ></Link>

                <Link
                  href={`/admin/${currentList[0] - 1}`}
                  className='fas fa-angle-left align-middle nav-link'
                ></Link>
              </>
            )}
            {currentList.map((e) => (
              <Link
                key={e}
                href={`/admin/${e}`}
                className={clsx({ disabled: e === parseInt(page) }, 'nav-link')}
              >
                {e}
              </Link>
            ))}
            {currentListIndex !== pageList.length - 1 && (
              <>
                <Link
                  href={`/admin/${currentList[currentList.length - 1] + 1}`}
                  className='fas fa-angle-right align-middle nav-link'
                ></Link>
                <Link
                  href={`/admin/${fullPageList[fullPageList.length - 1]}`}
                  className='fas fa-angle-double-right align-middle nav-link'
                ></Link>
              </>
            )}
          </>
        )}
      </div>
    )
  }

  const statusOptions = ['Show', 'Hidden', 'Coming'].map((label) => ({
    label,
    value: label.toLowerCase()
  }))

  return (
    <form className='site-form blackblock mt-5'>
      <div className='row my-3'>
        <div className='col-auto'>
          <div className='form-group'>
            <Link href='/admin/album/add' passHref legacyBehavior>
              <button className='btn btn-primary'>Add Album</button>
            </Link>
          </div>
        </div>
        <div className='col'>
          <div className='form-group'>
            <div className='input-group'>
              <div className='input-group-text'>&#128270;</div>
              <input
                className='form-control'
                type='text'
                onChange={handleSearch}
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
            onChange={(e) => setStatus(e.map((v) => v.value))}
            required
            name='status'
            defaultValue={statusOptions}
            options={statusOptions}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>{data && <Rows />}</tbody>
          </table>
          {loading && <Loader dev />}
        </div>
      </div>
      <div className='row'>{data && <NavRows />}</div>
    </form>
  )
}

function Highlight() {
  const queryConfig = gql`
    query {
      highlight {
        value: id
        label: title
      }
    }
  `
  const mutation = gql`
    mutation Config($name: String!, $value: String!) {
      config(name: $name, value: $value) {
        name
        value
      }
    }
  `

  const { loading, data, error, refetch } = useQuery(queryConfig)
  const [mutateConfig] = useMutation(mutation)

  if (error) {
    console.log(error)
    toast.error('Hightlight: Failed to fetch server info')
  }

  function handleHighlight(result) {
    const { value } = result

    mutateConfig({ variables: { name: 'highlight', value } })
      .then((results) => {
        toast.success('Updated highlighted album!')
        refetch()
      })
      .catch((err) => {
        console.log(err)
        toast.error('Failed to update highlighted album')
      })
  }

  return (
    <div className='col-md-6'>
      <div className='mt-3 site-form blackblock p-3'>
        <label>Highlight album:</label>
        <AlbumSelector
          options={{
            isSingle: true,
            defaultValue: data?.highlight,
            onChange: handleHighlight,
            loading
          }}
        />
      </div>
    </div>
  )
}

function Banner() {
  const mutation = gql`
    mutation UploadBanner($banner: Upload!) {
      uploadBanner(banner: $banner)
    }
  `
  const [upload, { loading }] = useMutation(mutation)

  function handleUpload(ev) {
    const [banner] = ev.target.files

    upload({ variables: { banner } })
      .then((results) => {
        toast.success('Updated banner!')
      })
      .catch((err) => {
        console.log(err)
        toast.error('Failed to update banner')
      })

    ev.persist()
    ev.preventDefault()
  }

  return (
    <div className='col-md-6 mt-3 site-form blackblock p-3'>
      <div className='form-group'>
        <label htmlFor='banner'>Upload Banner:</label>
        {loading ? (
          <Loader dev />
        ) : (
          <input className='form-control' type='file' onChange={handleUpload} />
        )}
      </div>
    </div>
  )
}

function SelectBanner() {
  const queryConfig = gql`
    query {
      banners
    }
  `
  const mutation = gql`
    mutation ($name: String!) {
      selectBanner(name: $name)
    }
  `

  const { loadingQuery, data, error, refetch } = useQuery(queryConfig)
  const [mutateConfig, { loading }] = useMutation(mutation)

  if (error) {
    console.log(error)
    toast.error('Hightlight: Failed to fetch server info')
  }

  function handleSelect(name) {
    mutateConfig({ variables: { name: name.replace('.png', '') } })
      .then((results) => {
        toast.success('Updated banner!')
        refetch()
      })
      .catch((err) => {
        console.log(err)
        toast.error('Failed to update banner')
      })
  }

  return (
    <div className='col-md-12'>
      <div className='p-0 my-3 site-form blackblock position-relative'>
        {(loading || loadingQuery) && (
          <div className='p-0 position-absolute h-100 w-100'>
            <div
              className='p-0 blackblock position-absolute h-100 w-100'
              style={{ backgroundColor: 'black', opacity: 0.65 }}
            />
            <Loader className='m-auto' />
          </div>
        )}
        <div className='p-3'>
          <label>Available banners:</label>
          {data?.banners.map((b) => (
            <div
              key={b}
              className='my-2'
              onClick={() => handleSelect(b)}
              style={{
                cursor: 'pointer',
                height: '110px',
                width: '100%',
                backgroundSize: 'cover',
                backgroundImage: `url('/_next/image?w=3840&q=25&url=${`https://cdn.sittingonclouds.net/live/${b}`}`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
