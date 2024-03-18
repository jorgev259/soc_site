import clsx from 'clsx'

import Loading from './Loading'

export default function LoadingButton(props) {
  const { loading = false, className, children, ...buttonProps } = props

  return (
    <button
      {...buttonProps}
      className={clsx('btn', className)}
      disabled={loading}
    >
      <Loading loading={loading}>{children}</Loading>
    </button>
  )
}
