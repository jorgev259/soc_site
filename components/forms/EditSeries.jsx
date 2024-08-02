import { useEffect, useRef } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import serialize from 'form-serialize'
import { toast } from 'react-toastify'
import SubmitButton from '@/next/components/common/SubmitButton'
import { SeriesSelector } from '../Selectors'

const query = gql`
  query Series($slug: String!) {
    seriesOne(slug: $slug) {
      name
    }
  }
`

const mutationUpdate = gql`
  mutation UpdateSeries($slug: String!, $name: String, $cover: Upload) {
    updateSeries(name: $name, slug: $slug, cover: $cover) {
      slug
      name
    }
  }
`
const mutationDelete = gql`
  mutation DeleteSeries($slug: String!) {
    deleteSeries(slug: $slug)
  }
`

export default function EditSeries() {
  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)
  const [getSeries, { data, error, loading: loadingInfo }] = useLazyQuery(query)

  useEffect(() => {
    if (!error) return
    console.log(error)
    toast.error(error.message, { autoclose: false })
  }, [error])

  function handleSubmitForm(mutate, verb) {
    const target = formRef.current
    const data = serialize(target, { hash: true })
    if (target.elements.cover.files) data.cover = target.elements.cover.files[0]
    mutate({ variables: data })
      .then((results) => {
        toast.success(`${verb} series successfully!`)
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <>
      <div id='editSeries' className='mb-2 mt-3'>
        Edit Series
      </div>
      <form className='site-form blackblock' ref={formRef}>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label htmlFor='slug'>Series:</label>
              <SeriesSelector
                options={{
                  isSingle: true,
                  required: true,
                  name: 'slug',
                  loading: loadingInfo,
                  onChange: (row) =>
                    getSeries({ variables: { slug: row.value } })
                }}
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
                defaultValue={data && data.seriesOne.name}
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
              Delete Series
            </SubmitButton>
          </div>
        </div>
      </form>
    </>
  )
}
