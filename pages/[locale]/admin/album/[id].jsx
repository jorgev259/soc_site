import { useState, useEffect, useRef } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { Col, Row, Form, FormControl, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'

import {
  AlbumSelector,
  GameSelector,
  PlatformSelector,
  AnimSelector,
  SimpleSelector
} from '@/components/Selectors'
import {
  Navigation,
  SharedForms,
  DiscList,
  StoreDownloads,
  Downloads
} from '@/components/SharedForms'
import SubmitButton from '@/next/components/common/SubmitButton'
import RequestCheck from '@/components/RequestCheck'
import { ButtonLoader } from '@/components/Loader'

import useUser from '@/next/utils/useUser'
import { initializeApollo } from '@/next/utils/ApolloClient'
import { prepareForm } from '@/next/utils/form'

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const query = gql`
  query Album($id: ID!) {
    album(id: $id) {
      id
      title
      subTitle
      releaseDate
      vgmdb
      description
      status
      platforms {
        value: id
        label: name
      }
      animations {
        value: id
        label: title
      }
      games {
        value: slug
        label: name
      }
      artists {
        slug
        name
      }
      categories {
        value: name
        label: name
      }
      classifications {
        value: name
        label: name
      }
      stores {
        url
        provider
      }
      discs {
        number
        tracks
      }
      related {
        value: id
        label: title
      }
    }

    categories {
      value: name
      label: name
    }
    classifications {
      value: name
      label: name
    }
  }
`

const queryDownload = gql`
  query downloads($id: ID!) {
    downloads(id: $id) {
      id
      title
      small
      links {
        id
        url
        provider
        custom
        directUrl
      }
    }
  }
`

export const getServerSideProps = async ({ params }) => {
  const { id } = params

  /* const {username} = req.session
  const user = username ? await db.models.user.findByPk(username) : null

  if (!user) return { redirect: { destination: '/500', permanent: false } } */

  const client = initializeApollo()
  const { data } = await client.query({ query, variables: { id } })
  const { album, categories, classifications } = data

  if (album === null)
    return { redirect: { destination: '/404', permanent: false } }

  return {
    props: { id, album, categories, classifications } /*, revalidate: 60 */
  }
}

const mutation = gql`
  mutation updateAlbum(
    $id: ID!
    $title: String
    $subTitle: String
    $cover: Upload
    $releaseDate: String
    $label: String
    $description: String
    $downloads: [DownloadInput]
    $artists: [String]
    $categories: [String]
    $classifications: [String]
    $platforms: [ID]
    $games: [String]
    $animations: [ID]
    $discs: [DiscInput]
    $related: [ID]
    $stores: [StoreInput]
    $vgmdb: String
    $status: String!
    $request: ID
  ) {
    updateAlbum(
      id: $id
      title: $title
      subTitle: $subTitle
      cover: $cover
      releaseDate: $releaseDate
      label: $label
      description: $description
      downloads: $downloads
      artists: $artists
      categories: $categories
      classifications: $classifications
      platforms: $platforms
      games: $games
      animations: $animations
      discs: $discs
      related: $related
      stores: $stores
      vgmdb: $vgmdb
      status: $status
      request: $request
    ) {
      id
    }
  }
`

const vgmQuery = gql`
  query ($url: String!) {
    vgmdb(url: $url) {
      title
      subTitle
      releaseDate
      artists
      categories
      classifications
      trackList {
        number
        tracks
      }
    }
  }
`

export default function EditAlbum(props) {
  return (
    <Container fluid>
      <Row>
        <Col xs={2}>
          <Navigation title='Edit' />
        </Col>
        <Col xs={10}>
          <EditAlbumForm {...props} />
          <SharedForms />
        </Col>
      </Row>
    </Container>
  )
}

function EditAlbumForm({ id, album, categories, classifications }) {
  const [currentCategories, setCategories] = useState(album.categories || [])
  const [currentClassifications, setClassifications] = useState(
    album.classifications || []
  )

  const [vgmTracklist, setVgmTracklist] = useState(album.discs || [])

  const [mutate, { loading }] = useMutation(mutation)

  const { user } = useUser()
  const { data, refetch } = useQuery(queryDownload, { variables: { id } })
  useEffect(() => {
    refetch({ id })
  }, [user, id, refetch])

  const [getVgmdb, { loading: loadingFetch }] = useLazyQuery(vgmQuery)
  const titleRef = useRef(null)
  const releaseRef = useRef(null)
  const vgmdbRef = useRef(null)
  const subTitleRef = useRef(null)
  const artistsRef = useRef(null)

  function handleSubmitForm(e) {
    e.persist()
    e.preventDefault()
    const formData = prepareForm(e)
    formData.id = album.id

    mutate({ mutation, variables: formData })
      .then((results) => {
        toast.success(`Updated "${formData.title}" succesfully!`)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  async function fetchInfo() {
    const { data } = await getVgmdb({
      variables: { url: vgmdbRef.current.value }
    })

    if (data?.vgmdb) {
      const { vgmdb } = data
      const {
        title,
        subTitle,
        releaseDate,
        artists,
        categories,
        classifications,
        trackList
      } = vgmdb

      releaseRef.current.value = releaseDate
      titleRef.current.value = title
      subTitleRef.current.value = subTitle
      artistsRef.current.value = artists.join(',')

      setCategories(categories)
      setClassifications(classifications)
      setVgmTracklist(trackList)
    }
  }

  return (
    <>
      <div id='addAlbum' className='mb-2 mt-3'>
        Editing {`"${album.title}"`} ({album.id})
      </div>
      <Form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label htmlFor='title'>Title:</Form.Label>
              <FormControl
                ref={titleRef}
                required
                type='text'
                name='title'
                defaultValue={album.title}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label htmlFor='subTitle'>Sub Title:</Form.Label>
              <FormControl
                ref={subTitleRef}
                as='textarea'
                name='subTitle'
                defaultValue={album.subTitle}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label htmlFor='releaseDate'>Release Date:</Form.Label>
              <FormControl
                ref={releaseRef}
                required
                type='date'
                name='releaseDate'
                defaultValue={album.releaseDate}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label htmlFor='label'>Label:</Form.Label>
              <FormControl
                type='text'
                name='label'
                defaultValue={album.label}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <Form.Group>
              <Form.Label htmlFor='status'>Status:</Form.Label>
              <SimpleSelector
                isSingle
                required
                name='status'
                defaultValue={{
                  value: album.status,
                  label: capitalize(album.status)
                }}
                options={['Show', 'Hidden', 'Coming'].map((label) => ({
                  label,
                  value: label.toLowerCase()
                }))}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='title'>Description:</Form.Label>
              <FormControl
                as='textarea'
                name='description'
                defaultValue={album.description}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='cover'>Cover:</Form.Label>
              <FormControl name='cover' type='file' accept='image/*' />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='vgmdb'>VGMdb:</Form.Label>
              <FormControl
                ref={vgmdbRef}
                defaultValue={album.vgmdb}
                name='vgmdb'
                type='text'
              />
            </Form.Group>
          </Col>
          <Col className='mt-auto'>
            <ButtonLoader
              color='primary'
              loading={loadingFetch}
              onClick={fetchInfo}
            >
              Fetch info
            </ButtonLoader>
          </Col>
          <Col></Col>
        </Row>
        <hr className='style2 style-white' />
        <Row className='mb-3'>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='artists'>Artists:</Form.Label>
              <FormControl
                ref={artistsRef}
                name='artists'
                as='textarea'
                defaultValue={album.artists.map((a) => a.name).join(',')}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='categories'>Categories:</Form.Label>
              <SimpleSelector
                defaultValue={album.categories}
                required
                name='categories'
                options={categories}
                onChange={(values) => setCategories(values)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='classifications'>
                Classifications:
              </Form.Label>
              <SimpleSelector
                required
                name='classifications'
                defaultValue={currentClassifications}
                options={classifications}
                onChange={(values) => setClassifications(values)}
              />
            </Form.Group>
          </Col>
        </Row>

        <hr className='style2 style-white' />

        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='games'>Games:</Form.Label>
              <GameSelector
                options={{ defaultValue: album.games, name: 'games' }}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='platforms'>Platforms:</Form.Label>
              <PlatformSelector
                categories={currentCategories.map((c) => c.value)}
                options={{ defaultValue: album.platforms, name: 'platforms' }}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='animations'>Animations:</Form.Label>
              <AnimSelector
                options={{ defaultValue: album.animations, name: 'animations' }}
              />
            </Form.Group>
          </Col>
        </Row>
        <hr className='style2 style-white' />
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label htmlFor='related'>Related albums:</Form.Label>
              <AlbumSelector
                options={{ defaultValue: album.related, name: 'related' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <hr className='style2 style-white' />
        <DiscList defaults={vgmTracklist} />
        <hr className='style2 style-white' />
        <StoreDownloads defaults={album.stores} />
        <hr className='style2 style-white' />
        <RequestCheck element={vgmdbRef.current} />
        <hr className='style2 style-white' />

        {data && <Downloads defaults={data.downloads} />}

        <Row>
          <Col className='m-auto'>
            <SubmitButton loading={loading} type='submit' color='primary'>
              Save Changes
            </SubmitButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}
