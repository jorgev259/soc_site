import { useEffect, useRef } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import {
  SeriesSelector,
  PublisherSelector,
  PlatformSelector,
  GameSelector
} from '../Selectors'
import SubmitButton from '@/next/components/common/SubmitButton'

const query = gql`
  query Game($slug: String!) {
    game(slug: $slug) {
      name
      releaseDate
      publishers {
        value: id
        label: name
      }
      platforms {
        value: id
        label: name
      }
      series {
        value: slug
        label: name
      }
    }
  }
`

const mutationUpdate = gql`
  mutation UpdateGame(
    $cover: Upload
    $releaseDate: String
    $slug: String
    $name: String
    $series: [String]
    $publishers: [ID]
    $platforms: [ID]
  ) {
    updateGame(
      name: $name
      slug: $slug
      series: $series
      publishers: $publishers
      releaseDate: $releaseDate
      cover: $cover
      platforms: $platforms
    ) {
      slug
    }
  }
`
const mutationDelete = gql`
  mutation DeleteGame($slug: String!) {
    deleteGame(slug: $slug)
  }
`

export default function EditGame() {
  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)
  const [getGame, { data, loading, error }] = useLazyQuery(query)

  useEffect(() => {
    if (!error) return
    console.log(error)
    toast.error(error.message, { autoclose: false })
  }, [error])

  function handleSubmitForm(mutate, verb) {
    const target = formRef.current
    const game = serialize(target, { hash: true })

    game.cover = target.elements.cover.files[0]
    game.releaseDate = new Date(game.releaseDate).toISOString().substring(0, 10)

    mutate({ variables: game })
      .then((results) => {
        toast.success(`${verb} "${game.name}" game succesfully!`)
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='editGame' className='mb-2 mt-3'>
        Edit Game
      </div>
      <form className='site-form blackblock' ref={formRef}>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label htmlFor='slug'>Game:</label>
              <GameSelector
                options={{
                  isSingle: true,
                  required: true,
                  name: 'slug',
                  loading,
                  onChange: (row) => getGame({ variables: { slug: row.value } })
                }}
              />
            </div>
          </div>

          <div className='col'>
            <div className='form-group'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                name='name'
                className='form-control'
                defaultValue={data && data.game.name}
              />
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label htmlFor='releaseDate'>Release Date:</label>
              <input
                type='date'
                name='releaseDate'
                className='form-control'
                defaultValue={data && data.game.releaseDate}
              />
            </div>
          </div>
        </div>
        {data && (
          <div className='row'>
            <div className='col-md-4'>
              <div className='form-group'>
                <label htmlFor='series'>Series:</label>
                <SeriesSelector
                  options={{
                    loading,
                    name: 'series',
                    defaultValue: data?.game.series
                  }}
                />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label htmlFor='publishers'>Publishers:</label>
                <PublisherSelector
                  options={{
                    loading,
                    name: 'publishers',
                    defaultValue: data?.game.publishers
                  }}
                />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label htmlFor='platforms'>Platforms:</label>
                <PlatformSelector
                  categories={['Game']}
                  options={{
                    name: 'platforms',
                    defaultValue: data?.game.platforms
                  }}
                />
              </div>
            </div>
          </div>
        )}
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='cover'>Cover:</label>
              <input
                name='cover'
                type='file'
                className='form-control'
                accept='image/*'
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-auto my-auto mx-1'>
            <SubmitButton
              type='button'
              onClick={() => handleSubmitForm(mutateUpdate, 'Edited')}
              loading={loadingUpdate}
            >
              Save Changes
            </SubmitButton>
          </div>
          <div className='col-xs-auto my-auto mx-1'>
            <SubmitButton
              type='button'
              onClick={() => handleSubmitForm(mutateDelete, 'Deleted')}
              loading={loadingDelete}
            >
              Delete Game
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  )
}
