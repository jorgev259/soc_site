import { useApolloClient, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { toast } from 'react-toastify'

// import { RequestSelector } from './Selectors'

const requestQuery = gql`
  query ($link: String!) {
    request(link: $link) {
      value: id
      label: title
      state
    }
  }
`

export default function RequestCheck(props) {
  const { element, className, hideTag = false } = props

  const client = useApolloClient()
  const [selected, setSelected] = useState()

  useEffect(() => {
    if (!element) return

    element.addEventListener('input', () => {
      client
        .query({ query: requestQuery, variables: { link: element.value } })
        .then(({ data }) => {
          if (data.request) setSelected(data.request)
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.message, { autoclose: false })
        })
    })
  }, [element])

  return (
    <>
      <Row className={className}>
        <Form.Group as={Col}>
          <Form.Label htmlFor='request'>Request:</Form.Label>
        </Form.Group>
      </Row>
      <Row>
        <Col>
          {/* <RequestSelector options={{ isSingle: true, name: 'request', defaultValue: selected }} onChange={setSelected} /> */}
        </Col>
        {!hideTag ? (
          <Col className='d-flex align-items-center ps-0'>
            {selected && (
              <span className=''>
                {selected.state === 'complete'
                  ? 'Request found!  Already complete tho ¯\\_(ツ)_/¯'
                  : 'Request found!'}
              </span>
            )}
          </Col>
        ) : null}
      </Row>
    </>
  )
}
