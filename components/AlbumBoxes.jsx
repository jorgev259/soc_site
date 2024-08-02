import clsx from 'clsx'
import Image from 'next/legacy/image'

import styles from '@/styles/AlbumBoxes.module.scss'

import { Link } from '@/next/utils/navigation'
import { getImageUrl } from '@/server/utils/getCDN'

import { PLACEHOLDER } from '@/next/constants'

export default function AlbumBox(props) {
  const {
    id,
    title,
    type = 'album',
    status,
    height = 300,
    width = 300,
    placeholder,
    style,
    quality
  } = props
  const coming = status === 'coming'
  const blurDataURL = placeholder || PLACEHOLDER

  const BoxContent = () => (
    <>
      <div className={styles.img}>
        <Image
          alt={title}
          src={getImageUrl(id, type)}
          layout='responsive'
          width={width}
          height={height}
          placeholder='blur'
          blurDataURL={blurDataURL}
          quality={quality}
        />
      </div>
      <div className='text-wrap text-center p-2'>
        {coming ? 'Coming Soon' : title}
      </div>
    </>
  )

  return (
    <div
      className={clsx(styles.albumBox, { [styles.coming]: coming })}
      style={style}
    >
      {coming ? (
        <BoxContent />
      ) : (
        <Link href={`/${type}/${id}`}>
          <BoxContent />
        </Link>
      )}
    </div>
  )
}

export function AlbumBoxList(props) {
  const { items, type, width, height, style, colProps = {}, quality } = props
  const { xs, md } = colProps

  return items.map((albumProps) => (
    <div
      {...colProps}
      key={albumProps.id}
      className={clsx(
        styles.albumBoxContainer,
        styles[type],
        { [`col-${xs}`]: !!xs, [`col-md-${md}`]: !!md },
        'col px-1 mb-2'
      )}
    >
      <AlbumBox
        {...albumProps}
        style={style}
        type={type}
        width={width}
        height={height}
        quality={quality}
      />
    </div>
  ))
}
