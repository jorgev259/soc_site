'use client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { gql } from '@apollo/client'
import { Suspense, Fragment, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import styles from './DownloadSection.module.scss'

const queryDownload = gql`
  query downloads($id: ID!) {
    downloads(id: $id) {
      title
      small
      links {
        id
        url
        provider
        directUrl
      }
    }
  }
`

export default function DownloadSection(props) {
  const { id, initialDownloads } = props
  const { data } = useSuspenseQuery(queryDownload, { variables: { id } })

  return (
    <Suspense fallback={<DownloadList downloads={initialDownloads} />}>
      <DownloadList downloads={data.downloads} />
    </Suspense>
  )
}

function DownloadList(props) {
  const { downloads = [] } = props
  const t = useTranslations('albumPage')

  return downloads.map((download, di) => {
    const { links, title } = download

    return (
      <div className='row' key={di}>
        <div className='col'>
          <div className='row'>
            <div className='col col-md-12'>
              <h2 className='text-center download-txt mb-0'>{title}</h2>
            </div>
          </div>
          {links.map((link) => {
            const { id: linkId, url, url2, provider, directUrl } = link

            return (
              <Fragment key={linkId}>
                {/* <div className='row mt-2'>
                  <div md={12}>
                    <h5 className='col col-md-12 text-center'>{provider}</h5>
                  </div>
                </div> */}
                <div className='d-flex mx-auto mb-3'>
                  <Image
                    sizes='40vw'
                    className='rounded'
                    width={30}
                    height={30}
                    alt={provider}
                    src={`/img/provider/${provider}.png`}
                  />
                  {/* {url2&&(
                    <div className='mx-2 w-100'>
                      <Link target='_blank' href={url2}>
                        <button
                          className={clsx('d-flex justify-content-center align-items-center btn btn-secondary', styles.download)}
                        >
                          <Image
                            className='rounded'
                            width={15}
                            height={15}
                            alt='fly'
                            src={`/img/provider/fly.png`}
                          />
                          {t('Download')}
                        </button>
                      </Link>
                    </div>
                  )} */}
                  <div className='mx-2 w-100'>
                    <Link target='_blank' href={url}>
                      <button
                        className={clsx('d-flex justify-content-center align-items-center btn btn-secondary', styles.download)}
                      >
                      <Image
                        className='rounded mr-1'
                        width={15}
                        height={15}
                        alt='ouo'
                        src={`/img/provider/ouo.png`}
                      />
                        {t('Download')}
                      </button>
                    </Link>
                  </div>
                  <div className='mx-2 w-100'>
                    <NextIntlClientProvider
                      messages={getMessageObject(t, [
                        'Become_Donator',
                        'Direct'
                      ])}
                    >
                      <DirectButton directUrl={directUrl} />
                    </NextIntlClientProvider>
                  </div>
                </div>
              </Fragment>
            )
          })}
          <hr />
        </div>
      </div>
    )
  })
}

function DirectButton(props) {
  const { directUrl } = props
  const t = useTranslations('albumPage')

  const elementRef = useRef()
  const tooltipRef = useRef()

  useEffect(() => {
    if (window.bootstrap) {
      console.log({ directUrl })
      if (!directUrl)
        tooltipRef.current = window.bootstrap.Tooltip.getOrCreateInstance(
          elementRef.current
        )
      else {
        tooltipRef.current?.dispose()
        tooltipRef.current = null
      }
    }
  }, [directUrl])

  return (
    </* OverlayTrigger placement='top' overlay={renderTooltip} */>
      {!directUrl ? (
        <button
          ref={elementRef}
          className={clsx('btn btn-secondary', styles.download, styles.direct)}
          disabled
          data-bs-title={t('Become_Donator')}
        >
          {t('Direct')}
        </button>
      ) : (
        <button
          target='_blank'
          className={clsx('btn btn-secondary', styles.download, styles.direct)}
          href={directUrl}
        >
          {t('Direct')}
        </button>
      )}
    </>
  )
}
