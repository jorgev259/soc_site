import { gql } from '@apollo/client'
import { Container, Col, Row } from 'react-bootstrap'
import Link from 'next/link'

import { initializeApollo } from '@/components/ApolloClient'
import { AlbumBoxList } from '@/components/AlbumBoxes'
import { getTranslation } from '@/components/useTranslation'
import { useTranslations } from 'next-intl'

export async function getServerSideProps (context) {
  const { locale } = context
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
    query {
        result: searchAlbum(
            limit: 40,
            order: ["releaseDate", "createdAt"],
            categories: ["Animation"]
        ){
            rows { 
                id
                title
                placeholder
            }
        }
    }`

  })

  const localeStrings = await getTranslation(locale)
  return { props: { ...data.result, localeStrings }/*, revalidate: 60 */ }
}

function Button (props) {
  const { name, href } = props
  const t = useTranslations('common')

  return (
    <Col md={3} className='mt-3  flex-grow-1'>
      <Link href={href}>
        <h4 className='text-center blackButton d-flex align-items-center justify-content-center px-3 py-2'>
          {t(name)}
        </h4>
      </Link>
    </Col>
  )
}

export default function GameHome (props) {
  const { rows } = props
  const t = useTranslations('common')

  return (
    <Container>
      <Row>
        <Button name='List' href='/anim/list'></Button>
        <Button name='Studios' href='/studio/list'></Button>
      </Row>
      <Row>
        <Col md={12}>
          <Row className='p-3'>
            <Col md={12}>
              <h1 className='text-center homeTitle' id='last-releases'>{t('Latest Animation Releases')}</h1>
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
