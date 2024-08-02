import { gql } from '@apollo/client'

import { AlbumBoxList } from '@/components/AlbumBoxes'

import Sidebar from '@/components/Sidebar'
import { initializeApollo } from '@/next/utils/ApolloClient'

const query = gql`
  query publisher($id: ID!) {
    publisher(id: $id) {
      name
      games {
        slug
        name
        placeholder
      }
    }
  }
`

export const getServerSideProps = async ({ params, req }) => {
  const { id } = params
  const client = initializeApollo()
  const { data } = await client.query({ query, variables: { id } })
  const { publisher } = data

  if (publisher === null)
    return { redirect: { destination: '/404', permanent: false } }

  return { props: { publisher } /*, revalidate: 60 */ }
}

export default function PublisherDetail(props) {
  const { publisher } = props

  return (
    <div className='row blackbg h-100 px-0'>
      <div className='col p-3'>
        <div className='row'>
          <div className='col' />
        </div>

        <div className='row mt-3'>
          <div className='col-12'>
            <div className='divider' />
            <h2 className='text-center py-2 m-0'>{publisher.name}</h2>
            <div className='divider' />
          </div>
        </div>

        <div className='row links-list justify-content-center py-2'>
          <AlbumBoxList
            type='game'
            colProps={{ md: 3, xs: 6 }}
            items={publisher.games.map(({ slug, name, placeholder }) => ({
              id: slug,
              title: name,
              placeholder
            }))}
          />
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
