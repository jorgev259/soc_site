'use client'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'

import { setRating } from '@/next/actions/albumPage'

export default function Star (props) {
  const { className, position, albumId, isFAU } = props
  const t = useTranslations('')

  const handleClick = useCallback(() => {
    if (!isFAU) return

    setRating(albumId, position + 1)
      .then(() => toast.success(t('Rating saved!')))
      .catch(err => {
        console.log(err)
        toast.error(t('Failed to save rating'))
      })
  }, [position, t, albumId, isFAU])

  return <span className={className} onClick={handleClick} />
}
