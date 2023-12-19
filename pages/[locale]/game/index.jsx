import { gql } from '@apollo/client'
import { Container, Col, Row } from 'react-bootstrap'
import { Link } from '@/next/lib/navigation'

import { initializeApollo } from '@/components/ApolloClient'
import { AlbumBoxList } from '@/components/AlbumBoxes'

export async function getServerSideProps () {
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
        query {
          result: searchAlbum(
            limit: 40,
            order: ["releaseDate", "createdAt"],
            categories: ["Game"]
          ){
            rows{
                id
                title
                placeholder
            }
          },
        }
      `

  })

  return { props: { ...data.result }/*, revalidate: 60 */ }
}

function Button ({ name, href }) {
  return (
    <Col md={3} className='mt-3  flex-grow-1'>
      <Link href={href}>
        <h4 className='text-center blackButton px-3 py-2'>
          {name}
        </h4>
      </Link>
    </Col>
  )
}

export default function GameHome ({ rows }) {
  return (
    <Container>
      <Row>
        <Button name='List' href='/game/list'></Button>
        <Button name='Platforms' href='/platform/list'></Button>
        <Button name='Publishers' href='/publisher/list'></Button>
        <Button name='Series' href='/series/list'></Button>
      </Row>
      <Row>
        <Col md={12}>
          <Row className='p-3'>
            <Col md={12}>
              <h1 className='text-center homeTitle' id='last-releases'>LATEST GAME RELEASES</h1>
            </Col>
          </Row>

          <Row className='links-list justify-content-center'>
            <AlbumBoxList colProps={{ xs: 6, md: 3 }} items={rows} />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
