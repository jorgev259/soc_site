import { Fragment } from 'react'
import { NextIntlClientProvider, useTranslations } from 'next-intl'
import classNames from 'classnames'

import styles from '@/styles/DownloadSection.module.scss'

import { Link } from '@/next/lib/navigation'
import DirectButton from '../../client/AlbumPage/DirectButton'
import { getMessageObject } from '@/next/lib/transl'

export default function DownloadSection (props) {
  const { downloads = [] } = props
  const t = useTranslations('albumPage.download')

  return (
    downloads.map((download, di) => {
      const { links, title } = download

      return (
        <div className='row' key={di}>
          <div className='col'>
            <div className='row'>
              <div className='col col-md-12'>
                <h2 className='text-center download-txt mb-0'>{title}</h2>
              </div>
            </div>
            {links.map(link => {
              const { id: linkId, url, provider, directUrl } = link

              return (
                <Fragment key={linkId}>
                  <div className='row mt-2'>
                    <div md={12}><h5 className='col col-md-12 text-center'>{provider}</h5></div>
                  </div>
                  <div className='row mx-auto mb-3'>
                    <div className='col col-6 mx-auto py-2'>
                      <Link target="_blank" href={url}>
                        <button className={classNames('btn btn-secondary', styles.download)}>{t('Download')}</button>
                      </Link>
                    </div>
                    <div className='col py-2'>
                      <NextIntlClientProvider messages={getMessageObject(t, ['Become_Donator', 'Direct'])}>
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
  )
}
