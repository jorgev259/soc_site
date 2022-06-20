import { Col, Row, Form, FormControl } from 'react-bootstrap'
import { useRef, useState, useEffect } from 'react'
import { gql, useQuery, useMutation, useLazyQuery, useApolloClient } from '@apollo/client'
import { toast } from 'react-toastify'

import { AlbumSelector, GameSelector, PlatformSelector, AnimSelector, SimpleSelector, RequestSelector } from '@/components/Selectors'
import { Navigation, SharedForms, Downloads, StoreDownloads, DiscList } from '@/components/SharedForms'
import SubmitButton from '@/components/SubmitButton'
import { hasRolePage } from '@/components/resolvers'
import { prepareForm } from '@/components/utils'
import { ButtonLoader } from '@/components/Loader'

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

const queryClasses = gql`
      query {
        categories {
          name
        }
        classes {
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
      $classes: [String],
      $categories: [String],
      $platforms: [ID],
      $games: [String],
      $animations: [ID],
      $discs: [DiscInput],
      $related: [ID],
      $stores: [StoreInput],
      $vgmdb: String,
      $status: String!
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
        classes: $classes,
        categories: $categories,
        platforms: $platforms,
        games: $games,
        animations: $animations
        discs: $discs,
        related: $related,
        stores: $stores,
        vgmdb: $vgmdb,
        status: $status
      )
      {
        id
      }
    }
  `

const vgmQuery = gql`
  query ($search: String!){
    vgmdb(search: $search){
      vgmdbUrl
      name
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
  const [currentClasses, setClasses] = useState([])
  const [currentClassifications, setClassifications] = useState([])
  const [vgmTracklist, setVgmTracklist] = useState()

  const { data: classData = {} } = useQuery(queryClasses)
  const [getVgmdb, { loading: loadingFetch }] = useLazyQuery(vgmQuery)

  const { classes = [], categories = [] } = classData

  const formRef = useRef(null)
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
    const { data } = await getVgmdb({ variables: { search: vgmdbRef.current.value } })

    if (data?.vgmdb) {
      const { vgmdb } = data
      const { vgmdbUrl, name, subTitle, releaseDate, artists, categories, classifications, tracklist } = vgmdb

      releaseRef.current.value = releaseDate
      vgmdbRef.current.value = vgmdbUrl
      titleRef.current.value = name
      subTitleRef.current.value = subTitle
      artistsRef.current.value = artists.join(',')

      setClasses(categories)
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
              <Form.Label htmlFor='classes'>Classification:</Form.Label>
              <SimpleSelector
                required name='classes'
                defaultValue={currentClasses.map(c => ({ value: c, label: c }))}
                options={classes.map(c => ({ value: c.name, label: c.name }))}
                onChange={values => setClasses(values.map(v => v.value))}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='categories'>Categories:</Form.Label>
              <SimpleSelector
                required name='categories'
                defaultValue={currentClassifications.map(c => ({ value: c, label: c }))}
                options={categories.map(c => ({ value: c.name, label: c.name }))}
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
              <GameSelector name='games' />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='platforms'>Platforms:</Form.Label>
              <PlatformSelector classes={currentClasses} name='platforms' />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='animations'>Animations:</Form.Label>
              <AnimSelector name='animations' />
            </Form.Group>
          </Col>
        </Row>

        <hr className='style2 style-white' />

        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label htmlFor='related'>Related OSTs:</Form.Label>
              <AlbumSelector name='related' />
            </Form.Group>
          </Col>
        </Row>
        <hr className='style2 style-white' />
        <DiscList defaults={vgmTracklist}/>
        <hr className='style2 style-white' />
        <StoreDownloads />
        <hr className='style2 style-white' />
        <Downloads />
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

const requestQuery = gql`
  query ($link: String!) {
    request(link: $link) {
      value: id
      label: title
      state
    }
  }
`

function RequestCheck (props) {
  const { element } = props

  const client = useApolloClient()
  const [defaultValue, setDefaultValue] = useState()
  const [selected, setSelected] = useState()

  useEffect(() => {
    if (!element) return

    element.addEventListener('input', () => {
      client.query({ query: requestQuery, variables: { link: element.value } })
        .then(({ data }) => {
          if (data.request) {
            setDefaultValue(data.request)
            setSelected(data.request)
          }
        })
        .catch(err => {
          console.log(err)
          toast.error(err.message, { autoclose: false })
        })
    })
  }, [element])

  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor='request'>Request:</Form.Label>
        </Form.Group>
      </Row>
      <Row>
        <Col>
          <RequestSelector isSingle name='request' defaultValue={defaultValue} onChange={setSelected} />
        </Col>
        <Col className='d-flex align-items-center ps-0'>
          {selected && <span className="">{selected.state === 'complete' ? 'Request found!  Already complete tho ¯\\_(ツ)_/¯' : 'Request found!'}</span>}
        </Col>
      </Row>
    </>
  )
}
