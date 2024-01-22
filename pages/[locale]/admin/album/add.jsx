import { Col, Row, Form, FormControl } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'
import { toast } from 'react-toastify'

import { AlbumSelector, GameSelector, PlatformSelector, AnimSelector, SimpleSelector } from '@/components/Selectors'
import { Navigation, SharedForms, Downloads, StoreDownloads, DiscList } from '@/components/SharedForms'
import SubmitButton from '@/next/components/server/SubmitButton'
import { hasRolePage } from '@/components/resolvers'
import { prepareForm } from '@/components/utils'
import { ButtonLoader } from '@/components/Loader'
import RequestCheck from '@/components/RequestCheck'

export const getServerSideProps = hasRolePage(['CREATE'])

export default function AddAlbumPage () {
  return (
    <Row>
      <Col xs={2}>
        <Navigation title='Add' />
      </Col>
      <Col xs={10}>
        <AddAlbum />
        <SharedForms />
      </Col>
    </Row>
  )
}

const queryCategories = gql`
  query {
    categories {
      name
    }
    classifications {
      name
    }     
  }
`

const mutation = gql`
    mutation createAlbum(
      $title: String,
      $subTitle: String,
      $cover: Upload,
      $releaseDate: String,
      $label: String,
      $description: String,
      $downloads: [DownloadInput],
      $artists: [String],
      $categories: [String],
      $classifications: [String],
      $platforms: [ID],
      $games: [String],
      $animations: [ID],
      $discs: [DiscInput],
      $related: [ID],
      $stores: [StoreInput],
      $vgmdb: String,
      $status: String!,
      $request: ID
    ){
      createAlbum(
        title: $title,
        subTitle: $subTitle,
        cover: $cover,
        releaseDate: $releaseDate,
        label: $label,
        description: $description,
        downloads: $downloads,
        artists: $artists,
        categories: $categories,
        classifications: $classifications,
        platforms: $platforms,
        games: $games,
        animations: $animations
        discs: $discs,
        related: $related,
        stores: $stores,
        vgmdb: $vgmdb,
        status: $status,
        request: $request
      )
      {
        id
      }
    }
  `

const vgmQuery = gql`
  query ($url: String!){
    vgmdb(url: $url){
      title
      subTitle
      releaseDate
      artists
      categories
      classifications
      tracklist {
        number
        body
      }
    }
  }
`

