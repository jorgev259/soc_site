import { useRef } from 'react'
import { toast } from 'react-toastify'
import serialize from 'form-serialize'
import { gql, useMutation } from '@apollo/client'

import { PublisherSelector } from '../Selectors'
import SubmitButton from '@/next/components/common/SubmitButton'

const mutationUpdate = gql`
  mutation UpdatePublisher($id: ID!, $name: String!) {
    updatePublisher(id: $id, name: $name) {
      id
      name
    }
  }
`
const mutationDelete = gql`
  mutation DeletePublisher($id: ID!) {
    deletePublisher(id: $id)
  }
`

export default function EditPublisher() {
  const formRef = useRef(null)
  const [mutateUpdate, { loading: loadingUpdate }] = useMutation(mutationUpdate)
  const [mutateDelete, { loading: loadingDelete }] = useMutation(mutationDelete)

  function handleSubmitForm(mutate, verb) {
    const target = formRef.current
    mutate({ variables: serialize(target, { hash: true }) })
      .then((results) => {
        toast.success(`${verb} publisher successfully!`)
        target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <div className='mt-3'>
      <div id='editPub' className='mb-2'>
        Edit Publisher
      </div>
      <div className='site-form blackblock'>
        <form ref={formRef}>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label htmlFor='id'>Publisher:</label>
                <PublisherSelector
                  options={{ isSingle: true, required: true, name: 'id' }}
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
                  required
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
                Delete Publisher
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
