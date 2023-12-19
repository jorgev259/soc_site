'use client'
import { useRef } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { Link } from '@/next/lib/navigation'
import serialize from 'form-serialize'
import classNames from 'classnames'

import { hideModal } from '@/next/lib/modal'
import SubmitButton from './SubmitButton'
import RequestCheck from './RequestCheck'

const vgmQuery = gql`
  query ($search: String!){
    vgmdb(search: $search){
      vgmdbUrl
      name
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
    submitAlbum (title: $title, vgmdb: $vgmdb, request: $request, links: $links) {
      id
    }
  }
`

export default function SubmitAlbumForm () {
  const vgmdbRef = useRef(null)
  const titleRef = useRef(null)

  const [getVgmdb, { loading: loadingFetch }] = useLazyQuery(vgmQuery)
  const [submitMutation, { loading: loadingSubmit }] = useMutation(submitQuery)

  async function fetchInfo () {
    const { data } = await getVgmdb({ variables: { search: vgmdbRef.current.value } })

    if (data?.vgmdb) {
      const { vgmdb } = data
      const { vgmdbUrl, name } = vgmdb

      vgmdbRef.current.value = vgmdbUrl
      titleRef.current.value = name
    }
  }

  function handleSubmit (ev) {
    ev.persist()
    ev.preventDefault()

    const variables = serialize(ev.target, { hash: true })
    submitMutation({ variables })
      .then(() => {
        // toast.success('Album submitted for review!')
        ev.target.reset()
        hideModal('#submitAlbumModal')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col' >
          <label className="form-label" htmlFor='title' >Title:</label>
          <input className="form-control" required type='text' name='title' ref={titleRef} />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col'>
          <label className="form-label" htmlFor='vgmdb'>VGMdb:</label>
          <input className="form-control" ref={vgmdbRef} name='vgmdb' type='text' />
        </div>

        <div className='col col-auto mt-auto' >
          <button className={classNames('btn btn-primary', { 'overflow-hidden position-relative loadingAnim': loadingFetch })} onClick={fetchInfo} disabled={loadingFetch}>{loadingFetch ? 'Fetching...' : 'Fetch info' }</button>
        </div>
      </div>

      <RequestCheck hideTag element={vgmdbRef.current} className='mt-3' />

      <div className='row mt-3'>
        <div className='col'>
          <label className="form-label" htmlFor='links'>
            <Link style={{ color: '#0d6efd', textDecoration: 'underline' }} href="https://www.squid-board.org/">Forum Links</Link><span> / Download Links:</span>
          </label>
          <input className="form-control" required as='textarea' name='links' />
        </div>
      </div>

      <div className='row mt-3'>
        <div className='col'>
          <SubmitButton loading={loadingSubmit} type='submit' color='primary'>Submit</SubmitButton>
        </div>
      </div>
    </form>
  )
}
