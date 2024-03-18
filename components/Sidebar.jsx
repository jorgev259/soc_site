import { Col, Row } from 'react-bootstrap'
import clsx from 'clsx'
import { gql, useQuery } from '@apollo/client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

import styles from '@/styles/Sidebar.module.scss'

import discord from '@/img/assets/discord.png'
import kofi from '@/img/assets/ko-fi-donate-button.png'
import yt from '@/img/assets/yt.png'
import twitter from '@/img/assets/twitter.png'

import { Link, useRouter } from '@/next/lib/navigation'
import { skipAds } from './utils'
import Loader from './Loader'
import AlbumBox from './AlbumBoxes'
import useUser from './useUser'
import { useTranslations } from 'next-intl'
import { CommentCarrouselSidebar } from './CommentsCarrousel'

function GetLucky() {
  const t = useTranslations('common')
  const query = gql`
    query {
      getRandomAlbum {
        id
      }
    }
  `
  const { data, refetch } = useQuery(query)
  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [router.pathname, refetch])

  return (
    <h1 className='mx-auto text-center my-2'>
      <Link
        href={data ? `/album/${data.getRandomAlbum[0].id}` : ''}
        className='text-uppercase'
      >
        {t('Get Lucky')}
      </Link>
    </h1>
  )
}

export default function Sidebar(props) {
  const { radio = false, index = false } = props
  const t = useTranslations('common')

  return (
    <Col
      md={3}
      className={clsx(
        styles.root,
        'p-3 ms-md-auto d-flex flex-column col-md-3'
      )}
    >
      {index && (
        <>
          <Row className='side-menu'>
            <h1 className='mx-auto text-center my-2'>
              <a href='#last-added'>{t('Last Added_header')}</a>
            </h1>
          </Row>
        </>
      )}
      <Row className='side-menu'>
        <GetLucky />
      </Row>
      <Row className='side-menu'>
        <h1 className='mx-auto text-center my-2'>
          <Link href='/holy12' className='text-uppercase'>
            {t('Random Pull')}
          </Link>
        </h1>
      </Row>
      <Row className='px-3 mt-3'>
        <Col md={12} className={styles.socials}>
          <Row>
            <Col className='d-flex pe-1'>
              <div className='ms-auto'>
                <a
                  href='https://www.youtube.com/channel/UCb1Q0GuOa8p_7fY-pYnWCmQ'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    className='rounded'
                    src={yt}
                    alt='youtube'
                    height={50}
                    width={50}
                  />
                </a>
              </div>
            </Col>
            <Col className='d-flex ps-1'>
              <div className='me-auto'>
                <a
                  href='https://twitter.com/SittingOnCloud'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Image
                    className='rounded'
                    src={twitter}
                    alt='twitter'
                    height={50}
                    width={50}
                  />
                </a>
              </div>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col md={12}>
              <a
                className='d-flex justify-content-center px-1'
                href='https://discord.gg/x23SFbE'
              >
                <Image
                  alt='Join our Discord!'
                  style={{
                    height: 'auto',
                    width: 'auto',
                    maxHeight: '100px',
                    maxWidth: '100%',
                    borderRadius: '10px'
                  }}
                  src={discord}
                />
              </a>
            </Col>
          </Row>
          <Row className='mt-1'>
            <Col md={12} className='d-flex justify-content-center'>
              {/* <a target='_blank' rel='noopener noreferrer' href='https://www.paypal.com/donate/?hosted_button_id=BBGTBGSDAXA8N'><img style={{ height: 'auto', maxHeight: '100px', maxWidth: '100%' }} alt='paypal' src='/img/assets/paypal-donate-button.png' /></a> */}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://ko-fi.com/sittingonclouds'
              >
                <Image
                  style={{
                    height: 'auto',
                    width: 'auto',
                    maxHeight: '100px',
                    maxWidth: '100%'
                  }}
                  alt='Support me on Ko-fi'
                  src={kofi}
                />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>

      <Highlight />
      <CommentCarrouselSidebar />
      <AlbumCount />

      {radio && (
        <div className={clsx(styles.socials, 'mt-3 p-2')}>
          <iframe
            title='radio'
            frameBorder='0'
            style={{ height: '335px', width: '100%' }}
            src='https://www.squid-radio.net/widget'
          />
        </div>
      )}

      <Ad />
    </Col>
  )
}

function AlbumCount() {
  const t = useTranslations('common')
  const query = gql`
    query {
      albumCount
      categories {
        name
        count
      }
    }
  `
  const { data, loading } = useQuery(query)

  return (
    <div className={clsx(styles.socials, 'mt-3')}>
      {loading && <Loader className='mx-auto' size={100} />}
      {data && (
        <>
          <h5
            className='text-center text-uppercase'
            style={{ fontWeight: 700 }}
          >
            {t('Soundtrack Count')}: {data.albumCount}
          </h5>
          {data.categories.map(({ name, id, count }, i) => (
            <h6 key={i} className='mt-2 text-center'>
              {t(`${name} Soundtracks`)}: {count}
            </h6>
          ))}
        </>
      )}
    </div>
  )
}

function Highlight() {
  const t = useTranslations('common')
  const query = gql`
    query {
      highlight {
        id
        title
        placeholder
      }
    }
  `
  const { data = { highlight: {} }, loading } = useQuery(query)
  const { id, title, placeholder } = data.highlight

  return (
    <div className={clsx(styles.socials, 'mt-3 p-1')}>
      {loading && <Loader className='mx-auto' size={100} />}
      {id && (
        <>
          <h4
            className='text-center text-uppercase py-1'
            style={{ fontWeight: 700 }}
          >
            {t('Highlight Soundtrack')}
          </h4>
          <AlbumBox
            id={id}
            title={title}
            placeholder={placeholder}
            xs={12}
            style={{ height: 'auto' }}
          />
        </>
      )}
    </div>
  )
}

function Ad() {
  const { user } = useUser()
  const iframeRef = useRef(null)

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    let t = ''
    t += window.location
    t = t
      .replace(/#.*$/g, '')
      .replace(/^.*:\/*/i, '')
      .replace(/\./g, '[dot]')
      .replace(/\//g, '[obs]')
      .replace(/-/g, '[dash]')
    t = encodeURIComponent(encodeURIComponent(t))
    iframe.src = iframe.src.replace('iframe_banner', t)
  }, [iframeRef])

  return (
    !skipAds(user) && (
      <Row className='flex-grow-1'>
        <Col>
          <iframe
            ref={iframeRef}
            title='play-asia'
            id='id01_909824'
            src='https://www.play-asia.com/38/190%2C000000%2Cnone%2C0%2C0%2C0%2C0%2CFFFFFF%2C000000%2Cleft%2C0%2C0-762s-70joq4-062-783c-29466-901vq93-33iframe_banner-44140px'
            style={{
              height: '100%',
              width: '100%',
              borderStyle: 'none',
              borderWidth: '0px',
              borderColor: '#000000',
              padding: 0,
              margin: 0,
              scrolling: 'no',
              frameborder: 0
            }}
          />
        </Col>
      </Row>
    )
  )
}
