'use client'
import { useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import styles from '@/styles/DownloadSection.module.scss'

import { Link } from '@/next/utils/navigation'

export default function DirectButton(props) {
  const { directUrl } = props
  const t = useTranslations('')

  const elementRef = useRef()
  const tooltipRef = useRef()

  useEffect(() => {
    if (window.bootstrap) {
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

  return directUrl ? (
    <Link target='_blank' href={directUrl}>
      <button
        className={clsx('btn btn-secondary', styles.download, styles.direct)}
      >
        {t('Direct')}
      </button>
    </Link>
  ) : (
    <button
      ref={elementRef}
      className={clsx('btn btn-secondary', styles.download, styles.direct)}
      disabled
      data-bs-title={t('Become_Donator')}
    >
      {t('Direct')}
    </button>
  )
}
