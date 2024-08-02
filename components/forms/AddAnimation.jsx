import { gql, useMutation } from '@apollo/client'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import SubmitButton from '@/next/components/common/SubmitButton'
import { StudioSelector } from '../Selectors'

const mutation = gql`
  mutation CreateAnimation(
    $cover: Upload
    $subTitle: String
    $releaseDate: String!
    $title: String!
    $studios: [String]!
  ) {
    createAnimation(
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

export default function AddAnimation() {
  const [mutate, { loading }] = useMutation(mutation)

  function handleSubmitForm(e) {
    e.preventDefault()
    e.persist()
    const animation = serialize(e.target, { hash: true })
    animation.cover = e.target.elements.cover.files[0]
    animation.releaseDate = new Date(animation.releaseDate)
      .toISOString()
      .substring(0, 10)

    mutate({ mutation, variables: animation })
      .then((results) => {
        toast.success(`Added "${animation.title}" animation successfully!`)
        e.target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='addAnim' className='mb-2 mt-3'>
        Add Animation
      </div>
      <form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='title'>Title:</label>
              <input type='text' name='title' className='form-control' />
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label htmlFor='subTitle'>Sub-title:</label>
              <input type='text' name='subTitle' className='form-control' />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='releaseDate'>Release Date:</label>
              <input type='date' name='releaseDate' className='form-control' />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='studios'>Studios:</label>
              <StudioSelector options={{ name: 'studios' }} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='cover'>Cover:</label>
              <input
                name='cover'
                type='file'
                accept='image/*'
                required
                className='form-control'
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col m-auto'>
            <SubmitButton loading={loading} type='submit' color='primary'>
              Add Animation
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  )
}
