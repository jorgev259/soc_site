import classnames from 'classnames'

import Loading from './Loading'

export default function LoadingButton (props) {
  const { loading = false, className, children, ...buttonProps } = props

  return (
    <button {...buttonProps} className={classnames('btn', className)} disabled={loading}>
      <Loading loading={loading}>{children}</Loading>
    </button>
  )
}
