import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { DateTime } from 'luxon'
import Image from 'next/legacy/image'
// import ConfettiExplosion from 'react-confetti-explosion'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'
import Head from 'next/head'

import { AlbumBoxList } from '@/components/AlbumBoxes'
import { initializeApollo } from '@/next/utils/ApolloClient'
import { BasicCommentCarrousel } from '@/components/CommentsCarrousel'
import { ButtonLoader } from '@/components/Loader'
import useUser from '@/next/utils/useUser'

const query = gql`
  query ($username: String!) {
    user(username: $username) {
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
  }
`

export async function getServerSideProps(context) {
  const { params } = context
  const { username } = params

  const client = initializeApollo()
  const { data } = await client.query({ query, variables: { username } })
  const { user } = data

  if (user === null)
    return { redirect: { destination: '/404', permanent: false } }

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

export default function Profile(props) {
  const { user } = useUser()
  const { userProfile } = props
  const { comments, favorites, imgUrl, placeholder, username } = userProfile
  const albumList = [...favorites]

  const [showProfile, setProfile] = useState(false)

  let floatDuration = DateTime.now().diff(
    DateTime.fromMillis(userProfile.createdAt),
    ['years', 'months']
  )
  Object.entries(floatDuration.values).forEach(([name, value]) => {
    floatDuration = floatDuration.set({ [name]: Math.floor(value) })
  })

  return (
    <>
      <Head>
        <meta key='url' property='og:url' content={`/profile/${username}`} />
        <meta
          key='desc'
          property='og:description'
          content={`${username}'s awesome cloud`}
        />
        <meta key='image' property='og:image' content={imgUrl} />
      </Head>
      {user?.username === username && (
        <EditProfile setProfile={setProfile} showProfile={showProfile} />
      )}
      <div className='container'>
        {/* <Explosion username={username} /> */}
        <div className='row mt-3'>
          <div className='col-auto blackblock'>
            <div
              className='p-1 position-relative'
              style={{ height: '200px', width: '200px' }}
            >
              <Image
                style={{ borderRadius: '25px' }}
                layout='fill'
                alt={'placeholder'}
                src={imgUrl}
                blurDataURL={placeholder}
              />
              {/* <img className='position-absolute' src='/img/assets/hat.png' style={{ height: '150px', width: '150px', top: '-70px', left: '25px', transform: 'rotate(10deg)' }}/>} */}
            </div>
          </div>
          <div className='col blackblock ms-3 my-0 d-flex justify-content-center flex-column'>
            <div className='row'>
              <div className='col-md-12'>
                <h1 className='text-center album-title'>{username}</h1>
              </div>
            </div>
            <div className='row my-1'>
              <div className='col d-flex justify-content-center'>
                <span className='fw-bold me-1'>Floating for:</span>
                <span>{floatDuration.toHuman()}</span>
              </div>
            </div>
            {user?.username === userProfile.username && (
              <div className='row mt-3'>
                <div className='col d-flex justify-content-center'>
                  <button
                    onClick={() => setProfile(true)}
                    className='btn btn-outline-light rounded-3'
                  >
                    Edit Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <BasicCommentCarrousel comments={comments} />

        <hr className='style2 style-white' />
        <div className='row'>
          <div className='col'>
            <h1
              style={{ fontSize: '45px' }}
              className='text-center homeTitle py-2'
              id='last-releases'
            >
              Favorites
            </h1>
          </div>
        </div>
        <div className='row justify-content-center'>
          <AlbumBoxList colProps={{ md: 3, xs: 6 }} items={albumList} />
        </div>
      </div>
    </>
  )
}

const userMutation = gql`
  mutation updateUser(
    $username: String
    $password: String
    $email: String
    $pfp: Upload
  ) {
    updateUser(
      username: $username
      password: $password
      email: $email
      pfp: $pfp
    )
  }
`

function EditProfile(props) {
  const { showProfile, setProfile } = props
  const { user, refetch } = useUser()
  const [mutateUser, { loading: loadingUser }] = useMutation(userMutation)

  const handleUpdateUser = (ev) => {
    ev.preventDefault()

    const variables = serialize(ev.target, { hash: true })
    variables.pfp = ev.target.elements.pfp.files[0]

    mutateUser({ variables })
      .then(() => {
        toast.success('User updated succesfully!')
        refetch()
        setProfile(false)
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') console.log(err)
        toast.error('Failed to update user')
      })
  }

  return (
    <>
      <div
        className={`modal ${showProfile ? 'show' : ''}`}
        style={{ display: showProfile ? 'block' : 'none' }}
        tabIndex='-1'
      >
        <div className='modal-dialog modal-centered'>
          <div className='modal-content'>
            <div className='modal-body m-3'>
              <form onSubmit={handleUpdateUser}>
                <div className='row'>
                  <div className='col'>
                    <div className='form-group'>
                      <label htmlFor='username' style={{ color: 'black' }}>
                        Username:
                      </label>
                      <input
                        type='text'
                        name='username'
                        value={user?.username}
                        readOnly
                        className='form-control'
                      />
                    </div>
                  </div>

                  <div className='col'>
                    <div className='form-group'>
                      <label htmlFor='email' style={{ color: 'black' }}>
                        Email:
                      </label>
                      <input
                        type='text'
                        name='email'
                        defaultValue={user?.email}
                        className='form-control'
                      />
                    </div>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col'>
                    <div className='form-group'>
                      <label htmlFor='password' style={{ color: 'black' }}>
                        Password (empty to keep it unchanged):
                      </label>
                      <input
                        type='password'
                        name='password'
                        className='form-control'
                      />
                    </div>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col'>
                    <div className='form-group'>
                      <label htmlFor='pfp' style={{ color: 'black' }}>
                        Profile pic:
                      </label>
                      <input type='file' name='pfp' className='form-control' />
                    </div>
                  </div>
                </div>
                <div className='row mt-4'>
                  <div className='col-md-6 mx-auto'>
                    <ButtonLoader
                      loading={loadingUser}
                      type='submit'
                      className='btn btn-primary w-100'
                    >
                      Update User
                    </ButtonLoader>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
