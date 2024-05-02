import clsx from 'clsx'

import { gql } from '@/next/__generated__'
import { getFullPageList, getPageList } from '@/next/server/utils/pagination'
import { getClient } from '@/next/utils/ApolloSSRClient'

import { AlbumBox } from '@/next/components/common/AlbumBox'
import { Link } from '@/next/utils/navigation'

const rowLimit = 52

const limitMD = 12
const limitXS = 5

const query = gql(`
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
`)

export default async function Page({
  params
}: {
  params: { values?: string[] }
}) {
  const page = parseInt((params?.values ?? [])[0] ?? '1')

  const client = await getClient()
  const { data } = await client.query({
    query,
    variables: { limit: rowLimit, page: page - 1 }
  })

  const { searchAlbum } = data
  if (!searchAlbum) throw new Error('Invalid API response')

  const rows = searchAlbum.rows ?? []
  const count = searchAlbum.count ?? 0
  const fullPageList = getFullPageList(count, rowLimit)

  return (
    <>
      <div className='row justify-content-center px-2 mx-0 px-md-5 mx-md-5'>
        {rows.map((album) => (
          <AlbumBox
            key={album?.id}
            className='col-6 col-md-3 px-0'
            linkProps={{ prefetch: false }}
            {...album}
          />
        ))}
      </div>
      <div className='row'>
        <div className='col px-0'>
          <Nav page={page} fullPageList={fullPageList} />
        </div>
      </div>
    </>
  )
}

function Nav(props: { page: number; fullPageList: number[] }) {
  const { page, fullPageList } = props
  const listProps = { fullPageList, page }

  return (
    <nav aria-label='Last added page navigation' className='w-100 mb-0'>
      <PageList
        className='d-flex d-md-none'
        currentLimit={limitXS}
        {...listProps}
      />
      <PageList
        className='d-none d-md-flex'
        currentLimit={limitMD}
        {...listProps}
      />
    </nav>
  )
}

function PageList(props: {
  className: string
  currentLimit: number
  fullPageList: number[]
  page: number
}) {
  const { className, currentLimit, fullPageList, page } = props

  const { pageList, currentList, currentListIndex } = getPageList(
    fullPageList,
    currentLimit,
    page
  )

  return (
    <ul
      className={clsx(
        className,
        'pagination bg-dark mb-0 py-2 justify-content-center'
      )}
    >
      {currentListIndex > 0 && (
        <>
          <li className='page-item'>
            <Link
              prefetch={false}
              className='page-link px-3 py-2'
              href='/last-added/1'
              aria-label='First'
            >
              <span aria-hidden='true'>&laquo;</span>
            </Link>
          </li>
          <li className='page-item'>
            <Link
              prefetch={false}
              className='page-link px-3 py-2'
              href={`/last-added/${currentList[0] - 1}`}
              aria-label={(currentList[0] - 1).toString()}
            >
              <span aria-hidden='true'>&lt;</span>
            </Link>
          </li>
        </>
      )}
      {currentList.map((item) => (
        <li key={item} className='page-item'>
          <Link
            prefetch={false}
            className={clsx('page-link px-3 py-2', { disabled: item === page })}
            href={`/last-added/${item}`}
          >
            {item}
          </Link>
        </li>
      ))}
      {currentListIndex !== pageList.length - 1 && (
        <>
          <li className='page-item'>
            <Link
              prefetch={false}
              className='page-link px-3 py-2'
              href={`/last-added/${currentList[currentList.length - 1] + 1}`}
              aria-label={(currentList[currentList.length - 1] + 1).toString()}
            >
              <span aria-hidden='true'>&gt;</span>
            </Link>
          </li>
          <li className='page-item'>
            <Link
              prefetch={false}
              className='page-link px-3 py-2'
              href={`/last-added/${fullPageList[fullPageList.length - 1]}`}
              aria-label='Last'
            >
              <span aria-hidden='true'>&raquo;</span>
            </Link>
          </li>
        </>
      )}
    </ul>
  )
}
