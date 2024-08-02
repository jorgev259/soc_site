import { gql } from '@apollo/client'
import { Link } from '@/next/utils/navigation'
import { useTranslations } from 'next-intl'

import { initializeApollo } from '@/next/utils/ApolloClient'
import { AlbumBoxList } from '@/components/AlbumBoxes'

export async function getServerSideProps(context) {
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
      query {
        result: searchAlbum(
          limit: 40
          order: ["releaseDate", "createdAt"]
          categories: ["Animation"]
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

  return { props: { ...data.result } }
}

function Button(props) {
  const { name, href } = props
  const t = useTranslations('common')

  return (
    <div className='col-md-3 mt-3 flex-grow-1'>
      <Link href={href}>
        <h4 className='text-center blackButton d-flex align-items-center justify-content-center px-3 py-2'>
          {t(name)}
        </h4>
      </Link>
    </div>
  )
}

export default function GameHome(props) {
  const { rows } = props
  const t = useTranslations('common')

  return (
    <div className='container'>
      <div className='row'>
        <Button name='List' href='/anim/list' />
        <Button name='Studios' href='/studio/list' />
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='row p-3'>
            <div className='col-md-12'>
              <h1 className='text-center homeTitle' id='last-releases'>
                {t('Latest Animation Releases')}
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
