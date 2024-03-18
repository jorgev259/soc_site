'use client'
import { gql, useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

import { mutateFormStatus } from '@/next/actions/graphql'
import { slugify } from '@/next/lib/utils'

import MultiSelect from '../../shared/MultiSelect/MultiSelect'
import { ModalPortal, hideModal } from '@/next/components/server/Modal'
import PendingButton from '@/next/components/shared/PendingButton'
import LoadingButton from '@/next/components/shared/LoadingButton'

const startQuery = gql`
  query SearchRecentStudios {
    searchStudio(limit: 10) {
      rows {
        value: slug
        label: name
      }
    }
  }
`

const changeQuery = gql`
  query SearchStudios ($filter: String){
    searchStudio(name: $filter, limit: 20) {
      rows {
        value: slug
        label: name
      }
    }
  }
`

const mutationAdd = `
  mutation CreateStudio($slug:String!, $name:String!){
    createStudio(
      name: $name
      slug: $slug
    ) {
      slug
    }
  }
`

const mutationUpdate = `
  mutation UpdateStudio($slug: String!, $name:String!){
    updateStudio(
      slug: $slug
      name: $name
    ) {
      slug
    }
  }
`

const mutationDelete = `
  mutation DeleteStudio($slug: String!){
    deleteStudio(slug: $slug)
  }
`

const addId = 'addStudioModal'
const editId = 'editStudioModal'

export default function StudioSelector () {
  const [item, setItem] = useState()

  return (
    <>
      <AddStudio item={item} />
      <EditStudio item={item} />
      <MultiSelect
        startQuery={startQuery} changeQuery={changeQuery}
        addId={addId} editId={editId} setItem={setItem}
      />
    </>
  )
}

function AddStudio (props) {
  const { item: name = '' } = props

  const [slug, setSlug] = useState(slugify(name))
  const client = useApolloClient()
  const [state, formAction] = useFormState(mutateFormStatus.bind(null, mutationAdd), { ok: null })

  useEffect(() => {
    if (state.ok === null) return
    if (state.ok) {
      client.refetchQueries({ include: ['SearchRecentStudios', 'SearchStudios'] })
      toast.success(`Added "${name}" studio succesfully!`)
      hideModal(addId)
    } else {
      console.log(state.error)
      toast.error('Failed to add studio')
    }
  }, [client, name, state])

  return (
    <ModalPortal id={addId}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add Studio</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action={formAction}>
          <div className="modal-body">
            <div className="container-fluid">
              <div className='row'>
                <div className='col-md-6'>
                  <label className="form-label" htmlFor='slug'>Slug:</label>
                  <input className="form-control" type='text' name='slug' readOnly value={slug} />
                </div>
                <div className='col-md-6'>
                  <label className="form-label" htmlFor='name'>Name:</label>
                  <input className="form-control" type='text' name='name' required defaultValue={name} onChange={e => setSlug(slugify(e.target.value))} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className='col-auto my-auto mx-1'>
              <PendingButton type='submit' className='btn-primary'>Add studio</PendingButton>
            </div>
          </div>
        </form>
      </div>
    </ModalPortal>
  )
}

function EditStudio (props) {
  const { item = {} } = props
  const { value: slug = '', label: name = '' } = item

  const client = useApolloClient()
  const [state, formAction] = useFormState(mutateFormStatus.bind(null, mutationUpdate), { ok: null })

  useEffect(() => {
    if (state.ok === null) return
    if (state.ok) {
      client.refetchQueries({ include: ['SearchRecentStudios', 'SearchStudios'] })
      toast.success('Updated studio succesfully!')
      hideModal(editId)
    } else {
      console.log(state.error)
      toast.error('Failed to edit studio')
    }
  }, [client, state])

  return (
    <ModalPortal id={editId}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit &quot;{name}&quot;</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form action={formAction}>
          <div className="modal-body">
            <div className="container-fluid">
              <div className='row'>
                <div className='col-md-6'>
                  <label className="form-label" htmlFor='slug'>Slug:</label>
                  <input className="form-control" type='text' name='slug' readOnly value={slug} />
                </div>
                <div className='col-md-6'>
                  <label className="form-label" htmlFor='name'>Name:</label>
                  <input className="form-control" type='text' name='name' required defaultValue={name} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className='col-auto my-auto mx-1'>
              <DeleteStudio slug={slug} />
            </div>
            <div className='col-auto my-auto mx-1'>
              <PendingButton type='submit' className='btn-primary'>Save Changes</PendingButton>
            </div>
          </div>
        </form>
      </div>
    </ModalPortal>
  )
}

function DeleteStudio (props) {
  const { slug } = props
  const formData = new FormData()
  formData.append('slug', slug)

  const client = useApolloClient()
  const [loading, setLoading] = useState(false)

  function handleDelete () {
    setLoading(true)
    mutateFormStatus(mutationDelete, {}, formData)
      .then(() => {
        client.refetchQueries({ include: ['SearchRecentStudios', 'SearchStudios'] })
        toast.success('Deleted studio succesfully!')
        hideModal(editId)
      })
      .catch(error => {
        console.log(error)
        toast.error('Failed to delete studio')
      })
      .finally(() => setLoading(false))
  }

  return (
    <LoadingButton onClick={handleDelete} className='btn-primary' loading={loading}>Delete Studio</LoadingButton>
  )
}
