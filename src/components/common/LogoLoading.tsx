import Image from 'next/image'
import clsx from 'clsx'

import styles from '@/styles/Search.module.scss'
import logo from '@/img/assets/clouds.png'

export default function LogoLoading(props) {
  const { className = '', style = {}, size = 150 } = props
  return (
    <div
      className={clsx(className, styles.spin)}
      style={{ ...style, height: size, width: size }}
    >
      <Image
        layout='responsive'
        height={size}
        width={size}
        alt='loading'
        src={logo}
      />
    </div>
  )
}
