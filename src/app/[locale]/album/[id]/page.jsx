import Image from 'next/image'
import classNames from 'classnames'
import { gql } from '@apollo/client'
// eslint-disable-next-line camelcase
import { getTranslations/*, unstable_setRequestLocale */ } from 'next-intl/server'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { pick } from 'lodash'

import styles from './AlbumPage.module.scss'

import { getClient } from '@/next/lib/ApolloSSRClient'
import { getNextCDNUrl, getCDNUrl } from '@/next/lib/getCDN'
import getSessionInfo from '@/next/lib/getSession'

import { Link } from '@/next/lib/navigation'
import AddFavoriteButton from '@/next/components/client/AlbumPage/AddFavoriteButton'
import TrackList from '@/next/components/client/AlbumPage/TrackList'
import { InfoTable } from '@/next/components/server/AlbumPage/InfoTable'
import DownloadList from '@/next/components/server/AlbumPage/DownloadSection'
import CommentCarrousel from '@/next/components/client/CommentCarrousel/CommentCarrousel'
import Related from '@/next/components/client/AlbumPage/Related'
import HeroCover from '@/next/components/client/AlbumPage/HeroCover'

import vgmdbLogo from '@/img/assets/vgmdblogo.png'

const metadataFields = [
  'title', 'subTitle',
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
      provider
      directUrl
    }
  }
  favorites
`

const getAlbumQuery = fields => gql`
  query GetAlbum ($id: ID!) {
    album(id: $id){
      id
      ${fields}
    }
  }
`

export async function generateMetadata (context) {
  const { params } = context
  const { id } = params

  const { data } = await getClient().query({ query: getAlbumQuery(metadataFields), variables: { id } })
  const { album } = data
  const { title, subTitle, artists } = album
  const description = subTitle || artists.map(a => a.name).join(' - ')

  return {
    title,
    description,
    openGraph: {
      url: `/album/${id}`,
      title,
      description,
      images: [
        { url: getNextCDNUrl(id, 'album') }
      ]
    }
  }
}

export async function generateViewport (context) {
  const { params } = context
  const { id } = params

  const { data } = await getClient().query({ query: getAlbumQuery(viewportFields), variables: { id } })
  const { album } = data
  const { headerColor } = album

  return {
    themeColor: headerColor
  }
}

export default function AlbumPage (context) {
  const { params } = context
  const { /* locale, */ id } = params

  const messages = useMessages()

  // unstable_setRequestLocale(locale)

  return (
    <div className={classNames('row', styles.container)}>
      <div className={classNames('col px-0', styles.backgroundContainer)}>
        <div>
          <Image sizes='100vw' src={getCDNUrl(id, 'album')} alt='' aria-hidden='true' fill quality={80} />
        </div>
      </div>

      <div className={classNames('col px-0 px-md-5 pt-3', styles.content)}>
        <NextIntlClientProvider messages={pick(messages, 'albumPage')}>
          <Content {...context} />
        </NextIntlClientProvider>
      </div>
    </div>
  )
}

async function Content (context) {
  const { params } = context
  const { id } = params

  const t = await getTranslations('albumPage')
  const { isFAU } = await getSessionInfo()
  const { data } = await getClient().query({ query: getAlbumQuery(pageFields), variables: { id } })
  const { album } = data

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
                <h6 className={styles.subTitle} style={{ whiteSpace: 'pre-wrap' }}>{album.subTitle}</h6>
              </div>
            </div>
            <div className='row'>
              <div className='col'><InfoTable album={album} /></div>
            </div>
            <UserButtons id={album.id} />
          </div>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className={classNames('col col-12 col-lg-6', styles.trackList)}>
          <div className='blackBox h-100 d-flex flex-column'>
            <div className='row'>
              <div className='col'>
                <h1 className={classNames('text-center text-uppercase', styles.title)}>{t('Tracklist')}</h1>
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
                <div xs='auto' className='col col-auto d-flex align-items-center ps-0'>
                  <Link href={album.vgmdb} className='ms-2' target='_blank' rel='noopener noreferrer' >
                    <Image width={100} height={30} alt={'VGMdb'} src={vgmdbLogo} />
                  </Link>
                </div>
              </div>
            )}
            {album.stores.length > 0 && (
              <div className='row mt-2 px-3'>
                <ProviderBox stores={album.stores}>
                  {t('Buy_Original')}
                </ProviderBox>
              </div>)}
            <hr />
            <DownloadList downloads={album.downloads} />
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col my-3'>
          <CommentCarrousel isFAU={isFAU} id={album.id} />
        </div>
      </div>

      <Related id={album.id} />
    </>
  )
}

async function UserButtons (props) {
  const { id } = props

  const { session, isFAU } = await getSessionInfo()
  const { permissions } = session

  const t = await getTranslations('albumPage')

  return (
    <>
      <div className='row mt-2'>
        <div className='col'>
          {isFAU
            ? <AddFavoriteButton id={id} />
            : (
              <button type="button" className="w-100 rounded-3 btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#loginModal">
                {t('Favorite_Login')}
              </button>
            )}
        </div>
      </div>
      {isFAU && permissions.includes('UPDATE')
        ? (
          <div className='row mt-3'>
            <div className='col'>
              <Link href={`/admin/album/${id}`}>
                <button type="button" className="w-100 rounded-3 btn btn-outline-light">
                  {t('Edit this album')}
                </button>
              </Link>
            </div>
          </div>
        )
        : null}
    </>
  )
}

async function ProviderBox (props) {
  const { stores, children } = props
  const filterStores = stores.filter(s => s.provider !== 'SOON')

  return (
    <div className={classNames('col', styles.stores)}>
      <h1 className={classNames('text-center mb-0', styles.title)} style={{ fontSize: '30px' }}>{children}</h1>

      {filterStores.length > 0
        ? (<>
          <hr className='my-2' />
          <div className='row'>
            {filterStores.map(({ url, provider }, i) =>
              provider === 'SOON'
                ? null
                : (
                  <div md={6} key={i} className='col col-md-6 d-flex justify-content-center py-1'>
                    <Link target='_blank' rel='noopener noreferrer' href={url}>
                      <Image sizes='40vw' className="rounded" width={250} height={70} style={{ height: 'auto', width: '100%' }} alt={provider} src={`/img/provider/${provider}.jpg`} />
                    </Link>
                  </div>
                )
            )}
          </div>
        </>)
        : null}
    </div>
  )
}
