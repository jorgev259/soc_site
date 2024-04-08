import { gql } from '@apollo/client'
import { Container, Col, Row } from 'react-bootstrap'
import { useTranslations } from 'next-intl'
import React from 'react'
import clsx from 'clsx'
import { useSearchParams } from 'next/navigation'

import styles from '@/styles/LastAdded.module.scss'

import { Link } from '@/next/utils/navigation'
import { AlbumBoxList } from '@/components/AlbumBoxes'
import { getFullPageList, getPageList } from '@/server/utils/pagination'
import { initializeApollo } from '@/next/utils/ApolloClient'

const limit = 80
const limitMD = 15
const limitSM = 10
const limitXS = 5

/* export async function getStaticPaths () {
  const paths = [
    { params: { params: [] } },
    { params: { params: ['1'] } }
  ]
  return { paths, fallback: 'blocking' }
} */

export async function getServerSideProps(context) {
  const { params } = context
  const paramList = params?.params || []
  const page = paramList[0] || '1'

  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
      query SearchAlbum($limit: Int, $page: Int) {
        searchAlbum(limit: $limit, page: $page, status: ["show", "coming"]) {
          rows {
            id
            status
            title
            placeholder
          }
          count
        }
      }
    `,
    variables: { limit, page: page - 1 }
  })

  return { props: { ...data.searchAlbum } }
}

export default function LastAdded(props) {
  const t = useTranslations('common')
  const searchParams = useSearchParams()

  const params = searchParams.get('params') || ['1']
  const [page] = params
  const { rows, count } = props
  const fullPageList = getFullPageList(count, limit)

  function PageList({ className, currentLimit }) {
    const { pageList, currentList, currentListIndex } = getPageList(
      fullPageList,
      currentLimit,
      page
    )

    return (
      <ul
        className={clsx(className, 'pagination justify-content-center m-auto')}
      >
        {currentListIndex > 0 && (
          <>
            <li className='page-item my-auto'>
              <Link
                href={'/last-added/1'}
                scroll
                className='fas fa-angle-double-left align-middle'
              ></Link>
            </li>
            <li className='page-item my-auto'>
              <Link
                href={`/last-added/${currentList[0] - 1}`}
                scroll
                className='fas fa-angle-left align-middle'
              ></Link>
            </li>
          </>
        )}
        {currentList.map((e) => (
          <li className='page-item' key={e}>
            <Link
              href={`/last-added/${e}`}
              scroll
              className={clsx(
                styles.pageLink,
                {
                  disabled: e === parseInt(page),
                  [styles.disabled]: e === parseInt(page)
                },
                'nav-link'
              )}
            >
              {e}
            </Link>
          </li>
        ))}
        {currentListIndex !== pageList.length - 1 && (
          <>
            <li className='page-item my-auto'>
              <Link
                href={`/last-added/${currentList[currentList.length - 1] + 1}`}
                scroll
                className='fas fa-angle-right align-middle nav-link'
              ></Link>
            </li>
            <li className='page-item my-auto'>
              <Link
                href={`/last-added/${fullPageList[fullPageList.length - 1]}`}
                scroll
                className='fas fa-angle-double-right align-middle nav-link'
              ></Link>
            </li>
          </>
        )}
      </ul>
    )
  }

  return (
    <>
      <Container>
        <Row>
          <Col className='py-3'>
            <div>
              <h1 className='text-center homeTitle' id='last-releases'>
                {t('Last Added')}
              </h1>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center px-1 px-md-5'>
          <AlbumBoxList colProps={{ xs: 6, md: 3 }} items={rows} quality={30} />
        </Row>
      </Container>

      <Row>
        <Col className='px-0' style={{ height: 60 }}>
          <nav className='h-100 d-flex'>
            <PageList className='d-flex d-sm-none' currentLimit={limitXS} />
            <PageList
              className='d-none d-sm-flex d-md-none'
              currentLimit={limitSM}
            />
            <PageList className='d-none d-md-flex' currentLimit={limitMD} />
          </nav>
        </Col>
      </Row>
    </>
  )
}
