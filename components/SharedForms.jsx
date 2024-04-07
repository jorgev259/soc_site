'use client'
import { useEffect, useState, useRef } from 'react'
import { Button, Col, Row, Form, FormControl } from 'react-bootstrap'
import { SimpleSelector } from './Selectors'

import { clearKeys } from './utils'

import AddPublisher from './forms/AddPublisher'
import AddSeries from './forms/AddSeries'
import AddGame from './forms/AddGame'
import AddStudio from './forms/AddStudio'
import AddAnimation from './forms/AddAnimation'
import AddPlatform from './forms/AddPlatform'

import EditPublisher from './forms/EditPublisher'
import EditPlatform from './forms/EditPlatform'
import EditSeries from './forms/EditSeries'
import EditGame from './forms/EditGame'
import EditStudio from './forms/EditStudio'
import EditAnimation from './forms/EditAnimation'

export const providers = [
  { value: 'SOON', label: 'SOON' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'amazon_jp', label: 'Amazon JP' },
  { value: 'play_asia', label: 'Play Asia' },
  { value: 'cd_japan', label: 'CD Japan' },
  { value: 'spotify', label: 'Spotify' },
  { value: 'google_play', label: 'Google Play' },
  { value: 'steam', label: 'Steam' },
  { value: 'mora', label: 'Mora' },
  { value: 'apple_music', label: 'Apple Music' },
  { value: 'ototoy', label: 'OTOTOY' },
  { value: 'bandcamp', label: 'Bandcamp' },
  { value: 'deezer', label: 'Deezer' }
]

export const providersDownload = [
  { value: 'SOON', label: 'SOON' },
  { value: 'MEGA', label: 'MEGA' },
  { value: 'MEDIAFIRE', label: 'MediaFire' },
  { value: 'GOOGLEDRIVE', label: 'Google Drive' },
  { value: 'TERABOX', label: 'TeraBox' },
  { value: 'MIRROR', label: 'Mirror' }
]

export function Navigation({ title }) {
  return (
    <div className='sticky-top'>
      <div className='mb-2 mt-3 text-center'>Navigation</div>
      <div className='py-2 site-form blackblock d-flex flex-column'>
        <a href='#addAlbum'>{title} Album</a>
        <a href='#addPub'>Add Publisher</a>
        <a href='#addPlat'>Add Platform</a>
        <a href='#addSeries'>Add Series</a>
        <a href='#addGame'>Add Game</a>
        <a href='#addStudio'>Add Studio</a>
        <a href='#addAnim'>Add Animation</a>

        <a className='mt-3' href='#editPub'>
          Edit Publisher
        </a>
        <a href='#editPlat'>Edit Platform</a>
        <a href='#editSeries'>Edit Series</a>
        <a href='#editGame'>Edit Game</a>
        <a href='#editStudio'>Edit Studio</a>
        <a href='#editAnim'>Edit Animation</a>
      </div>
    </div>
  )
}

export function SharedForms() {
  return (
    <>
      <AddPublisher />
      <AddPlatform />
      <AddSeries />
      <AddGame />
      <AddStudio />
      <AddAnimation />

      <EditPublisher />
      <EditPlatform />
      <EditSeries />
      <EditGame />
      <EditStudio />
      <EditAnimation />
    </>
  )
}

export function DiscList(props) {
  const { defaults = [{ number: 0 }] } = props
  const [keys, setKeys] = useState(defaults)

  function addEmptyDisc() {
    const lastDisc = keys[keys.length - 1]

    setKeys([...keys, { number: lastDisc ? lastDisc.number + 1 : 0 }])
  }

  function clearEmptyDiscs() {
    const newKeys = []
    keys.forEach((k) => {
      const body = document.getElementById(`discInput${k.number}`).value
      if (!body || body.length === 0) return

      newKeys.push({ number: newKeys.length, body })
    })

    setKeys(newKeys)
  }

  useEffect(() => {
    setKeys(defaults)
  }, [defaults])

  return (
    <>
      <Row>
        <Col>
          <Button className='me-2' color='primary' onClick={addEmptyDisc}>
            Add Disc
          </Button>
          <Button color='primary' onClick={clearEmptyDiscs}>
            Remove empty discs
          </Button>
        </Col>
      </Row>

      <Row className='mt-3'>
        {keys.map((disc) => (
          <DiscField key={disc.number} {...disc} />
        ))}
      </Row>
    </>
  )
}

function DiscField(props) {
  const { number, tracks = [] } = props
  const formRef = useRef(null)

  useEffect(() => {
    formRef.current.value = tracks.join('\n')
  }, [tracks])

  return (
    <Col md={6} className='mb-3'>
      <Row>
        <Col md={12}>
          <Form.Group>
            <Form.Label>Disc {number + 1}:</Form.Label>
            <FormControl
              ref={formRef}
              required
              name='discs[][body]'
              as='textarea'
              id={`discInput${number}`}
              defaultValue={tracks.join('\n')}
            />
          </Form.Group>
        </Col>
      </Row>
    </Col>
  )
}