function AddAlbum (props) {
  const [currentCategories, setCategories] = useState([])
  const [currentClassifications, setClassifications] = useState([])
  const [vgmTracklist, setVgmTracklist] = useState()

  const { data: classData = {} } = useQuery(queryCategories)
  const [getVgmdb, { loading: loadingFetch }] = useLazyQuery(vgmQuery)

  const { categories = [], classifications = [] } = classData

  const titleRef = useRef(null)
  const releaseRef = useRef(null)
  const vgmdbRef = useRef(null)
  const subTitleRef = useRef(null)
  const artistsRef = useRef(null)

  const [addMutation, { loading }] = useMutation(mutation, { refetchQueries: 'searchAlbum' })

  async function handleSubmitForm (e) {
    e.persist()
    e.preventDefault()
    const data = prepareForm(e)

    addMutation({ variables: data })
      .then(results => {
        toast.success(`Added "${data.title}" succesfully!`)
        e.target.reset()
      }).catch(err => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  async function fetchInfo () {
    const { data } = await getVgmdb({ variables: { url: vgmdbRef.current.value } })

    if (data?.vgmdb) {
      const { vgmdb } = data
      const { title, subTitle, releaseDate, artists, categories, classifications, tracklist } = vgmdb

      releaseRef.current.value = releaseDate
      titleRef.current.value = title
      subTitleRef.current.value = subTitle
      artistsRef.current.value = artists.join(',')

      setCategories(categories)
      setClassifications(classifications)
      setVgmTracklist(tracklist)
    }
  }

  return (
    <>
      <div id='addAlbum' className='mb-2 mt-3'>Add Album</div>
      <Form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label htmlFor='title'>Title:</Form.Label>
              <FormControl ref={titleRef} required type='text' name='title' />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label htmlFor='subTitle'>Sub Title:</Form.Label>
              <FormControl ref={subTitleRef} as='textarea' name='subTitle' />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label htmlFor='releaseDate'>Release Date:</Form.Label>
              <FormControl ref={releaseRef} required type='date' name='releaseDate' />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label htmlFor='label'>Label:</Form.Label>
              <FormControl type='text' name='label' />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            <Form.Group>
              <Form.Label htmlFor='status'>Status:</Form.Label>
              <SimpleSelector isSingle required name='status' defaultValue={{ value: 'show', label: 'Show' }} options={['Show', 'Hidden', 'Coming'].map(label => ({ label, value: label.toLowerCase() }))} />
            </Form.Group>
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='title'>Description:</Form.Label>
              <FormControl as='textarea' name='description' />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='cover'>Cover:</Form.Label>
              <FormControl required name='cover' type='file' accept='image/*' />
            </Form.Group>
          </Col>
        </Row>
        <Row >
          <Col md={6}>
            <Form.Group>
              <Form.Label htmlFor='vgmdb'>VGMdb:</Form.Label>
              <FormControl ref={vgmdbRef} name='vgmdb' type='text' />
            </Form.Group>
          </Col>
          <Col className='mt-auto'>
            <ButtonLoader color='primary' loading={loadingFetch} onClick={fetchInfo}>Fetch info</ButtonLoader>
          </Col>
          <Col>

          </Col>
        </Row>
        <hr className='style2 style-white' />
        <Row className='mb-3'>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='artists'>Artists:</Form.Label>
              <FormControl ref={artistsRef} name='artists' as='textarea' />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='categories'>Categories:</Form.Label>
              <SimpleSelector
                required name='categories'
                defaultValue={currentCategories.map(c => ({ value: c, label: c }))}
                options={categories.map(c => ({ value: c.name, label: c.name }))}
                onChange={values => setCategories(values.map(v => v.value))}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='classifications'>Classifications:</Form.Label>
              <SimpleSelector
                required name='classifications'
                defaultValue={currentClassifications.map(c => ({ value: c, label: c }))}
                options={classifications.map(c => ({ value: c.name, label: c.name }))}
                onChange={values => setClassifications(values.map(v => v.value))}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row />

        <hr className='style2 style-white' />
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='games'>Games:</Form.Label>
              <GameSelector options={{ name: 'games' }} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='platforms'>Platforms:</Form.Label>
              <PlatformSelector categories={currentCategories} options={{ name: 'platforms' }} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='animations'>Animations:</Form.Label>
              <AnimSelector options={{ name: 'animations' }} />
            </Form.Group>
          </Col>
        </Row>

        <hr className='style2 style-white' />

        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label htmlFor='related'>Related albums:</Form.Label>
              <AlbumSelector options={{ name: 'related' }} />
            </Form.Group>
          </Col>
        </Row>
        <hr className='style2 style-white' />
        <DiscList defaults={vgmTracklist}/>
        <hr className='style2 style-white' />
        <StoreDownloads />
        <hr className='style2 style-white' />
        <Downloads defaults={[
          {
            title: 'MP3',
            small: false,
            links: [
              { url: '', provider: 'MEGA', custom: null, directUrl: '' },
              { url: '', provider: 'MEDIAFIRE', custom: null, directUrl: '' }
            ]
          },
          {
            title: 'FLAC',
            small: false,
            links: [
              { url: '', provider: 'MEGA', custom: null, directUrl: '' }
            ]
          }
        ]} />
        <hr className='style2 style-white' />
        <RequestCheck element={vgmdbRef.current} />
        <hr className='style2 style-white' />

        <Row className='mb-2'>
          <Col xs='auto' className='pe-0'>
            <SubmitButton loading={loading} type='submit' color='primary'>Add Album</SubmitButton>
          </Col>
        </Row>
      </Form>
    </>
  )
}
