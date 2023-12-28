'use client'
import { useTranslations } from 'next-intl'
import { useSuspenseQuery, gql } from '@apollo/client'
import { Suspense } from 'react'

import AlbumBox, { AlbumFallback } from '../../server/AlbumBox/AlbumBox'

const albumClassName = 'col-6 col-md-3 px-0'
const getRelatedQuery = gql`
  query ($id: ID!) {
    album(id: $id){
      id
      related {
        id
        title
        placeholder
      }
    }
  }
`

export default function Related (props) {
  const { id } = props

  const t = useTranslations('albumPage')
  const { data } = useSuspenseQuery(getRelatedQuery, { variables: { id } })
  const { related } = data.album

  return (
    <>
      <div className='row'>
        <div className='col'>
          <div className='blackBox my-2'><h1 className='text-center text-uppercase album-title'>{t('Related Soundtracks')}</h1></div>
        </div>
        <div className='row justify-content-center'>
          <Suspense fallback={<AlbumFallback count={8} className={albumClassName} />}>
            {related.map(row => (
              <AlbumBox key={row.id} className={albumClassName} {...row} />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  )
}
