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
            const { id: linkId, url, provider, directUrl } = link

            return (
              <Fragment key={linkId}>
                <div className='row mt-2'>
                  <div md={12}>
                    <h5 className='col col-md-12 text-center'>{provider}</h5>
                  </div>
                </div>
                <div className='row mx-auto mb-3'>
                  <div className='col col-6 mx-auto py-2'>
                    <button
                      target='_blank'
                      className={clsx('btn btn-secondary', styles.download)}
                      href={url}
                    >
                      {t('Download')}
                    </button>
                  </div>
                  <div className='col py-2'>
                    <DirectButton directUrl={directUrl} />
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
