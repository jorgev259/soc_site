import { toast } from 'react-toastify'
import serialize from 'form-serialize'
import { gql, useMutation } from '@apollo/client'

const mutation = gql`
  mutation CreatePlatform($name: String!, $type: String!) {
    createPlatform(name: $name, type: $type) {
      id
      name
    }
  }
`

export default function AddPlatform() {
  const [mutate] = useMutation(mutation)
  function handleSubmitForm(e) {
    e.preventDefault()
    e.persist()
    const variables = serialize(e.target, { hash: true })

    mutate({ mutation, variables })
      .then((results) => {
        toast.success(
          `Added "${e.target.elements.name.value}" platform successfully!`
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
      <div id='addPlat' className='mb-2'>
        Add Platform
      </div>
      <div className='site-form blackblock'>
        <form onSubmit={handleSubmitForm}>
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label htmlFor='name'>Name:</label>
                <input
                  type='text'
                  name='name'
                  required
                  className='form-control'
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label htmlFor='type'>Type:</label>
                <select className='form-control' name='type'>
                  <option value='Game'>Game</option>
                  <option value='Animation'>Animation</option>
                </select>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col m-auto'>
              <button type='submit' className='btn btn-primary'>
                Add Platform
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
