'use client'

import { useFormStatus } from 'react-dom'

const size = '20px'

export default function FormLoading (props) {
  const { children } = props
  const { pending } = useFormStatus()

  return pending
    ? (
      <>
        <span className="spinner-border spinner-border" aria-hidden="true" style={{ width: size, height: size }}></span>
        <span className="visually-hidden" role="status">Loading...</span>
      </>
    )
    : children
}
