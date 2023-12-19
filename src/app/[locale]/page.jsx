import { gql } from '@apollo/client'
import { Suspense } from 'react'
import { useTranslations } from 'next-intl'
import classNames from 'classnames'
import { Link } from '@/next/lib/navigation'

import styles from './home.module.scss'

import Sidebar from '@/next/components/server/Sidebar'
import AlbumBox from '@/next/components/server/AlbumBox/AlbumBox'
import { getClient } from '@/next/lib/ApolloSSRClient'

const albumClassName = 'col-6 col-md-3'
const limit = 12

function AlbumFallback () {
  return (
    <>
      <AlbumBox className={albumClassName} status='loading' />
      <AlbumBox className={albumClassName} status='loading' />
      <AlbumBox className={albumClassName} status='loading' />
      <AlbumBox className={albumClassName} status='loading' />
      <AlbumBox className={albumClassName} status='loading' />
      <AlbumBox className={albumClassName} status='loading' />
      <AlbumBox className={albumClassName} status='loading' />
      <AlbumBox className={albumClassName} status='loading' />
    </>
  )
}

const releaseQuery = gql`
  query Released($limit: Int){
    released: searchAlbum(
      limit: $limit,
      status: ["show","coming"],
      order: ["releaseDate", "createdAt"]
    ){
      rows{
        id
        status
        title
        placeholder
      }
    }
  }
`

async function RecentReleases () {
  const client = await getClient()
  const { data } = await client.query({ query: releaseQuery, variables: { limit } })
  const { released } = data
  const { rows } = released

  return (
    rows.map(row => (
      <AlbumBox key={row.id} className={albumClassName} {...row} />
    ))
  )
}

const addedQuery = gql`
  query LastAdde ($limit: Int){
    added: searchAlbum(limit: $limit, status: ["show"]){
      rows{
        id
        status
        title
        placeholder
      }
    }
  }
`

async function LastAdded () {
  const client = await getClient()
  const { data } = await client.query({ query: addedQuery, variables: { limit } })
  const { added } = data
  const { rows } = added

  return (
    rows.map(row => (
      <AlbumBox key={row.id} className={albumClassName} {...row} />
    ))
  )
}

export default function Home (props) {
  const t = useTranslations('home')

  return (
    <div className='row h-100'>
      <div className='col p-3 mx-3'>
        <div className='row'>
          <div className='col'>
            <h1 className={classNames(styles.title, 'p-3')}>{t('Recent Releases')}</h1>
          </div>
        </div>
        <div className='row'>
          <Suspense fallback={<AlbumFallback />}>
            <RecentReleases />
          </Suspense>
        </div>
        <div className='row'>
          <div className='col-md-6 mt-3 flex-grow-1'>
            <Link href='/game' className={classNames(styles.blackButton)}>
              <h4 className='px-3 py-2'>{t('More game releases')}</h4>
            </Link>
          </div>
          <div className='col-md-6 mt-3 flex-grow-1'>
            <Link href='/anim' className={classNames(styles.blackButton)}>
              <h4 className='px-3 py-2'>{t('More animation releases')}</h4>
            </Link>
          </div>
        </div>

        <hr />

        <div className='row'>
          <div className='col'>
            <h1 className={classNames(styles.title, 'p-3')} id='last-added'>{t('Last Added')}</h1>
          </div>
        </div>
        <div className='row'>
          <Suspense fallback={<AlbumFallback />}>
            <LastAdded />
          </Suspense>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <Link href='/last-added' className={classNames(styles.blackButton)}>
              <h2 className='py-1'>{t('More last added')}</h2>
            </Link>
          </div>
        </div>
      </div>
      <Sidebar home radio />
    </div>
  )
}

// export const revalidate = 600
