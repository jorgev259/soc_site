import { toast } from 'react-toastify'
import SubmitButton from '@/next/components/common/SubmitButton'
import { gql, useMutation } from '@apollo/client'

const mutation = gql`
  mutation createPublisher($name: String!) {
    createPublisher(name: $name) {
      id
      name
    }
  }
`

export default function AddPublisher() {
  const [mutate, { loading }] = useMutation(mutation)

  function handleSubmitForm(e) {
    e.preventDefault()
    e.persist()

    mutate({ mutation, variables: { name: e.target.elements.name.value } })
      .then((results) => {
        toast.success(
          `Added "${e.target.elements.name.value}" publisher successfully!`
        )
        e.target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <div className='mt-3'>
      <div id='addPub' className='mb-2'>
        Add Publisher
      </div>
      <div className='site-form blackblock'>
        <form onSubmit={handleSubmitForm}>
          <div className='row'>
            <div className='col-md-8'>
              <input type='text' name='name' className='form-control' />
            </div>
            <div className='col-md-4'>
              <SubmitButton
                loading={loading}
                type='submit'
                color='primary'
                className='mb-2'
              >
                Add Publisher
              </SubmitButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
