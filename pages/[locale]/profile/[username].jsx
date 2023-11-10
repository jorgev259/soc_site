import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Container, Col, Row, Modal, Form, Button } from 'react-bootstrap'
import { DateTime } from 'luxon'
import Image from "next/legacy/image";
// import ConfettiExplosion from 'react-confetti-explosion'

import { AlbumBoxList } from '@/components/AlbumBoxes'
import { initializeApollo } from '@/components/ApolloClient'
import { BasicCommentCarrousel } from '@/components/CommentsCarrousel'
import { ButtonLoader } from '@/components/Loader'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'
import useUser from '@/components/useUser'
import Head from 'next/head'

const query = gql`
    query ($username: String!) {
      user(username: $username){
        username
        createdAt
        placeholder
        imgUrl
        comments {
          text
          album {
            id
            title
          }
        }
        favorites {
          id
          title
          releaseDate
          createdAt
          placeholder
        }
      }
    }`

export async function getServerSideProps (context) {
  const { params } = context
  const { username } = params

  const client = initializeApollo()
  const { data } = await client.query({ query, variables: { username } })
  const { user } = data

  if (user === null) return { redirect: { destination: '/404', permanent: false } }

  return { props: { userProfile: user } }
}

/* function Explosion (props) {
  const { username } = props
  const [isExploding] = useState(username === 'ChitoWarlock')

  return (
    <div className='h-100 w-100' style={{ position: 'absolute', pointerEvents: 'none' }}>
      {isExploding && <ConfettiExplosion floorHeight={2000} floorWidth={2000} particleCount={250} />}
    </div>
  )
} */

export default function Profile (props) {
  const { user } = useUser()
  const { userProfile } = props
  const { comments, favorites, imgUrl, placeholder, username } = userProfile
  const albumList = [...favorites]

  const [showProfile, setProfile] = useState(false)

  let floatDuration = DateTime.now().diff(DateTime.fromMillis(userProfile.createdAt), ['years', 'months'])
  Object.entries(floatDuration.values).forEach(([name, value]) => {
    floatDuration = floatDuration.set({ [name]: Math.floor(value) })
  })

  return (
    <>
      <Head>
        <meta key='url' property='og:url' content={`/profile/${username}`} />
        <meta key='desc' property='og:description' content={`${username}'s awesome cloud`}/>
        <meta key='image' property='og:image' content={imgUrl} />
      </Head>
      {user?.username === username && <EditProfile setProfile={setProfile} showProfile={showProfile} />}
      <Container>
        {/* <Explosion username={username} /> */}
        <Row className='mt-3'>
          <Col xs='auto' className='blackblock'>
            <div className='p-1 position-relative' style={{ height: '200px', width: '200px' }}>
              <Image style={{ borderRadius: '25px' }} layout='fill' alt={'placeholder'} src={imgUrl} blurDataURL={placeholder} />
              {/* <img className='position-absolute' src='/img/assets/hat.png' style={{ height: '150px', width: '150px', top: '-70px', left: '25px', transform: 'rotate(10deg)' }}/>} */}
            </div>
          </Col>
          <Col className='blackblock ms-3 my-0 d-flex justify-content-center flex-column'>
            <Row>
              <Col md={12}>
                <h1 className='text-center album-title'>{username}</h1>
              </Col>
            </Row>
            <Row className='my-1'>
              <Col className='d-flex justify-content-center'>
                <span className='fw-bold me-1'>Floating for:</span>
                <span>{floatDuration.toHuman()}</span>
              </Col>
            </Row>
            {user?.username === userProfile.username && (
              <Row className='mt-3'>
                <Col className='d-flex justify-content-center'>
                  <Button onClick={() => setProfile(true)} className='rounded-3' variant="outline-light">Edit Account</Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        <BasicCommentCarrousel comments={comments} />

        <hr className='style2 style-white' />
        <Row>
          <Col>
            <h1 style={{ fontSize: '45px' }} className='text-center homeTitle py-2' id='last-releases'>Favorites</h1>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <AlbumBoxList colProps={{ md: 3, xs: 6 }} items={albumList.sort((a, b) => a.title > b.title)} />
        </Row>
      </Container>
    </>
  )
}

const userMutation = gql`
  mutation updateUser($username: String, $password: String, $email: String, $pfp: Upload){
    updateUser(username: $username, password: $password, email: $email, pfp: $pfp)
  }
`

function EditProfile (props) {
  const { showProfile, setProfile } = props
  const { user, refetch } = useUser()
  const [mutateUser, { loading: loadingUser }] = useMutation(userMutation)

  const handleUpdateUser = ev => {
    ev.preventDefault()

    const variables = serialize(ev.target, { hash: true })
    variables.pfp = ev.target.elements.pfp.files[0]

    mutateUser({ variables })
      .then(() => {
        toast.success('User updated succesfully!')
        refetch()
        setProfile(false)
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') console.log(err)
        toast.error('Failed to update user')
      })
  }

  return (
    <>
      <Modal show={showProfile} centered onHide={() => setProfile(false)}>
        <Modal.Body className='m-3'>
          <Form onSubmit={handleUpdateUser}>
            <Row>
              <Form.Group as={Col} >
                <Form.Label htmlFor='username' style={{ color: 'black' }}>Username:</Form.Label>
                <Form.Control type='text' name='username' value={user?.username} readOnly/>
              </Form.Group>

              <Form.Group as={Col} >
                <Form.Label htmlFor='email' style={{ color: 'black' }}>Email:</Form.Label>
                <Form.Control type='text' name='email' defaultValue={user?.email} />
              </Form.Group>
            </Row>
            <Row className='mt-3'>
              <Form.Group as={Col} >
                <Form.Label htmlFor='password' style={{ color: 'black' }}>Password (empty to keep it unchanged):</Form.Label>
                <Form.Control type='password' name='password' />
              </Form.Group>
            </Row>
            <Row className='mt-3'>
              <Form.Group as={Col} >
                <Form.Label htmlFor='pfp' style={{ color: 'black' }}>Profile pic:</Form.Label>
                <Form.Control type='file' name='pfp' />
              </Form.Group>
            </Row>
            <Row className='mt-4'>
              <Col md={6} className='mx-auto'>
                <ButtonLoader loading={loadingUser} type='submit' className='w-100' color='primary'>Update User</ButtonLoader>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
