'use client'
import { useRef } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import serialize from 'form-serialize'
import clsx from 'clsx'
import { toast } from 'react-toastify'

import { hideModal } from '@/next/components/common/Modal'
import SubmitButton from '@/next/components/common/SubmitButton'
import { Link } from '@/next/utils/navigation'
import RequestCheck from '../common/RequestCheck'

const vgmQuery = gql`
  query VGMDB($url: String!) {
    vgmdb(url: $url) {
      title
      subTitle
      releaseDate
      artists
      categories
      classifications
      tracklist {
        number
        body
      }
    }
  }
`

const submitQuery = gql`
  mutation ($title: String!, $vgmdb: String, $request: ID, $links: String!) {
    submitAlbum(
      title: $title
      vgmdb: $vgmdb
      request: $request
      links: $links
    ) {
      id
    }
  }
`

export default function SubmitAlbumForm() {
  const vgmdbRef = useRef(null)
  const titleRef = useRef(null)

  const [getVgmdb, { loading: loadingFetch }] = useLazyQuery(vgmQuery)
  const [submitMutation, { loading: loadingSubmit }] = useMutation(submitQuery)

  async function fetchInfo() {
    const { data } = await getVgmdb({
      variables: { url: vgmdbRef.current.value }
    })
    titleRef.current.value = data?.vgmdb?.title
  }

  function handleSubmit(ev) {
    ev.persist()
    ev.preventDefault()

    const variables = serialize(ev.target, { hash: true })
    submitMutation({ variables }).then(() => {
      // Missing translation
      toast.success('Album submitted for review!')
      ev.target.reset()
      hideModal('#submitAlbumModal')
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col'>
          <label className='form-label' htmlFor='title'>
            Title:
          </label>
          <input
            className='form-control'
            required
            type='text'
            name='title'
            ref={titleRef}
          />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col'>
          <label className='form-label' htmlFor='vgmdb'>
            VGMdb:
          </label>
          <input
            className='form-control'
            ref={vgmdbRef}
            name='vgmdb'
            type='text'
          />
        </div>

        <div className='col col-auto mt-auto'>
          <button
            className={clsx('btn btn-primary', {
              'overflow-hidden position-relative loadingAnim': loadingFetch
            })}
            onClick={fetchInfo}
            disabled={loadingFetch}
          >
            {loadingFetch ? 'Fetching...' : 'Fetch info'}
          </button>
        </div>
      </div>

      <RequestCheck hideTag element={vgmdbRef.current} className='mt-3' />

      <div className='row mt-3'>
        <div className='col'>
          <label className='form-label' htmlFor='links'>
            <Link
              style={{ color: '#0d6efd', textDecoration: 'underline' }}
              href='https://www.squid-board.org/'
            >
              Forum Links
            </Link>
            <span> / Download Links:</span>
          </label>
          <input className='form-control' required as='textarea' name='links' />
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col'>
          <SubmitButton loading={loadingSubmit} type='submit' color='primary'>
            Submit
          </SubmitButton>
        </div>
      </div>
    </form>
  )
}
