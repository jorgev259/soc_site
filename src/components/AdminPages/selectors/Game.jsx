'use client'
import { useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { gql, useApolloClient } from '@apollo/client'
import { toast } from 'react-toastify'

import { mutateFormStatus } from '@/next/actions/graphql'
import { slugify } from '@/server/utils/slugify'

import MultiSelect from '@/next/components/common/MultiSelect'
import { ModalPortal, hideModal } from '../../common/Modal'
import PendingButton from '../../common/PendingButton'
import LoadingButton from '../../common/LoadingButton'

const startQuery = gql`
  query SearchRecentGames {
    searchGame(limit: 10) {
      rows {
        value: slug
        label: name
      }
    }
  }
`

const changeQuery = gql`
  query SearchGames($filter: String) {
    searchGame(name: $filter, limit: 20) {
      rows {
        value: slug
        label: name
      }
    }
  }
`

const createMutation = gql`
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

const updateMutation = gql`
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
const deleteMutation = gql`
  mutation DeleteGame($slug: String!) {
    deleteGame(slug: $slug)
  }
`

const addId = 'addGameModal'
const editId = 'editGameModal'

export default function GameSelector(props) {
  const [item, setItem] = useState()

  return (
    <>
      <AddGame item={item} />
      <EditGame item={item} />
      <MultiSelect
        {...props}
        startQuery={startQuery}
        changeQuery={changeQuery}
        addId={addId}
        editId={editId}
        setItem={setItem}
      />
    </>
  )
}

function AddGame(props) {
  const { item: name = '' } = props

  const [slug, setSlug] = useState(slugify(name))
  const client = useApolloClient()
  const [state, formAction] = useFormState(
    mutateFormStatus.bind(null, createMutation),
    { ok: null }
  )

  useEffect(() => {
    if (state.ok === null) return
    if (state.ok) {
      client.refetchQueries({
        include: ['SearchRecentStudios', 'SearchStudios']
      })
      toast.success(`Added "${name}" studio succesfully!`)
      hideModal(addId)
    } else {
      console.log(state.error)
      toast.error('Failed to add studio')
    }
  }, [client, name, state])

  return (
    <ModalPortal id={addId}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title'>Add Game</h5>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'
          ></button>
        </div>
        <form action={formAction}>
          <div className='modal-body'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-4'>
                  <label className='form-label' htmlFor='slug'>
                    Slug:
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    name='slug'
                    readOnly
                    value={slug}
                  />
                </div>
                <div className='col-md-4'>
                  <label className='form-label' htmlFor='name'>
                    Name:
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    name='name'
                    required
                    defaultValue={name}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                  />
                </div>
                <div className='col-md-4'>
                  <label className='form-label' htmlFor='releaseDate'>
                    Release Date:
                  </label>
                  <input
                    className='form-control'
                    required
                    type='date'
                    name='releaseDate'
                  />
                </div>
              </div>
              {/*
    <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='slug'>Slug:</Form.Label>
              <FormControl type='text' name='slug' readOnly value={slug} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='name'>Name:</Form.Label>
              <FormControl type='text' name='name' onChange={e => setSlug(slugify(e.target.value))} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='releaseDate'>Release Date:</Form.Label>
              <FormControl type='date' name='releaseDate' />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='series'>Series:</Form.Label>
              <SeriesSelector options={{ name: 'series' }} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='publishers'>Publishers:</Form.Label>
              <PublisherSelector options={{ name: 'publishers' }} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='platforms'>Platforms:</Form.Label>
              <PlatformSelector categories={['Game']} options={{ name: 'platforms' }} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label htmlFor='cover'>Cover:</Form.Label>
              <FormControl name='cover' type='file' accept='image/*' />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='m-auto'>
            <SubmitButton loading={loading} type='submit' color='primary'>Add Game</SubmitButton>
          </Col>
        </Row>
  */}
            </div>
          </div>
          <div className='modal-footer'>
            <div className='col-auto my-auto mx-1'>
              <PendingButton type='submit' className='btn-primary'>
                Add studio
              </PendingButton>
            </div>
          </div>
        </form>
      </div>
    </ModalPortal>
  )
}

function EditGame(props) {
  const { item = {} } = props
  const { value: slug = '', label: name = '' } = item

  const client = useApolloClient()
  const [state, formAction] = useFormState(
    mutateFormStatus.bind(null, updateMutation),
    { ok: null }
  )

  useEffect(() => {
    if (state.ok === null) return
    if (state.ok) {
      client.refetchQueries({
        include: ['SearchRecentStudios', 'SearchStudios']
      })
      toast.success('Updated studio succesfully!')
      hideModal(editId)
    } else {
      console.log(state.error)
      toast.error('Failed to edit studio')
    }
  }, [client, state])

  return (
    <ModalPortal id={editId}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h5 className='modal-title'>Edit &quot;{name}&quot;</h5>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'
          ></button>
        </div>
        <form action={formAction}>
          <div className='modal-body'>
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-6'>
                  <label className='form-label' htmlFor='slug'>
                    Slug:
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    name='slug'
                    readOnly
                    value={slug}
                  />
                </div>
                <div className='col-md-6'>
                  <label className='form-label' htmlFor='name'>
                    Name:
                  </label>
                  <input
                    className='form-control'
                    type='text'
                    name='name'
                    required
                    defaultValue={name}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <div className='col-auto my-auto mx-1'>
              <DeleteGame slug={slug} />
            </div>
            <div className='col-auto my-auto mx-1'>
              <PendingButton type='submit' className='btn-primary'>
                Save Changes
              </PendingButton>
            </div>
          </div>
        </form>
      </div>
    </ModalPortal>
  )
}

function DeleteGame(props) {
  const { slug } = props
  const formData = new FormData()
  formData.append('slug', slug)

  const client = useApolloClient()
  const [loading, setLoading] = useState(false)

  function handleDelete() {
    setLoading(true)
    mutateFormStatus(deleteMutation, {}, formData)
      .then(() => {
        client.refetchQueries({
          include: ['SearchRecentStudios', 'SearchStudios']
        })
        toast.success('Deleted studio succesfully!')
        hideModal(editId)
      })
      .catch((error) => {
        console.log(error)
        toast.error('Failed to delete studio')
      })
      .finally(() => setLoading(false))
  }

  return (
    <LoadingButton
      onClick={handleDelete}
      className='btn-primary'
      loading={loading}
    >
      Delete Studio
    </LoadingButton>
  )
}
