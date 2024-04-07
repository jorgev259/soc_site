import { useTranslations } from 'next-intl'
import { gql } from '@apollo/client'
import { Suspense } from 'react'

import AlbumBox, { AlbumFallback } from '../common/AlbumBox/AlbumBox'
import { getClient } from '@/next/lib/ApolloSSRClient'

const albumClassName = 'col-6 col-md-3 px-0'
const getRelatedQuery = gql`
  query ($id: ID!) {
    album(id: $id) {
      id
      related {
        id
        title
        placeholder
      }
    }
  }
`

export default function Related(props) {
  const t = useTranslations('albumPage')

  return (
    <>
      <div className='row'>
        <div className='col'>
          <div className='blackBox my-2'>
            <h1 className='text-center text-uppercase album-title'>
              {t('Related Soundtracks')}
            </h1>
          </div>
        </div>
        <div className='row justify-content-center'>
          <Suspense
            fallback={<AlbumFallback count={8} className={albumClassName} />}
          >
            <RelatedFetch {...props} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

async function RelatedFetch(props) {
  const { id } = props
  const { data } = await getClient().query({
    query: getRelatedQuery,
    variables: { id }
  })
  const { related } = data.album

  return related.map((row) => (
    <AlbumBox key={row.id} className={albumClassName} {...row} />
  ))
}
