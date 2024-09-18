import { useState, useRef } from 'react'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'
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
  Downloads,
  StoreDownloads,
  DiscList
} from '@/components/SharedForms'
import SubmitButton from '@/next/components/common/SubmitButton'
import { hasRolePage } from '@/next/utils/resolversPages'
import { prepareForm } from '@/next/utils/form'
import { ButtonLoader } from '@/components/Loader'
import RequestCheck from '@/components/RequestCheck'

export const getServerSideProps = hasRolePage(['CREATE'])

export default function AddAlbumPage() {
  return (
    <div className='row'>
      <div className='col-2'>
        <Navigation title='Add' />
      </div>
      <div className='col-10'>
        <AddAlbum />
        <SharedForms />
      </div>
    </div>
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
    createAlbum(
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

function AddAlbum(props) {
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

  const [addMutation, { loading }] = useMutation(mutation, {
    refetchQueries: 'searchAlbum'
  })

  async function handleSubmitForm(e) {
    e.persist()
    e.preventDefault()
    const data = prepareForm(e)

    addMutation({ variables: data })
      .then((results) => {
        toast.success(`Added "${data.title}" succesfully!`)
        e.target.reset()
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
        Add Album
      </div>
      <form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <div className='row'>
          <div className='col-md-3'>
            <div className='form-group'>
              <label htmlFor='title'>Title:</label>
              <input
                ref={titleRef}
                required
                type='text'
                name='title'
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-3'>
            <div className='form-group'>
              <label htmlFor='subTitle'>Sub Title:</label>
              <textarea
                ref={subTitleRef}
                name='subTitle'
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-3'>
            <div className='form-group'>
              <label htmlFor='releaseDate'>Release Date:</label>
              <input
                ref={releaseRef}
                required
                type='date'
                name='releaseDate'
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-3'>
            <div className='form-group'>
              <label htmlFor='label'>Label:</label>
              <input type='text' name='label' className='form-control' />
            </div>
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col'>
            <div className='form-group'>
              <label htmlFor='status'>Status:</label>
              <SimpleSelector
                isSingle
                required
                name='status'
                defaultValue={{ value: 'show', label: 'Show' }}
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
              <label htmlFor='title'>Description:</label>
              <textarea name='description' className='form-control' />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='cover'>Cover:</label>
              <input
                required
                name='cover'
                type='file'
                accept='image/*'
                className='form-control'
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='vgmdb'>VGMdb:</label>
              <input
                ref={vgmdbRef}
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
              <label htmlFor='artists'>Artists:</label>
              <textarea
                ref={artistsRef}
                name='artists'
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='categories'>Categories:</label>
              <SimpleSelector
                required
                name='categories'
                defaultValue={currentCategories.map((c) => ({
                  value: c,
                  label: c
                }))}
                options={categories.map((c) => ({
                  value: c.name,
                  label: c.name
                }))}
                onChange={(values) => setCategories(values.map((v) => v.value))}
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='classifications'>Classifications:</label>
              <SimpleSelector
                required
                name='classifications'
                defaultValue={currentClassifications.map((c) => ({
                  value: c,
                  label: c
                }))}
                options={classifications.map((c) => ({
                  value: c.name,
                  label: c.name
                }))}
                onChange={(values) =>
                  setClassifications(values.map((v) => v.value))
                }
              />
            </div>
          </div>
        </div>

        <hr className='style2 style-white' />

        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='games'>Games:</label>
              <GameSelector options={{ name: 'games' }} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='platforms'>Platforms:</label>
              <PlatformSelector
                categories={currentCategories}
                options={{ name: 'platforms' }}
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='animations'>Animations:</label>
              <AnimSelector options={{ name: 'animations' }} />
            </div>
          </div>
        </div>

        <hr className='style2 style-white' />

        <div className='row'>
          <div className='col-md-12'>
            <div className='form-group'>
              <label htmlFor='related'>Related albums:</label>
              <AlbumSelector options={{ name: 'related' }} />
            </div>
          </div>
        </div>
        <hr className='style2 style-white' />
        <DiscList defaults={vgmTracklist} />
        <hr className='style2 style-white' />
        <StoreDownloads />
        <hr className='style2 style-white' />
        <Downloads
          defaults={[
            {
              title: 'MP3',
              small: false,
              links: [
                { url: '', url2: '', provider: 'MEGA', custom: null, directUrl: '' },
                { url: '', url2: '', provider: 'MEDIAFIRE', custom: null, directUrl: '' },
                { url: '', url2: '', provider: 'TERABOX', custom: null, directUrl: '' }
              ]
            },
            {
              title: 'FLAC',
              small: false,
              links: [
                { url: '', url2: '', provider: 'MEGA', custom: null, directUrl: '' },
                { url: '', url2: '', provider: 'MEDIAFIRE', custom: null, directUrl: '' },
                { url: '', url2: '', provider: 'TERABOX', custom: null, directUrl: '' }
              ]
            },
            {
              title: 'FLAC Hi-Res',
              small: false,
              links: [
                { url: '', url2: '', provider: 'MEGA', custom: null, directUrl: '' },
                { url: '', url2: '', provider: 'MEDIAFIRE', custom: null, directUrl: '' },
                { url: '', url2: '', provider: 'TERABOX', custom: null, directUrl: '' }
              ]
            }
          ]}
        />
        <hr className='style2 style-white' />
        <RequestCheck element={vgmdbRef.current} />
        <hr className='style2 style-white' />

        <div className='row mb-2'>
          <div className='col-auto pe-0'>
            <SubmitButton loading={loading} type='submit' color='primary'>
              Add Album
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  )
}
