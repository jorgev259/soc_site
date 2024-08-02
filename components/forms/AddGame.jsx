import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import {
  SeriesSelector,
  PublisherSelector,
  PlatformSelector
} from '../Selectors'
import { slugify } from '@/server/utils/slugify'
import SubmitButton from '@/next/components/common/SubmitButton'

const mutation = gql`
  mutation CreateGame(
    $cover: Upload!
    $releaseDate: String!
    $slug: String!
    $name: String!
    $series: [String]!
    $publishers: [ID]!
    $platforms: [ID]
  ) {
    createGame(
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

export default function AddGame() {
  const [slug, setSlug] = useState('')
  const [mutate, { loading }] = useMutation(mutation)

  function handleSubmitForm(e) {
    e.preventDefault()
    e.persist()
    const game = serialize(e.target, { hash: true })
    game.cover = e.target.elements.cover.files[0]
    game.releaseDate = new Date(game.releaseDate).toISOString().substring(0, 10)

    if (!game.series) game.series = []
    if (!game.publishers) game.publishers = []
    if (!game.platforms) game.platforms = []

    mutate({ mutation, variables: game })
      .then((results) => {
        toast.success(`Added "${game.name}" game successfully!`)
        e.target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='addGame' className='mb-2 mt-3'>
        Add Game
      </div>
      <form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='slug'>Slug:</label>
              <input
                type='text'
                name='slug'
                readOnly
                value={slug}
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                name='name'
                onChange={(e) => setSlug(slugify(e.target.value))}
                className='form-control'
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='releaseDate'>Release Date:</label>
              <input type='date' name='releaseDate' className='form-control' />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='series'>Series:</label>
              <SeriesSelector options={{ name: 'series' }} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='publishers'>Publishers:</label>
              <PublisherSelector options={{ name: 'publishers' }} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='platforms'>Platforms:</label>
              <PlatformSelector
                categories={['Game']}
                options={{ name: 'platforms' }}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='cover'>Cover:</label>
              <input
                name='cover'
                type='file'
                accept='image/*'
                className='form-control'
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col m-auto'>
            <SubmitButton loading={loading} type='submit' color='primary'>
              Add Game
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  )
}
