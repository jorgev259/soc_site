import { useEffect, useRef } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import serialize from 'form-serialize'
import { AnimSelector, StudioSelector } from '../Selectors'
import SubmitButton from '@/next/components/common/SubmitButton'
import { toast } from 'react-toastify'

const query = gql`
  query Anim($id: ID!) {
    animation(id: $id) {
      title
      subTitle
      releaseDate
      studios {
        value: slug
        label: name
      }
    }
  }
`

const mutationUpdate = gql`
  mutation UpdateAnimation(
    $id: ID!
    $cover: Upload
    $subTitle: String
    $releaseDate: String
    $title: String
    $studios: [String]
  ) {
    updateAnimation(
      id: $id
      title: $title
      subTitle: $subTitle
      studios: $studios
      releaseDate: $releaseDate
      cover: $cover
    ) {
      id
    }
  }
`
const mutationDelete = gql`
  mutation DeleteAnimation($id: ID!) {
    deleteAnimation(id: $id)
  }
`

export default function AddAnimation() {
  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)
  const [getAnim, { data, error, loading: loadingInfo }] = useLazyQuery(query)

  useEffect(() => {
    if (!error) return
    console.log(error)
    toast.error(error.message, { autoclose: false })
  }, [error])

  function handleSubmitForm(mutate, verb) {
    const target = formRef.current
    const animation = serialize(target, { hash: true })
    animation.cover = target.elements.cover.files[0]
    animation.releaseDate = new Date(animation.releaseDate)
      .toISOString()
      .substring(0, 10)

    mutate({ variables: animation })
      .then((results) => {
        toast.success(`${verb} "${animation.title}" animation succesfully!`)
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='editAnim' className='mb-2 mt-3'>
        Edit Animation
      </div>
      <form className='site-form blackblock' ref={formRef}>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='name'>Animation:</label>
              <AnimSelector
                options={{
                  isSingle: true,
                  name: 'id',
                  loading: loadingInfo,
                  onChange: (row) => getAnim({ variables: { id: row.value } })
                }}
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='name'>Title:</label>
              <input
                type='text'
                name='title'
                className='form-control'
                defaultValue={data && data.animation.title}
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='name'>Sub-title:</label>
              <input
                type='text'
                name='subTitle'
                className='form-control'
                defaultValue={data && data.animation.subTitle}
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label htmlFor='releaseDate'>Release Date:</label>
              <input
                type='date'
                name='releaseDate'
                className='form-control'
                defaultValue={data && data.animation.releaseDate}
              />
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label htmlFor='studios'>Studios:</label>
              <StudioSelector
                options={{
                  name: 'studios',
                  defaultValue: data?.animation.studios ?? []
                }}
              />
            </div>
          </div>
          <div className='col'>
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
              Delete Animation
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  )
}
