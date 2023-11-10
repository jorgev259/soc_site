import { gql } from '@apollo/client'
import { Row, Col } from 'react-bootstrap'

import { initializeApollo } from '@/components/ApolloClient'
import { getImageUrl } from '@/components/utils'
import { AlbumBoxList } from '@/components/AlbumBoxes'
import Sidebar from '@/components/Sidebar'

const query = gql`
query ($slug: String!) {
  studio(slug: $slug){
    slug
    name
    animations {
      id
      title
      subTitle
      placeholder
    }
  }
}`

const fullImage = (id, quality = 75) => `/_next/image?w=3840&q=${quality}&url=${getImageUrl(id, 'studio')}`

export async function getServerSideProps ({ params, req }) {
  const { slug } = params
  const client = initializeApollo()
  const { data } = await client.query({ query, variables: { slug } })
  const { studio } = data

  if (studio === null) return { redirect: { destination: '/404', permanent: false } }
  return { props: { ...studio, imageUrl: fullImage(slug, 25) }/*, revalidate: 60 */ }
}

export default function Studio ({ name, animations }) {
  return (
    <Row className='blackbg h-100 px-0'>
      <Col className='p-3'>
        <Row>
          <Col xs={12}>
            <div className='divider' />
            <h2 className='animationLetter text-center py-2 m-0'>{name}</h2>
            <div className='divider' />
          </Col>
        </Row>

        <Row className='links-list justify-content-center py-2'>
          <AlbumBoxList type='anim' height={150} width={100} colProps={{ md: 2, xs: 6 }} items={animations}/>
        </Row>
      </Col>

      <Sidebar />
    </Row>
  )
}
