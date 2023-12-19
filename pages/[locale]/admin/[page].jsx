import { useState } from 'react'
import { Button, Col, Row, Form, Container, Table, Modal, ModalBody, InputGroup, FormControl } from 'react-bootstrap'
import { toast } from 'react-toastify'
import moment from 'moment'
import classNames from 'classnames'
import { gql, useQuery, useMutation } from '@apollo/client'
import { useSearchParams } from 'next/navigation'

import { Link } from '@/next/lib/navigation'
import { AlbumSelector, SimpleSelector } from '@/components/Selectors'
import Loader from '@/components/Loader'
import { hasRolePage } from '@/components/resolvers'
import { getFullPageList, getPageList } from '@/components/utils'

export const getServerSideProps = hasRolePage(['CREATE', 'UPDATE'])

const limit = 10

export default function AlbumAdmin () {
  return (
    <Container fluid className='d-flex'>
      <Col xs={2} className='pe-3'>
        <div className='sticky-top'>
          <div className='mb-2 mt-3 text-center'>Navigation</div>
          <div className='py-2 site-form blackblock d-flex flex-column'>
            <a href='#addAlbum'>Album List</a>
            <a href='#addSeries'>Edit highlight</a>
            <a href='#addGame'>Edit banner</a>
          </div>
        </div>
      </Col>
      <Col xs={10}>
        <AlbumTable />
        <Row>
          <Highlight />
          <Banner />
        </Row>
        <Row>
          <SelectBanner />
        </Row>
      </Col>
    </Container>
  )
}

function AlbumTable () {
  const searchParams = useSearchParams()
  const page = searchParams.get('page') || '1'

  const mutation = gql`
    mutation deleteAlbum($id: ID!){
      deleteAlbum(id: $id)
    }
  `
  const query = gql`
      query searchAlbum(
        $title: String,
        $page: Int,
        $limit: Int,
        $name: String,
        $status: [String!]!
      ){
        searchAlbum(
          title: $title,
          page: $page,
          limit: $limit,
          status: $status
        ){
          rows{
            id,
            title,
            createdAt,
            updatedAt
          },
          count
        }

        config(name:$name){
          label: name
          value
        }
      }
    `

  const [status, setStatus] = useState(['show', 'hidden', 'coming'])
  const [deleteAlbum, { loading: loadingMutation }] = useMutation(mutation)
  const { data, loading, error, refetch } = useQuery(query, { variables: { title: '', page: page - 1, limit, name: 'highlight', status } })

  if (error) {
    console.log(error)
    toast.error('Failed to fetch server info')
  }

  function handleSearch (e) {
    e.persist()
    e.preventDefault()

    refetch({ title: e.target.value, page: page - 1, limit, name: 'highlight', status })
  }

  function Rows () {
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState({})

    const { searchAlbum } = data
    const { id, title } = modalData

    function handleDelete () {
      deleteAlbum({ variables: { id } }).then(results => {
        toast.success(`Deleted album "${title}" (${id}) succesfully`)
        refetch()
      }).catch(err => {
        console.log(err)
        toast.error(`Failed to delete album "${title}" (${id})`)
      }).finally(() => setModalData(!modal))
    }

    return (
      <>
        <Modal centered show={modal} onHide={() => setModal(false)}>
          <ModalBody className='m-3' style={{ color: 'black' }}>
            <Row><Col>{`Delete the album "${title}" (ID: ${id})?`}</Col></Row>
            <Row className='mt-2'>
              <Col>
                <Button color='primary' className='mx-2' onClick={handleDelete}>{loadingMutation ? <Loader dev /> : 'Yes'}</Button>
                <Button color='primary' className='mx-2' onClick={() => setModalData(!modal)}>No</Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        {searchAlbum.rows && searchAlbum.rows.map(({ id, title, createdAt, updatedAt }) => (
          <tr key={id}>
            <Link href={`/admin/album/${id}`} passHref legacyBehavior><td style={{ cursor: 'pointer' }}>{title}</td></Link>
            <Link href={`/admin/album/${id}`} passHref legacyBehavior><td style={{ cursor: 'pointer' }}>{moment(createdAt).format('DD/MM/YYYY HH:mm:ss')}</td></Link>
            <Link href={`/admin/album/${id}`} passHref legacyBehavior><td style={{ cursor: 'pointer' }}>{moment(updatedAt).format('DD/MM/YYYY HH:mm:ss')}</td></Link>
            <td>
              <Button onClick={() => { setModalData({ id, title }); setModal(true) }}>Remove</Button>
            </td>
          </tr>
        ))}
      </>
    )
  }

  function NavRows () {
    const { searchAlbum } = data
    const fullPageList = getFullPageList(searchAlbum.count, limit)
    const { pageList, currentList, currentListIndex } = getPageList(fullPageList, 15, page)

    return (
      <Col xs='auto' className='pagination mx-auto page-bar'>
        {currentList && (
          <>
            {currentListIndex > 0 && (
              <>
                <Link
                  href={'/admin/1'}
                  className='fas fa-angle-double-left align-middle nav-link'>
                </Link>

                <Link
                  href={`/admin/${currentList[0] - 1}`}
                  className='fas fa-angle-left align-middle nav-link'>
                </Link>
              </>
            )}
            {currentList.map(e => (
              <Link
                key={e}
                href={`/admin/${e}`}
                className={classNames({ disabled: e === parseInt(page) }, 'nav-link')}>
                {e}
              </Link>
            ))}
            {currentListIndex !== pageList.length - 1 && (
              <>
                <Link
                  href={`/admin/${currentList[currentList.length - 1] + 1}`}
                  className='fas fa-angle-right align-middle nav-link'>
                </Link>
                <Link
                  href={`/admin/${fullPageList[fullPageList.length - 1]}`}
                  className='fas fa-angle-double-right align-middle nav-link'>
                </Link>
              </>
            ) }
          </>
        )}
      </Col>
    )
  }

  const statusOptions = ['Show', 'Hidden', 'Coming'].map(label => ({ label, value: label.toLowerCase() }))

  return (
    <Form className='site-form blackblock mt-5'>
      <Row className='my-3'>
        <Col xs='auto'>
          <Form.Group>
            <Link href='/admin/album/add' passHref legacyBehavior><Button variant='primary'>Add Album</Button></Link>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <InputGroup>
              <InputGroup.Text>&#128270;</InputGroup.Text>
              <FormControl type='text' onChange={handleSearch} />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row className='my-3'>
        <Col md='auto'><Form.Label htmlFor='status'>Status:</Form.Label></Col>
        <Col>
          <SimpleSelector
            onChange={e => setStatus(e.map(v => v.value))}
            required name='status'
            defaultValue={statusOptions} options={statusOptions}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table variant='dark' hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data && <Rows />}
            </tbody>
          </Table>
          {loading && <Loader dev />}
        </Col>
      </Row>
      <Row>
        {data && <NavRows />}
      </Row>
    </Form>
  )
}

