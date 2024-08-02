import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import SubmitButton from '@/next/components/common/SubmitButton'
import { slugify } from '@/server/utils/slugify'

const mutation = gql`
  mutation CreateSeries($slug: String!, $name: String!, $cover: Upload!) {
    createSeries(name: $name, slug: $slug, cover: $cover) {
      slug
      name
    }
  }
`

export default function AddSeries() {
  const [slug, setSlug] = useState('')
  const [mutate, { loading }] = useMutation(mutation)

  function handleSubmitForm(e) {
    e.preventDefault()
    e.persist()

    const data = serialize(e.target, { hash: true })
    data.cover = e.target.elements.cover.files[0]

    mutate({ mutation, variables: data })
      .then((results) => {
        toast.success(`Added "${data.name}" series successfully!`)
        e.target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='addSeries' className='mb-2 mt-3'>
        Add Series
      </div>
      <form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='slug'>Slug:</label>
              <input
                type='text'
                name='slug'
                className='form-control'
                readOnly
                value={slug}
              />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                name='name'
                className='form-control'
                onChange={(e) => setSlug(slugify(e.target.value))}
              />
            </div>
          </div>
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
          <div className='col m-auto'>
            <SubmitButton loading={loading} type='submit'>
              Add Series
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  )
}
