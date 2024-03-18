'use client'
import { useApolloClient, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'

// import { RequestSelector } from './Selectors'
import clsx from 'clsx'

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
          // toast.error(err.message, { autoclose: false })
        })
    })
  }, [element, client])

  return (
    <>
      <div className={clsx('row', className)}>
        <div className='col'>
          <label className='form-label' htmlFor='request'>
            Request:
          </label>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          {/* <RequestSelector options={{ isSingle: true, name: 'request', defaultValue: selected }} onChange={setSelected} /> */}
        </div>
        {!hideTag ? (
          <div className='col d-flex align-items-center ps-0'>
            {selected && (
              <span className=''>
                {selected.state === 'complete'
                  ? 'Request found!  Already complete tho ¯\\_(ツ)_/¯'
                  : 'Request found!'}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </>
  )
}
