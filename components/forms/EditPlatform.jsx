import { useRef } from 'react'
import { toast } from 'react-toastify'
import serialize from 'form-serialize'
import { PlatformSelector } from '../Selectors'
import { gql, useMutation, useLazyQuery, useQuery } from '@apollo/client'
import SubmitButton from '@/next/components/common/SubmitButton'

const query = gql`
  query Platform($key: ID!) {
    platform(id: $key) {
      name
      type
    }
  }
`

const queryCategories = gql`
  query {
    categories {
      name
    }
  }
`

const mutationUpdate = gql`
  mutation UpdatePlatform($key: ID!, $name: String, $type: String!) {
    updatePlatform(key: $key, name: $name, type: $type) {
      id
      name
    }
  }
`
const mutationDelete = gql`
  mutation DeletePlatform($key: ID!) {
    deletePlatform(key: $key)
  }
`

export default function EditPlatform() {
  const { data: categoryData = {} } = useQuery(queryCategories)
  const { categories = [] } = categoryData

  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)
  const [getPlatform, { data, loading: loadingInfo }] = useLazyQuery(query)

  function handleSubmitForm(mutate, verb) {
    const target = formRef.current
    const variables = serialize(target, { hash: true })

    mutate({ variables })
      .then((results) => {
        toast.success(`${verb} platform successfully!`)
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <div className='mt-3'>
      <div id='editPlat' className='mb-2'>
        Edit Platform
      </div>
      <div className='site-form blackblock'>
        <form ref={formRef}>
          <div className='row'>
            <div className='col-md-4'>
              <div className='form-group'>
                <label htmlFor='key'>Platform:</label>
                <PlatformSelector
                  categories={categories.map((c) => c.name)}
                  options={{
                    isSingle: true,
                    required: true,
                    name: 'key',
                    onChange: (row) =>
                      getPlatform({ variables: { key: row.value } }),
                    loading: loadingInfo
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
                  required
                  defaultValue={data && data.platform.name}
                />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label htmlFor='type'>Type:</label>
                <select className='form-control' name='type'>
                  {categories.map((c) => (
                    <option
                      selected={data && data.platform.type === c.name}
                      key={c.name}
                      value={c.name}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
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
                Delete Platform
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
