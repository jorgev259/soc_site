import classnames from 'classnames'

import Loading from './Loading'

export default function SubmitButton(props) {
  const { loading = false, className, children, ...buttonProps } = props

  return (
    <button
      {...buttonProps}
      type='submit'
      className={classnames('btn btn-primary', className)}
      disabled={loading}
    >
      <Loading>{children}</Loading>
    </button>
  )
}
