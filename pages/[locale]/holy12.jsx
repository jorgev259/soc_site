import { gql } from '@apollo/client'
import { Container, Col, Row } from 'react-bootstrap'

import { AlbumBoxList } from '@/components/AlbumBoxes'
import { initializeApollo } from '@/next/utils/ApolloClient'
import { getRandomInt } from '@/components/utils'
import { useTranslations } from 'next-intl'

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
      <Container>
        <Row>
          <Col className='py-3'>
            <div>
              <h3
                className='text-center homeTitle'
                style={{ fontSize: '42px' }}
              >
                {title}
              </h3>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center px-1 px-md-5'>
          <AlbumBoxList colProps={{ xs: 6, md: 3 }} items={rows} />
        </Row>
      </Container>
    </>
  )
}
