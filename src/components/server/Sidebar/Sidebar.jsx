import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { gql } from '@apollo/client'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { CommentCarrouselSidebar } from '@/next/components/client/CommentCarrousel'
import Script from 'next/script'

import { getClient } from '@/next/lib/ApolloSSRClient'
import AlbumBox from '../AlbumBox'
import Ad from '../Ad'

import styles from './Sidebar.module.scss'

import discord from '@/img/assets/discord.png'
import kofi from '@/img/assets/ko-fi-donate-button.png'
import yt from '@/img/assets/yt.png'
import twitter from '@/img/assets/twitter.png'

const randomQuery = gql`
  query GetLucky {
    getRandomAlbum {
      id
    }
  }
`

const higlightQuery = gql`
  query Highlight {
    highlight {
      id
      title
      placeholder
      status
    }
  }
`

async function GetLucky () {
  const t = useTranslations('sidebar')
  const client = await getClient()
  const { data } = await client.query({ query: randomQuery })

  return (
    <h1 className='mx-auto text-center my-2'>
      <Link href={`/album/${data.getRandomAlbum[0].id}`} className='text-uppercase'>
        {t('Get Lucky')}
      </Link>
    </h1>
  )
}

async function Highlight () {
  const t = useTranslations('sidebar')
  const client = await getClient()
  const { data } = await client.query({ query: higlightQuery })

  return (
    <div className={classNames(styles.section, 'mt-3 p-1')}>
      <h4 className='text-center text-uppercase py-1' style={{ fontWeight: 700 }}>{t('Highlight Soundtrack')}</h4>
      <Suspense fallback={<AlbumBox className='col-xs-12' status='loading' />}>
        <AlbumBox className='col-xs-12' {...data?.highlight} />
      </Suspense>
    </div>
  )
}

const countQuery = gql`
  query HomeCount {
    albumCount
    categories {
      name
      count
    }
  }
`

async function AlbumCount () {
  const t = useTranslations('sidebar')
  const client = await getClient()
  const { data } = await client.query({ query: countQuery })

  return (
    <Suspense fallback={<div className={classNames(styles.section, 'mt-3 loadingAni')} style={{ height: '150px' }}/>}>
      <div className={classNames(styles.section, 'mt-3')}>
        <h5 className='text-center text-uppercase' style={{ fontWeight: 700 }}>{t('Soundtrack Count')}: {data.albumCount}</h5>
        {data.categories.map(({ name, id, count }, i) => <h6 key={i} className='mt-2 text-center'>{t(`${name} Soundtracks`)}: {count}</h6>)}
      </div>
    </Suspense>
  )
}

function SidebarAd () {
  return (
    <Ad>
      <div className='row flex-grow-1'>
        <div className='col'>
          <iframe title='play-asia' id='id01_909824' src='https://www.play-asia.com/38/190%2C000000%2Cnone%2C0%2C0%2C0%2C0%2CFFFFFF%2C000000%2Cleft%2C0%2C0-762s-70joq4-062-783c-29466-901vq93-33iframe_banner-44140px' style={{ height: '100%', width: '100%', borderStyle: 'none', borderWidth: '0px', borderColor: '#000000', padding: 0, margin: 0, scrolling: 'no', frameborder: 0 }} />
        </div>
      </div>
      <Script src='/js/sidebarAd.js' />
    </Ad>
  )
}

export default function Sidebar (props) {
  const { radio = false, home = false } = props
  const t = useTranslations('sidebar')

  return (
    <div md={3} className={classNames(styles.root, 'col p-3 ms-md-auto d-flex flex-column col-md-3')}>
      {home
        ? (
          <div className='row'>
            <div className='col'>
              <h1 className='mx-auto text-center my-2'><a href='#last-added'>{t('Last Added')}</a></h1>
            </div>
          </div>
        )
        : null}
      <div className='row'>
        <div className='col'>
          <GetLucky />
        </div>
      </div>
      <div className='row'>
        <h1 className='mx-auto text-center my-2'>
          <Link href='/holy12' className='text-uppercase'>{t('Random Pull')}</Link>
        </h1>
      </div>

      <div className='row px-3 mt-3'>
        <div className={classNames(styles.section, 'col-md-12')}>
          <div className='row'>
            <div className='col d-flex pe-1'>
              <div className='ms-auto' >
                <a href='https://www.youtube.com/channel/UCb1Q0GuOa8p_7fY-pYnWCmQ' target='_blank' rel='noopener noreferrer'>
                  <Image className="rounded" src={yt} alt='youtube' height={50} width={50} />
                </a>
              </div>
            </div>
            <div className='col d-flex ps-1'>
              <div className='me-auto' >
                <a href='https://twitter.com/SittingOnCloud' target='_blank' rel='noopener noreferrer'>
                  <Image className="rounded" src={twitter} alt='twitter' height={50} width={50} />
                </a>
              </div>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col'>
              <a className='d-flex justify-content-center px-1' href='https://discord.gg/x23SFbE'>
                <Image alt='Join our Discord!' className={styles.discord} src={discord} />
              </a>
            </div>
          </div>
          <div className='row mt-1'>
            <div className='col d-flex justify-content-center'>
              <a target='_blank' rel='noopener noreferrer' href='https://ko-fi.com/sittingonclouds'>
                <Image style={{ height: 'auto', width: 'auto', maxHeight: '100px', maxWidth: '100%' }} alt='Support me on Ko-fi' src={kofi} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <Highlight />
      <CommentCarrouselSidebar />
      <AlbumCount />

      {radio && (
        <div className={classNames(styles.section, 'mt-3 p-2')}>
          <iframe title='radio' frameBorder='0' style={{ height: '335px', width: '100%' }} src='https://www.squid-radio.net/widget' />
        </div>
      )}

      <SidebarAd />
    </div>
  )
}
