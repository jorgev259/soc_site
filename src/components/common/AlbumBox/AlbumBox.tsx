import clsx from 'clsx'
import Image from 'next/image'

import { Link } from '@/next/utils/navigation'
import { getImageUrl } from '@/server/utils/getCDN'

import styles from './AlbumBox.module.scss'

export function AlbumFallback(props) {
  const { count, ...rest } = props
  const result = Array(count)
    .fill(2)
    .map((_, i) => <AlbumBox key={i} {...rest} status='loading' />)

  return <>{result}</>
}

export function AlbumBox(props) {
  const {
    id,
    title,
    type = 'album',
    status,
    placeholder,
    style,
    className
  } = props
  const coming = status === 'coming'
  const loading = status === 'loading'

  const commonContent = (
    <>
      <div className={clsx(styles.img, 'pt-1')}>
        <Image
          sizes='25vw'
          alt={title}
          src={getImageUrl(id, type)}
          placeholder='blur'
          blurDataURL={placeholder}
          quality={30}
          fill
        />
      </div>
      <div className='text-wrap text-center p-2'>
        {coming ? 'Coming Soon' : title}
      </div>
    </>
  )

  const content = coming ? (
    commonContent
  ) : (
    <Link href={`/${type}/${id}`}>{commonContent}</Link>
  )

  return (
    <div
      className={clsx(
        styles.albumBoxContainer,
        styles[type],
        'col px-1 mb-2',
        className
      )}
    >
      <div
        className={clsx(styles.albumBox, {
          [styles.coming]: coming,
          loadingAnim: loading
        })}
        style={style}
      >
        {loading ? null : content}
      </div>
    </div>
  )
}