export function StoreDownloads(props) {
  const defaults = props.defaults || []
  const [keys, setKeys] = useState(
    props.defaults ? defaults.map((d, i) => i) : [0]
  )

  useEffect(() => {
    if (keys.length === 0) setKeys([0])
  }, [keys])

  return (
    <>
      <Row>
        <Col>
          <Button
            className='me-2'
            color='primary'
            onClick={() => setKeys([...keys, keys[keys.length - 1] + 1])}
          >
            Add Store link
          </Button>
          <Button
            color='primary'
            onClick={() => setKeys(clearKeys(keys, ['storeInput']))}
          >
            Remove empty links
          </Button>
        </Col>
      </Row>

      <Row className='mt-3'>
        {keys.map((key, i) => (
          <Col key={key} md={6} className='mb-3'>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Provider:</Form.Label>
                  <SimpleSelector
                    isSingle
                    name={`stores[${i}][provider]`}
                    defaultValue={
                      defaults[key]
                        ? providers.find(
                            (e) => e.value === defaults[key].provider
                          )
                        : providers[0]
                    }
                    options={providers}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Url:</Form.Label>
                  <FormControl
                    required
                    name={`stores[${i}][url]`}
                    defaultValue={defaults[key] ? defaults[key].url : ''}
                    id={`storeInput${key}`}
                    type='text'
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </>
  )
}

function DownloadList(props) {
  const { valueList = [], length = 0, setValueList, prefix = 0 } = props

  function removeItem(index) {
    const newArray = [...valueList]
    newArray.splice(index, 1)

    setValueList(newArray)
  }

  function removeLink(i, i2) {
    const newArray = [...valueList]
    const newLinks = [...newArray[i].links]

    newLinks.splice(i2, 1)
    newArray[i] = { ...newArray[i], links: newLinks }

    setValueList(newArray)
  }

  function addLink(i) {
    const newArray = [...valueList]
    const newLinks = [
      ...newArray[i].links,
      { id: `n${newArray[i].links.length}` }
    ]

    newArray[i] = { ...newArray[i], links: newLinks }

    setValueList(newArray)
  }

  return valueList.map((cat, i) => (
    <Row key={cat.id}>
      <Col>
        <Row className='mb-3'>
          <Col>
            <Form.Group className='mt-1'>
              <Form.Label>Category {prefix + i + 1} title:</Form.Label>
              <FormControl
                defaultValue={cat.title}
                required
                name={`downloads[${i + prefix}][title]`}
                type='text'
              />
            </Form.Group>
          </Col>
          <Col md='auto' className='mt-auto'>
            <Form.Group>
              <Button
                color='primary'
                onClick={() => removeItem(i)}
                disabled={length === 1}
              >
                Remove category
              </Button>
            </Form.Group>
          </Col>
          <Col md='auto' className='mt-auto'>
            <Form.Group>
              <Button
                className='me-2'
                color='primary'
                onClick={() => addLink(i)}
              >
                Add Download Link
              </Button>
            </Form.Group>
          </Col>
          <Col md='auto' className='mt-auto mb-3'>
            <div className='form-check'>
              <FormControl
                defaultValue={cat.small}
                type='checkbox'
                name={`downloads[${i + prefix}][small]`}
                className='form-check-input'
              />
              <Form.Label
                className='form-check-label'
                htmlFor={`downloads[${i + prefix}][small]`}
              >
                Small Title
              </Form.Label>
            </div>
          </Col>
        </Row>
        {cat.links.map((link, i2) => (
          <Row key={link.id} className='mb-3'>
            <Col>
              <Row>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Provider:</Form.Label>
                    <SimpleSelector
                      isSingle
                      defaultValue={providersDownload.find(
                        (p) => p.value === link.provider
                      )}
                      name={`downloads[${i + prefix}][links][${i2}][provider]`}
                      options={providersDownload}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Url:</Form.Label>
                    <FormControl
                      defaultValue={link.url}
                      required
                      type='text'
                      name={`downloads[${i + prefix}][links][${i2}][url]`}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Direct Url:</Form.Label>
                    <FormControl
                      defaultValue={link.directUrl}
                      required
                      type='text'
                      name={`downloads[${i + prefix}][links][${i2}][directUrl]`}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col md='auto' className='mt-auto'>
              <Form.Group>
                <Button color='primary' onClick={() => removeLink(i, i2)}>
                  Remove link
                </Button>
              </Form.Group>
            </Col>
          </Row>
        ))}
      </Col>
    </Row>
  ))
}

export function Downloads(props) {
  const { defaults = [] } = props
  const [defaultValues, setDefaultValues] = useState(defaults)
  const [newValues, setNewValues] = useState([])

  const length = defaultValues.length + newValues.length

  return (
    <>
      <DownloadList
        valueList={defaultValues}
        setValueList={setDefaultValues}
        length={length}
      />
      <DownloadList
        valueList={newValues}
        setValueList={setNewValues}
        length={length}
        prefix={defaultValues.length}
      />
      <Row className='mb-3'>
        <Col>
          <Button
            className='me-2'
            color='primary'
            onClick={() =>
              setNewValues([
                ...newValues,
                { id: `n${newValues.length}`, links: [] }
              ])
            }
          >
            Add Download Section
          </Button>
        </Col>
      </Row>
    </>
  )
}
