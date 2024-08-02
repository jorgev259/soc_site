import { gql } from '@apollo/client'
import { Link } from '@/next/utils/navigation'

import { initializeApollo } from '@/next/utils/ApolloClient'
import { AlbumBoxList } from '@/components/AlbumBoxes'

export async function getServerSideProps() {
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
      query {
        result: searchAlbum(
          limit: 40
          order: ["releaseDate", "createdAt"]
          categories: ["Game"]
        ) {
          rows {
            id
            title
            placeholder
          }
        }
      }
    `
  })

  return { props: { ...data.result } /*, revalidate: 60 */ }
}

function Button({ name, href }) {
  return (
    <div className='col-md-3 mt-3 flex-grow-1'>
      <Link href={href}>
        <h4 className='text-center blackButton px-3 py-2'>{name}</h4>
      </Link>
    </div>
  )
}

export default function GameHome({ rows }) {
  return (
    <div className='container'>
      <div className='row'>
        <Button name='List' href='/game/list'></Button>
        <Button name='Platforms' href='/platform/list'></Button>
        <Button name='Publishers' href='/publisher/list'></Button>
        <Button name='Series' href='/series/list'></Button>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='row p-3'>
            <div className='col-md-12'>
              <h1 className='text-center homeTitle' id='last-releases'>
                LATEST GAME RELEASES
              </h1>
            </div>
          </div>

          <div className='row links-list justify-content-center'>
            <AlbumBoxList colProps={{ xs: 6, md: 3 }} items={rows} />
          </div>
        </div>
      </div>
    </div>
  )
}
