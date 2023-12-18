import { useRef, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import loader from 'svg-loaders/svg-smil-loaders/oval.svg'
import Image from 'next/legacy/image'
// import { DateTime } from 'luxon'
import { gql, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { getTranslation } from '@/components/useTranslation'

const bigNono = { redirect: { permanent: false, destination: '/500' } }
const mutation = gql`
  mutation updatePass($key: String!, $pass: String!){
    updatePass(key: $key, pass: $pass)
  }
`

export async function getServerSideProps (context) {
  const { query, locale } = context
  const { key } = query
  if (!key) return bigNono

  const localeStrings = await getTranslation(locale)

  // const row = await db.models.forgor.findByPk(key)
  // if (!row) return bigNono

  // const now = DateTime.now()
  // const expires = DateTime.fromJSDate(row.expires)

  // if (now > expires) return bigNono
  /* else */ return { props: { qKey: key, localeStrings } }
}

export default function Forgor ({ qKey }) {
  const key = qKey
  const [mutate, { loading }] = useMutation(mutation)
  const router = useRouter()

  const p1 = useRef(null)
  const p2 = useRef(null)
  const [isInvalid, setInvalid] = useState(false)

  const checkInvalid = () => setInvalid(p1?.current?.value !== p2?.current?.value)

  const submit = ev => {
    ev.preventDefault()
    mutate({ variables: { key, pass: p1.current.value } })
      .then(() => {
        toast.success('Password changed succesfully!')
        router.push('/')
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') console.log(err)
        toast.error('Failed to change password')
      })
  }

  return (
    <Col>
      <Form onSubmit={submit} className='site-form grayblock mx-auto my-5' style={{ maxWidth: '500px' }} >
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='username' style={{ color: 'black' }}>New password:</Form.Label>
              <Form.Control required type='password' name='password' ref={p1} onChange={checkInvalid} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='password' style={{ color: 'black' }}>Repeat new password:</Form.Label>
              <Form.Control required type='password' name='password' isInvalid={isInvalid} ref={p2} onChange={checkInvalid} />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col md={4} className='mx-auto'>
            <Button type='submit' className='w-100' color='primary'>{loading ? <Image {...loader} alt='loading' /> : 'Change password'}</Button>
          </Col>
        </Row>
      </Form>
    </Col>
  )
}
