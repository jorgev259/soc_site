import { useRef, createRef, useMemo, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { toast } from 'react-toastify'
import serialize from 'form-serialize'

import { SimpleSelector } from '@/components/Selectors'
import Loader from '@/components/Loader'
import { hasRolePage } from '@/next/utils/resolversPages'

export const getServerSideProps = hasRolePage(['MANAGE_USER'])

export default function AdminUser() {
  const { data, refetch } = useQuery(
    gql`
      query users($search: String!) {
        users(search: $search) {
          username
          roles {
            name
          }
        }

        roles {
          name
          permissions
        }

        permissions
      }
    `,
    { variables: { search: '' } }
  )

  function handleSearch(e) {
    e.persist()
    e.preventDefault()
    const search = e.target.value

    if (search.length < 3) return
    refetch({ search })
  }

  return (
    <div className='container'>
      <div className='row site-form blackblock mt-3'>
        <div className='col'>
          <div className='row'>
            <div className='col'>
              <div className='form-group'>
                <div className='input-group'>
                  <div className='input-group-text'>&#128270;</div>
                  <input
                    type='text'
                    className='form-control'
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-2'>
            <div className='col'>
              <table className='table table-dark table-hover'>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Roles</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.users.map((props) => (
                      <UserRow
                        key={props.username}
                        {...props}
                        roleList={data.roles}
                        refetch={refetch}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='row site-form blackblock mt-3'>
        <div className='col'>
          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Role</th>
                {data && data.permissions.map((p, i) => <th key={i}>{p}</th>)}
                <th />
              </tr>
            </thead>
            <tbody>
              {data &&
                data.roles.map((props) => (
                  <RoleRow
                    key={props.name}
                    {...props}
                    permissionList={data.permissions}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddRole />

      {/* <form className='site-form blackblock mt-3' onSubmit={handleCreate}>
        <div className='row'>
          <div className='col'>
            <div className='form-group'>
              <label htmlFor='username'>Username:</label>
              <input required type='text' name='username' className='form-control' />
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input required type='text' name='email' className='form-control' />
            </div>
          </div>
          <div className='col'>
            <div className='form-group'>
              <label htmlFor='roles'>Roles:</label>
              <SimpleSelector
                options={data ? data.roles.map(({ name }) => ({ label: name, value: name })) : []}
                name='roles'
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col m-auto'>
            <ButtonLoader text='Add User' loading={loading} type='submit' color='primary' />
          </div>
        </div>
      </form> */}
    </div>
  )
}

function UserRow(props) {
  const { username, roles, roleList, refetch } = props
  const [update, { loading }] = useMutation(gql`
    mutation updateUserRoles($username: String!, $roles: [String]!) {
      updateUserRoles(username: $username, roles: $roles)
    }
  `)
  const [remove, { removeLoading }] = useMutation(gql`
    mutation DeleteUser($username: String!) {
      deleteUser(username: $username)
    }
  `)

  const [deleteModal, setDeleteModal] = useState(false)

  const handleUpdate = (roles) => {
    update({
      variables: { username, roles: roles.map((r) => r.value) }
    })
      .then((results) => {
        toast.success('Updated user succesfully!')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  function handleDelete() {
    remove({ variables: { username } })
      .then((results) => {
        toast.success(`Deleted user "${username}" succesfully`)
        refetch()
      })
      .catch((err) => {
        console.log(err)
        toast.error(`Failed to delete user "${username}"`)
      })
      .finally(() => setDeleteModal(!deleteModal))
  }

  return (
    <>
      <div
        className={`modal ${deleteModal ? 'show' : ''}`}
        style={{ display: deleteModal ? 'block' : 'none' }}
        tabIndex='-1'
      >
        <div className='modal-dialog modal-centered'>
          <div className='modal-content'>
            <div className='modal-body m-3' style={{ color: 'black' }}>
              <div className='row'>
                <div className='col'>{`Delete user "${username}"?`}</div>
              </div>
              <div className='row mt-2'>
                <div className='col'>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={handleDelete}
                  >
                    {removeLoading ? <Loader dev /> : 'Yes'}
                  </button>
                  <button
                    className='btn btn-primary mx-2'
                    onClick={() => setDeleteModal(!deleteModal)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <tr>
        <td>{username}</td>
        <td>
          <SimpleSelector
            loading={loading}
            onChange={(result) => handleUpdate(result)}
            defaultValue={roles.map(({ name }) => ({
              label: name,
              value: name
            }))}
            options={roleList.map(({ name }) => ({ label: name, value: name }))}
          />
        </td>
        <td>
          <button
            className='btn btn-primary me-2'
            onClick={() => setDeleteModal(!deleteModal)}
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  )
}

function RoleRow({ name, permissions, permissionList }) {
  const nameRef = useRef(null)
  const permRefs = useMemo(
    () =>
      Array(permissionList.length)
        .fill()
        .map(() => createRef()),
    [permissionList]
  )

  const [deleteRole] = useMutation(gql`
    mutation DeleteRole($name: String!) {
      deleteRole(name: $name)
    }
  `)

  const [updateRole] = useMutation(gql`
    mutation UpdateRole(
      $key: String!
      $name: String!
      $permissions: [String]!
    ) {
      updateRole(key: $key, name: $name, permissions: $permissions) {
        name
      }
    }
  `)

  function handleDelete() {
    deleteRole({ variables: { name } })
      .then((results) => {
        toast.success(`Removed "${name}" role succesfully!`)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  function handleUpdate() {
    const permissions = []
    permRefs.forEach((p, i) => {
      if (p.current.checked) permissions.push(permissionList[i])
    })

    updateRole({
      variables: { key: name, name: nameRef.current.value, permissions }
    })
      .then((results) => {
        toast.success(`Updated "${name}" role succesfully!`)
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <tr>
      <td>
        <input
          style={{ width: '100%' }}
          ref={nameRef}
          type='text'
          className='m-auto'
          defaultValue={name}
        />
      </td>
      {permissionList.map((p, i) => (
        <td key={p}>
          <input
            ref={permRefs[i]}
            type='checkbox'
            className='m-auto'
            defaultChecked={permissions.includes(p)}
          />
        </td>
      ))}
      <td>
        <button className='btn btn-primary me-2' onClick={handleUpdate}>
          Save
        </button>
        <button className='btn btn-danger' onClick={handleDelete}>
          Remove
        </button>
      </td>
    </tr>
  )
}

function AddRole() {
  const [create] = useMutation(gql`
    mutation CreateRole($name: String!, $permissions: [String]!) {
      createRole(name: $name, permissions: $permissions) {
        name
      }
    }
  `)

  function handleSubmitForm(e) {
    e.preventDefault()
    e.persist()
    const variables = serialize(e.target, { hash: true })
    variables.permissions = []

    create({ variables })
      .then((results) => {
        toast.success(
          `Added "${e.target.elements.name.value}" role succesfully!`
        )
        e.target.reset()
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.message, { autoclose: false })
      })
  }

  return (
    <div className='site-form blackblock mt-3 p-3'>
      <form onSubmit={handleSubmitForm}>
        <div className='row'>
          <div className='col'>
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
          <div className='col mb-3 mt-auto'>
            <button type='submit' className='btn btn-primary'>
              Add Role
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
