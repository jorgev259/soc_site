import Image from 'next/image'

import { ModalPortal } from '@/next/components/common/Modal'

import { getCDNUrl } from '@/next/utils/getCDN'
import { PLACEHOLDER } from '@/next/constants/index'

import styles from './HeroCover.module.scss'

export default function HeroCover(props) {
  const { id, title = 'Album', placeholder = PLACEHOLDER } = props

  return (
    <>
      <ModalPortal id={styles.coverModal} className='h-100 modal-xl'>
        <div className={styles.container}>
          <Image
            unoptimized
            className='rounded'
            fill
            alt={`${title} cover`}
            src={getCDNUrl(id, 'album')}
            placeholder='blur'
            blurDataURL={placeholder}
          />
        </div>
      </ModalPortal>

      <div
        className={styles.coverContainer}
        data-bs-toggle='modal'
        data-bs-target={`#${styles.coverModal}`}
      >
        <Image
          quality={80}
          sizes='40vw'
          className='rounded'
          fill
          alt={`${title} cover`}
          src={getCDNUrl(id, 'album')}
          placeholder='blur'
          blurDataURL={placeholder}
        />
      </div>
    </>
  )
}
