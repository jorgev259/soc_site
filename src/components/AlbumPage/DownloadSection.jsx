import { Fragment } from 'react'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import clsx from 'clsx'

import styles from '@/styles/DownloadSection.module.scss'

import { Link } from '@/next/utils/navigation'
import DirectButton from '../AlbumPage/DirectButton'
import { getMessageObject } from '@/next/utils/transl'

export default function DownloadSection(props) {
  const { downloads = [] } = props
  const t = useTranslations('albumPage.download')

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
                <div className='row mt-2'>
                  <div md={12}>
                    <h5 className='col col-md-12 text-center'>{provider}</h5>
                  </div>
                </div>
                <div className='row mx-auto mb-3'>
                  <div className='col mx-auto py-2'>
                    <Link target='_blank' href={url}>
                      <button
                        className={clsx('btn btn-secondary', styles.download)}
                      >
                        {t('Download')}
                      </button>
                    </Link>
                  </div>
                  {url2 ? (
                    <div className='col mx-auto py-2'>
                      <Link target='_blank' href={url2}>
                        <button
                          className={clsx('btn btn-secondary', styles.download)}
                        >
                          {t('Alt Download')}
                        </button>
                      </Link>
                    </div>
                  ) : null}
                  <div className='col py-2'>
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
