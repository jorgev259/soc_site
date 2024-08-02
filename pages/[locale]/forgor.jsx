import { useRef, useState } from 'react'
import loader from 'svg-loaders/svg-smil-loaders/oval.svg'
import Image from 'next/legacy/image'
// import { DateTime } from 'luxon'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import clsx from 'clsx'

import { useRouter } from '@/next/utils/navigation'

const bigNono = { redirect: { permanent: false, destination: '/500' } }
const mutation = gql`
  mutation updatePass($key: String!, $pass: String!) {
    updatePass(key: $key, pass: $pass)
  }
`

export async function getServerSideProps(context) {
  const { query } = context
  const { key } = query
  if (!key) return bigNono

  // const row = await db.models.forgor.findByPk(key)
  // if (!row) return bigNono

  // const now = DateTime.now()
  // const expires = DateTime.fromJSDate(row.expires)

  // if (now > expires) return bigNono
  /* else */ return { props: { qKey: key } }
}

export default function Forgor({ qKey }) {
  const key = qKey
  const [mutate, { loading }] = useMutation(mutation)
  const router = useRouter()

  const p1 = useRef(null)
  const p2 = useRef(null)
  const [isInvalid, setInvalid] = useState(false)

  const checkInvalid = () =>
    setInvalid(p1?.current?.value !== p2?.current?.value)

  const submit = (ev) => {
    ev.preventDefault()
    mutate({ variables: { key, pass: p1.current.value } })
      .then(() => {
        toast.success('Password changed succesfully!')
        router.push('/')
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') console.log(err)
        toast.error('Failed to change password')
      })
  }

  return (
    <div className='col'>
      <form
        onSubmit={submit}
        className='site-form grayblock mx-auto my-5'
        style={{ maxWidth: '500px' }}
      >
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='username' style={{ color: 'black' }}>
                New password:
              </label>
              <input
                required
                type='password'
                name='password'
                ref={p1}
                className='form-control'
                onChange={checkInvalid}
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='password' style={{ color: 'black' }}>
                Repeat new password:
              </label>
              <input
                required
                type='password'
                name='password'
                className={clsx('form-control', { 'is-invalid': isInvalid })}
                ref={p2}
                onChange={checkInvalid}
              />
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-4 mx-auto'>
            <button type='submit' className='btn btn-primary w-100'>
              {loading ? (
                <Image {...loader} alt='loading' />
              ) : (
                'Change password'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
