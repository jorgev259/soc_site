import { gql } from '@apollo/client'
import { Row, Col } from 'react-bootstrap'
import Sidebar from '@/components/Sidebar'
import { Link } from '@/next/utils/navigation'
import { initializeApollo } from '@/next/utils/ApolloClient'

export async function getServerSideProps({ params }) {
  const { id } = params
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
      query platform($id: ID!) {
        platform(id: $id) {
          id
          name
          games {
            slug
            name
          }
        }
      }
    `,
    variables: { id }
  })

  if (data.platform === null)
    return { redirect: { destination: '/404', permanent: false } }

  return { props: { ...data.platform } /*, revalidate: 60 */ }
}

export default function AlbumList({ name, games }) {
  const gameList = {}
  games.forEach((album) => {
    const letter = album.name[0].toUpperCase()
    if (!gameList[letter]) gameList[letter] = [album]
    else gameList[letter].push(album)
  })

  const letters = Object.keys(gameList).sort()

  return (
    <Row className='blackbg h-100 px-0'>
      <Col className='p-3'>
        <div>
          {letters.map((letter) => (
            <div key={letter} className='mt-4'>
              <div className='divider' />
              <h1 className='text-center text-capitalize m-0' id={letter}>
                {letter}
              </h1>
              <div className='divider' />
              <Row className='my-4 d-flex flex-column'>
                {gameList[letter]
                  .sort((a, b) => a.title > b.title)
                  .map(({ slug, name }) => (
                    <Col key={slug}>
                      <Link
                        href={`/game/${slug}`}
                        className='text-center mt-2 link'
                      >
                        {name}
                      </Link>
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
        </div>
      </Col>
      <Sidebar />
    </Row>
  )
}
