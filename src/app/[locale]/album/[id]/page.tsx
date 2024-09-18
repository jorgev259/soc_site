import Image from 'next/image'
import clsx from 'clsx'
import { gql } from '@apollo/client'
// eslint-disable-next-line camelcase
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'

import styles from './AlbumPage.module.scss'

import { Link } from '@/next/utils/navigation'
import { getClient } from '@/next/utils/ApolloSSRClient'
import { getNextCDNUrl, getCDNUrl } from '@/next/utils/getCDN'
import getSessionInfo from '@/next/utils/getSession'
import { getMessageObject } from '@/next/utils/transl'

import FavoriteSection from '@/next/components/AlbumPage/FavoriteSection'
import HeroCover from '@/next/components/AlbumPage/HeroCover'
import Related from '@/next/components/AlbumPage/Related'

import TrackList from '@/next/components/AlbumPage/TrackList'
import { InfoTable } from '@/next/components/AlbumPage/InfoTable'
import DownloadList from '@/next/components/AlbumPage/DownloadSection'
import CommentCarrousel from '@/next/components/CommentCarrousel/CommentCarrousel'

import vgmdbLogo from '@/img/assets/vgmdblogo.png'
import type { PageContext } from '@/next/types'

const metadataFields = [
  'title',
  'subTitle',
  ` artists {
      slug
      name
    }
  `
]
const viewportFields = ['headerColor']
const pageFields = `
  ${metadataFields}
  releaseDate
  vgmdb
  description
  placeholder
  headerColor
  status
  platforms {
    id
    name
  }
  animations {
    id
    title
  }
  games {
    slug
    name
  }
  categories {
    name
  }
  classifications {
    name
  }
  stores {
    url
    provider
  }
  discs {
    number
    body
  }
  downloads {
    title
    small
    links {
      id
      url
      url2
      provider
      directUrl
    }
  }
  favorites
`

const getAlbumQuery = (fields) => gql`
  query GetAlbum ($id: ID!) {
    album(id: $id){
      id
      ${fields}
    }
  }
`

type Context = PageContext<{ id: string }>

export async function generateMetadata(context: Context) {
  const { params } = context
  const { id } = params

  const { data } = await getClient().query({
    query: getAlbumQuery(metadataFields),
    variables: { id }
  })
  const { album } = data
  const { title, subTitle, artists } = album
  const description = subTitle || artists.map((a) => a.name).join(' - ')

  return {
    title,
    description,
    openGraph: {
      url: `/album/${id}`,
      title,
      description,
      images: [{ url: getNextCDNUrl(id, 'album') }]
    }
  }
}

export async function generateViewport(context: Context) {
  const { params } = context
  const { id } = params

  const { data } = await getClient().query({
    query: getAlbumQuery(viewportFields),
    variables: { id }
  })
  const { album } = data

  if (!album) return notFound()
  const { headerColor } = album

  return {
    themeColor: headerColor
  }
}

export default function AlbumPage(context: Context) {
  const { params } = context
  const { locale, id } = params

  unstable_setRequestLocale(locale)

  return (
    <div className={clsx('row', styles.container)}>
      <div className={clsx('col px-0', styles.backgroundContainer)}>
        <div>
          <Image
            sizes='100vw'
            src={getCDNUrl(id, 'album')}
            alt=''
            aria-hidden='true'
            fill
            quality={80}
          />
        </div>
      </div>

      <div className={clsx('col px-0 px-md-5 pt-3 mx-auto', styles.content)}>
        <Content {...context} />
      </div>
    </div>
  )
}

