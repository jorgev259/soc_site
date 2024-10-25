import { useState, useEffect, useRef } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'
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
        url2
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
    props: { id, album, categories, classifications }
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
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-2'>
          <Navigation title='Edit' />
        </div>
        <div className='col-10'>
          <EditAlbumForm {...props} />
          <SharedForms />
        </div>
      </div>
    </div>
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
        Editing &quot;{album.title}&quot; ({album.id})
      </div>
      <form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <div className='row'>
          <div className='col-md-3'>
            <div className='form-group'>
              <label for='title'>Title:</label>
              <input
                ref={titleRef}
                required
                type='text'
                name='title'
                defaultValue={album.title}
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-3'>
            <div className='form-group'>
              <label for='subTitle'>Sub Title:</label>
              <textarea
                ref={subTitleRef}
                name='subTitle'
                defaultValue={album.subTitle}
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-3'>
            <div className='form-group'>
              <label for='releaseDate'>Release Date:</label>
              <input
                ref={releaseRef}
                required
                type='date'
                name='releaseDate'
                defaultValue={album.releaseDate}
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-3'>
            <div className='form-group'>
              <label for='label'>Label:</label>
              <input
                type='text'
                name='label'
                defaultValue={album.label}
                className='form-control'
              />
            </div>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col'>
            <div className='form-group'>
              <label for='status'>Status:</label>
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
            </div>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label for='title'>Description:</label>
              <textarea
                name='description'
                defaultValue={album.description}
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label for='cover'>Cover:</label>
              <input
                name='cover'
                type='file'
                accept='image/*'
                className='form-control-file'
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label for='vgmdb'>VGMdb:</label>
              <input
                ref={vgmdbRef}
                defaultValue={album.vgmdb}
                name='vgmdb'
                type='text'
                className='form-control'
              />
            </div>
          </div>
          <div className='col mt-auto'>
            <ButtonLoader
              color='primary'
              loading={loadingFetch}
              onClick={fetchInfo}
            >
              Fetch info
            </ButtonLoader>
          </div>
          <div className='col'></div>
        </div>
        <hr className='style2 style-white' />
        <div className='row mb-3'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label for='artists'>Artists:</label>
              <textarea
                ref={artistsRef}
                name='artists'
                defaultValue={album.artists.map((a) => a.name).join(',')}
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label for='categories'>Categories:</label>
              <SimpleSelector
                defaultValue={album.categories}
                required
                name='categories'
                options={categories}
                onChange={(values) => setCategories(values)}
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label for='classifications'>Classifications:</label>
              <SimpleSelector
                required
                name='classifications'
                defaultValue={currentClassifications}
                options={classifications}
                onChange={(values) => setClassifications(values)}
              />
            </div>
          </div>
        </div>

        <hr className='style2 style-white' />

        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label for='games'>Games:</label>
              <GameSelector
                options={{ defaultValue: album.games, name: 'games' }}
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label for='platforms'>Platforms:</label>
              <PlatformSelector
                categories={currentCategories.map((c) => c.value)}
                options={{ defaultValue: album.platforms, name: 'platforms' }}
              />
            </div>
          </div>

          <div className='col-md-4'>
            <div className='form-group'>
              <label for='animations'>Animations:</label>
              <AnimSelector
                options={{ defaultValue: album.animations, name: 'animations' }}
              />
            </div>
          </div>
        </div>
        <hr className='style2 style-white' />
        <div className='row'>
          <div className='col-md-12'>
            <div className='form-group'>
              <label for='related'>Related albums:</label>
              <AlbumSelector
                options={{ defaultValue: album.related, name: 'related' }}
              />
            </div>
          </div>
        </div>

        <hr className='style2 style-white' />
        <DiscList defaults={vgmTracklist} />
        <hr className='style2 style-white' />
        <StoreDownloads defaults={album.stores} />
        <hr className='style2 style-white' />
        <RequestCheck element={vgmdbRef.current} />
        <hr className='style2 style-white' />

        {data && <Downloads defaults={data.downloads} />}

        <div className='row'>
          <div className='col m-auto'>
            <SubmitButton loading={loading} type='submit' color='primary'>
              Save Changes
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  )
}