function Highlight () {
  const queryConfig = gql`
      query {
        highlight {
          value: id
          label: title
        }
      }
    `
  const mutation = gql`
      mutation Config($name: String!, $value: String!){
        config(name: $name, value: $value){
          name
          value
        }
      }
    `

  const { loading, data, error, refetch } = useQuery(queryConfig)
  const [mutateConfig] = useMutation(mutation)

  if (error) {
    console.log(error)
    toast.error('Hightlight: Failed to fetch server info')
  }

  function handleHighlight (result) {
    const { value } = result

    mutateConfig({ variables: { name: 'highlight', value } }).then(results => {
      toast.success('Updated highlighted album!')
      refetch()
    }).catch(err => {
      console.log(err)
      toast.error('Failed to update highlighted album')
    })
  }

  return (
    <Col md={6}>
      <div className='mt-3 site-form blackblock p-3'>
        <Form.Label>Highlight album:</Form.Label>
        <AlbumSelector options={{ isSingle: true, defaultValue: data?.highlight, onChange: handleHighlight, loading }} />
      </div>
    </Col>
  )
}

function Banner () {
  const mutation = gql`
      mutation UploadBanner($banner: Upload!){
        uploadBanner(banner: $banner)
      }
    `
  const [upload, { loading }] = useMutation(mutation)

  function handleUpload (ev) {
    const [banner] = ev.target.files

    upload({ variables: { banner } }).then(results => {
      toast.success('Updated banner!')
    }).catch(err => {
      console.log(err)
      toast.error('Failed to update banner')
    })

    ev.persist()
    ev.preventDefault()
  }

  return (
    <Col md={6} className='mt-3 site-form blackblock p-3'>
      <Form.Group>
        <Form.Label htmlFor='banner'>Upload Banner:</Form.Label>
        {loading ? <Loader dev /> : <FormControl type='file' onChange={handleUpload} />}
      </Form.Group>
    </Col>

  )
}

function SelectBanner () {
  const queryConfig = gql`
      query {
        banners
      }
    `
  const mutation = gql`
      mutation ($name: String!){
        selectBanner(name: $name)
      }
    `

  const { loadingQuery, data, error, refetch } = useQuery(queryConfig)
  const [mutateConfig, { loading }] = useMutation(mutation)

  if (error) {
    console.log(error)
    toast.error('Hightlight: Failed to fetch server info')
  }

  function handleSelect (name) {
    mutateConfig({ variables: { name: name.replace('.png', '') } }).then(results => {
      toast.success('Updated banner!')
      refetch()
    }).catch(err => {
      console.log(err)
      toast.error('Failed to update banner')
    })
  }

  return (
    <Col md={12}>
      <div className='p-0 my-3 site-form blackblock position-relative'>
        {(loading || loadingQuery) && (
          <div className='p-0 position-absolute h-100 w-100'>
            <div className='p-0 blackblock position-absolute h-100 w-100' style={{ backgroundColor: 'black', opacity: 0.65 }} />
            <Loader className='m-auto' />
          </div>
        )}
        <div className='p-3'>
          <Form.Label>Available banners:</Form.Label>
          {data?.banners.map(b => (
            <div
              key={b} className='my-2'
              onClick={() => handleSelect(b)}
              style={{
                cursor: 'pointer',
                height: '110px',
                width: '100%',
                backgroundSize: 'cover',
                backgroundImage: `url('/_next/image?w=3840&q=25&url=${`https://cdn.sittingonclouds.net/live/${b}`}`
              }} />
          ))}
        </div>
      </div>

    </Col>
  )
}
