import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'

import { slugify } from '@/server/utils/slugify'

const mutation = gql`
  mutation CreateStudio($slug: String!, $name: String!) {
    createStudio(name: $name, slug: $slug) {
      slug
      name
    }
  }
`

export default function AddStudio() {
  const [slug, setSlug] = useState('')
  const [mutate] = useMutation(mutation)

  function handleSubmitForm(e) {
    e.preventDefault()
    e.persist()

    const data = serialize(e.target, { hash: true })

    mutate({ mutation, variables: data })
      .then((results) => {
        toast.success(`Added "${data.name}" studio succesfully!`)
        e.target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='addStudio' className='mb-2 mt-3'>
        Add Studio
      </div>
      <form className='site-form blackblock' onSubmit={handleSubmitForm}>
        <div className='row'>
          <div className='col-md-6'>
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
          <div className='col-md-6'>
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
        </div>
        <div className='row'>
          <div className='col m-auto'>
            <button type='submit' className='btn btn-primary'>
              Add Studio
            </button>
          </div>
        </div>
      </form>
    </>
  )
}
