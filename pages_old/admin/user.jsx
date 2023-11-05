import { useRef, createRef, useMemo, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Button, Col, Row, Container, Table, Form, Modal, InputGroup, FormControl } from 'react-bootstrap'
import { toast } from 'react-toastify'
import serialize from 'form-serialize'

import { SimpleSelector } from '@/components/Selectors'
import Loader from '@/components/Loader'
import { hasRolePage } from '@/components/resolvers'

export const getServerSideProps = hasRolePage(['MANAGE_USER'])

export default function AdminUser () {
  const { data, refetch } = useQuery(gql`
    query users($search: String!){
      users(search: $search){
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
  `, { variables: { search: '' } })

  function handleSearch (e) {
    e.persist()
    e.preventDefault()
    const search = e.target.value

    if (search.length < 3) return
    refetch({ search })
  }

  return (
    <Container>
      <Row className='site-form blackblock mt-3'>
        <Col>
          <Row>
            <Col>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Text>&#128270;</InputGroup.Text>
                  <FormControl onChange={handleSearch} />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col>
              <Table variant='dark' hover >
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Roles</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {data && data.users.map(props => (
                    <UserRow key={props.username} {...props} roleList={data.roles} refetch={refetch}/>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className='site-form blackblock mt-3'>
        <Col>
          <Table variant='dark' hover >
            <thead>
              <tr>
                <th>Role</th>
                {data && data.permissions.map((p, i) => <th key={i}>{p}</th>)}
                <th />
              </tr>
            </thead>
            <tbody>
              {data && data.roles.map(props => (
                <RoleRow key={props.name} {...props} permissionList={data.permissions} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <AddRole />

      {/* <Form className='site-form blackblock mt-3' onSubmit={handleCreate}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label htmlFor='username'>Username:</Form.Label>
              <FormControl required type='text' name='username' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor='email'>Email:</Form.Label>
              <FormControl required type='text' name='email' />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor='roles'>Roles:</Form.Label>
              <SimpleSelector
                options={data ? data.roles.map(({ name }) => ({ label: name, value: name })) : []}
                name='roles'
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='m-auto'>
            <ButtonLoader text='Add User' loading={loading} type='submit' color='primary' />
          </Col>
        </Row>
              </Form> */}
    </Container>
  )
}

function UserRow (props) {
  const { username, roles, roleList, refetch } = props
  const [update, { loading }] = useMutation(gql`
  mutation updateUserRoles($username: String!, $roles: [String]!){
    updateUserRoles(username: $username, roles: $roles)
  }
  `)
  const [remove, { removeLoading }] = useMutation(gql`
  mutation DeleteUser($username: String!){
    deleteUser(username: $username)
  }
  `)

  const [deleteModal, setDeleteModal] = useState(false)

  const handleUpdate = roles => {
    update({
      variables: { username, roles: roles.map(r => r.value) }
    }).then(results => {
      toast.success('Updated user succesfully!')
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  function handleDelete () {
    remove({ variables: { username } }).then(results => {
      toast.success(`Deleted user "${username}" succesfully`)
      refetch()
    }).catch(err => {
      console.log(err)
      toast.error(`Failed to delete user "${username}"`)
    }).finally(() => setDeleteModal(!deleteModal))
  }

  return (
    <>
      <Modal centered show={deleteModal} toggle={() => setDeleteModal(!deleteModal)}>
        <Modal.Body className='m-3' style={{ color: 'black' }}>
          <Row><Col>{`Delete user "${username}"?`}</Col></Row>
          <Row className='mt-2'>
            <Col>
              <Button color='primary' className='mx-2' onClick={handleDelete}>{removeLoading ? <Loader dev /> : 'Yes'}</Button>
              <Button color='primary' className='mx-2' onClick={() => setDeleteModal(!deleteModal)}>No</Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      <tr>
        <td>{username}</td>
        <td>
          <SimpleSelector
            loading={loading}
            onChange={result => handleUpdate(result)}
            defaultValue={roles.map(({ name }) => ({ label: name, value: name }))}
            options={roleList.map(({ name }) => ({ label: name, value: name }))}
          />
        </td>
        <td>
          <Button className='me-2' onClick={() => setDeleteModal(!deleteModal)}>Remove</Button>
        </td>
      </tr>
    </>
  )
}

function RoleRow ({ name, permissions, permissionList }) {
  const nameRef = useRef(null)
  const permRefs = useMemo(() => Array(permissionList.length).fill().map(() => createRef()), [permissionList])

  const [deleteRole] = useMutation(gql`
  mutation DeleteRole($name:String!){
    deleteRole(name: $name)
  }
  `)

  const [updateRole] = useMutation(gql`
  mutation UpdateRole($key: String!, $name:String!, $permissions:[String]!){
    updateRole(key: $key, name: $name, permissions: $permissions){
      name
    }
  }
  `)

  function handleDelete () {
    deleteRole({ variables: { name } }).then(results => {
      toast.success(`Removed "${name}" role succesfully!`)
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  function handleUpdate () {
    const permissions = []
    permRefs.forEach((p, i) => {
      if (p.current.checked) permissions.push(permissionList[i])
    })

    updateRole({ variables: { key: name, name: nameRef.current.value, permissions } }).then(results => {
      toast.success(`Updated "${name}" role succesfully!`)
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  return (
    <tr>
      <td><input style={{ width: '100%' }} ref={nameRef} type='text' className='m-auto' defaultValue={name} /></td>
      {permissionList.map((p, i) => (
        <td key={p}>
          <input ref={permRefs[i]} type='checkbox' className='m-auto' defaultChecked={permissions.includes(p)} />
        </td>
      ))}
      <td>
        <Button className='me-2' onClick={handleUpdate}>Save</Button>
        <Button onClick={handleDelete}>Remove</Button>
      </td>
    </tr>
  )
}

function AddRole () {
  const [create] = useMutation(gql`
  mutation CreateRole($name:String!, $permissions: [String]!){
    createRole(name: $name, permissions: $permissions) {
      name
    }
  }
  `)

  function handleSubmitForm (e) {
    e.preventDefault()
    e.persist()
    const variables = serialize(e.target, { hash: true })
    variables.permissions = []

    create({ variables }).then(results => {
      toast.success(`Added "${e.target.elements.name.value}" role succesfully!`)
      e.target.reset()
    }).catch(err => {
      console.log(err)
      toast.error(err.message, { autoclose: false })
    })
  }

  return (
    <div className='site-form blackblock mt-3 p-3'>
      <Form onSubmit={handleSubmitForm}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label htmlFor='name'>Name:</Form.Label>
              <FormControl type='text' name='name' required />
            </Form.Group>
          </Col>
          <Col className='mb-3 mt-auto'>
            <Button type='submit' color='primary'>Add Role</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
