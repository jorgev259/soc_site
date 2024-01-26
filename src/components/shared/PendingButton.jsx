'use client'
import { useFormStatus } from 'react-dom'

import LoadingButton from './LoadingButton'

export default function PendingButton (props) {
  const { pending } = useFormStatus()
  return <LoadingButton {...props} loading={pending}/>
}