async function Content(context) {
  const { params } = context
  const { id } = params

  const t = await getTranslations('albumPage')
  const tComment = await getTranslations('albumPage.comment')
  const { isFAU } = await getSessionInfo()

  const { data } = await getClient().query({
    query: getAlbumQuery(pageFields),
    variables: { id }
  })
  const { album } = data

  if (!album) return notFound()

  return (
    <>
      <div className='row px-0 px-md-5'>
        <div className='col col-12 col-lg-5 d-flex align-items-center px-lg-2 mb-3 mb-lg-0'>
          <HeroCover {...album} />
        </div>
        <div className='col col-12 col-lg-7'>
          <div className='blackBox'>
            <div className='row'>
              <div className='col'>
                <h1 className={styles.title}>{album.title}</h1>
                <h6
                  className={styles.subTitle}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {album.subTitle}
                </h6>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <InfoTable album={album} />
              </div>
            </div>
            <UserButtons id={album.id} />
          </div>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className={clsx('col col-12 col-lg-6', styles.trackList)}>
          <div className='blackBox h-100 d-flex flex-column'>
            <div className='row'>
              <div className='col'>
                <h1
                  className={clsx('text-center text-uppercase', styles.title)}
                >
                  {t('Tracklist')}
                </h1>
              </div>
            </div>
            <div className='row px-3 flex-grow-1 '>
              <div className='col d-flex flex-column'>
                <TrackList discs={album.discs} tDisc={t('Disc')} />
              </div>
            </div>
          </div>
        </div>

        <div className='col mt-3 mt-lg-0 col-12 col-lg-6'>
          <div className='blackBox'>
            {album.vgmdb && (
              <div className='row mt-2 mb-3 ms-2'>
                <div className='col col-auto px-0'>
                  <span style={{ fontSize: '21px' }}>{'Check album at'}:</span>
                </div>
                <div className='col-auto d-flex align-items-center ps-0'>
                  <Link
                    href={album.vgmdb}
                    className='ms-2'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Image
                      width={100}
                      height={30}
                      alt={'VGMdb'}
                      src={vgmdbLogo}
                    />
                  </Link>
                </div>
              </div>
            )}
            {album.stores.length > 0 && (
              <div className='row mt-2 px-3'>
                <ProviderBox stores={album.stores}>
                  {t('Buy_Original')}
                </ProviderBox>
              </div>
            )}
            <hr />
            <DownloadList downloads={album.downloads} />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col my-3'>
          <NextIntlClientProvider
            messages={getMessageObject(tComment, [
              'Comment_Login',
              'Comment_Anon',
              'Save comment',
              'Add comment',
              'Edit comment',
              'Comment_error'
            ])}
          >
            <CommentCarrousel isFAU={isFAU} id={album.id} />
          </NextIntlClientProvider>
        </div>
      </div>

      <Related id={album.id} />
    </>
  )
}

async function UserButtons(props) {
  const { id } = props

  const { session, isFAU } = await getSessionInfo()
  const { permissions } = session

  const t = await getTranslations('albumPage')
  const tFav = await getTranslations('albumPage.favorite')

  return (
    <>
      <div className='row mt-2'>
        <div className='col'>
          {isFAU ? (
            <FavoriteSection id={id} />
          ) : (
            <button
              type='button'
              className='w-100 rounded-3 btn btn-outline-light'
              data-bs-toggle='modal'
              data-bs-target='#loginModal'
            >
              {tFav('Favorite_Login')}
            </button>
          )}
        </div>
      </div>
      {isFAU && permissions?.includes('UPDATE') ? (
        <div className='row mt-3'>
          <div className='col'>
            <Link href={`/admin/album/${id}`}>
              <button
                type='button'
                className='w-100 rounded-3 btn btn-outline-light'
              >
                {t('Edit this album')}
              </button>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}

async function ProviderBox(props) {
  const { stores, children } = props
  const filterStores = stores.filter((s) => s.provider !== 'SOON')

  return (
    <div className={clsx('col', styles.stores)}>
      <h1
        className={clsx('text-center mb-0', styles.title)}
        style={{ fontSize: '30px' }}
      >
        {children}
      </h1>

      {filterStores.length > 0 ? (
        <>
          <hr className='my-2' />
          <div className='row'>
            {filterStores.map(({ url, provider }, i) =>
              provider === 'SOON' ? null : (
                <div
                  key={i}
                  className='col-md-6 d-flex justify-content-center py-1'
                >
                  <Link target='_blank' rel='noopener noreferrer' href={url}>
                    <Image
                      sizes='40vw'
                      className='rounded'
                      width={250}
                      height={70}
                      style={{ height: 'auto', width: '100%' }}
                      alt={provider}
                      src={`/img/provider/${provider}.jpg`}
                    />
                  </Link>
                </div>
              )
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}
