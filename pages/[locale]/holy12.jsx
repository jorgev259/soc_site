import { gql } from '@apollo/client'
import { useTranslations } from 'next-intl'

import { AlbumBoxList } from '@/components/AlbumBoxes'
import { initializeApollo } from '@/next/utils/ApolloClient'
import { getRandomInt } from '@/next/utils/form'

const limit = 12
// const euphoriaIndex = titles.findIndex(t => t === 'Best romantic dinner BGM')

export async function getServerSideProps(context) {
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
      query ($limit: Int!) {
        getRandomAlbum(limit: $limit) {
          id
          title
          placeholder
        }
      }
    `,
    variables: { limit }
  })

  const titleIndex = getRandomInt(0, 5)
  return { props: { rows: data.getRandomAlbum, titleIndex } }
}

export default function Holy12(props) {
  const { rows, titleIndex } = props
  const t = useTranslations('common')
  const title = t(`holy12_${titleIndex}`)

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col py-3'>
            <div>
              <h3
                className='text-center homeTitle'
                style={{ fontSize: '42px' }}
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
        <div className='row justify-content-center px-1 px-md-5'>
          <AlbumBoxList colProps={{ xs: 6, md: 3 }} items={rows} />
        </div>
      </div>
    </>
  )
}
