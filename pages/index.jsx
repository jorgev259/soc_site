import { Col, Row } from 'react-bootstrap'
import { gql } from '@apollo/client'
import Link from 'next/link'

import Sidebar from '@/components/Sidebar'
import { AlbumBoxList } from '@/components/AlbumBoxes'
import { initializeApollo } from '@/components/ApolloClient'
import { getTranslation } from '@/components/useTranslation'
import { useTranslations } from 'next-intl'

const colProps = { xs: 6, md: 3 }
const limit = 12

const query = gql`
query searchAlbum($limit: Int){
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
  },

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

export async function getServerSideProps (context) {
  const { locale } = context
  const client = initializeApollo()
  const { data } = await client.query({ query, variables: { limit } })

  const localeStrings = await getTranslation(context.locale)

  return { props: { ...data, localeStrings, locale } }
}

const BlackButton = ({ href, name }) => (
  <Link href={href}>
    <h4 className='text-center blackButton px-3 py-2'>{name}</h4>
  </Link>
)

export default function Home ({ added, released }) {
  const t = useTranslations('common')

  return (
    <Row className='h-100'>
      <Col className='p-3 mx-3'>
        <Row>
          <Col>
            <h1 className='text-center text-uppercase homeTitle p-3' id='last-releases'>{t('Last Releases')}</h1>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <AlbumBoxList colProps={colProps} items={released.rows} />
        </Row>
        <Row>
          <Col md={6} className='mt-3 flex-grow-1'>
            <BlackButton href='/game' name={t('More game releases')} />
          </Col>
          <Col md={6} className='mt-3  flex-grow-1'>
            <BlackButton href='/anim' name={t('More animation releases')} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <h1 className='text-center text-uppercase homeTitle p-3' id='last-added'>{t('Last Added')}</h1>
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <AlbumBoxList colProps={colProps} items={added.rows} />
        </Row>
        <Row className='mt-3'>
          <Col md={12}>
            <Link href="/last-added">
              <h1 className='text-center blackButton'>{t('More last added')}</h1>
            </Link>
          </Col>
        </Row>
      </Col>
      <Sidebar index radio />
    </Row>
  )
}
