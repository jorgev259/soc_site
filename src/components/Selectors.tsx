'use client'
import { useEffect, useState, useRef } from 'react'
import { gql, useApolloClient } from '@apollo/client'
import { MultiSelect } from 'react-multi-select-component'

const limit = 10
const valueRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label }) => label).join(', ')
    : 'Select...'
}

function HiddenInputs(props) {
  const { isSingle = false, value = [], required = false, name } = props

  return isSingle ? (
    <input
      value={value[0] ? value[0].value : ''}
      name={name}
      required={required}
      hidden
      readOnly
    />
  ) : (
    value.map((s) => (
      <input
        key={s.value}
        value={s.value}
        name={name ? `${name}[]` : undefined}
        hidden
        readOnly
      />
    ))
  )
}

export function BaseSelector(props) {
  const {
    startQuery,
    changeQuery,
    rowsFn,
    options: selectorOptions = {}
  } = props
  const {
    defaultValue,
    isSingle = false,
    required = false,
    loading: loadingProp = false,
    name,
    onChange
  } = selectorOptions

  const client = useApolloClient()
  const stubElement = useRef(null)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(defaultValue || [])

  const filterOptions = async (_, filter) => {
    setLoading(true)
    const { data } = await client.query({
      query: filter.length === 0 && startQuery ? startQuery : changeQuery,
      variables: { filter, limit }
    })
    setOptions(getOptions(data))
    setLoading(false)

    return _
  }
  const getOptions = (data) =>
    data
      ? rowsFn
        ? rowsFn(data[Object.keys(data)[0]])
        : data[Object.keys(data)[0]]
      : []
  const onChangeFn = (items = []) => {
    const result = isSingle ? items.slice(-1) : items

    if (onChange) onChange(isSingle ? result[0] : result)
    setValue(result)
  }

  useEffect(() => {
    if (stubElement?.current) {
      const form = stubElement.current
      // @ts-ignore Fix later
      form?.addEventListener('reset', () => setValue(defaultValue || []))
    }
  }, [])

  useEffect(() => {
    if (startQuery) {
      setLoading(true)
      client
        .query({ query: startQuery, variables: { limit } })
        .then(({ data }) => setOptions(getOptions(data)))
        .finally(() => setLoading(false))
    }
  }, [])

  useEffect(() => {
    if (defaultValue) setValue(isSingle ? [defaultValue] : defaultValue)
  }, [defaultValue])

  return (
    <>
      <div ref={stubElement} style={{ display: 'none' }} />
      <MultiSelect
        valueRenderer={valueRenderer}
        filterOptions={filterOptions}
        onChange={onChangeFn}
        hasSelectAll={!isSingle}
        isLoading={loading || loadingProp}
        value={value}
        options={options}
        labelledBy={name}
      />
      <HiddenInputs
        isSingle={isSingle}
        required={required}
        value={value}
        name={name}
      />
    </>
  )
}

export function RequestSelector(props) {
  return (
    <BaseSelector
      {...props}
      rowsFn={(data) => data.rows}
      startQuery={gql`
        query PendingRequests {
          searchRequests(state: ["pending"], donator: [false]) {
            rows {
              value: id
              label: title
            }
          }
        }
      `}
      changeQuery={gql`
        query PendingHeldRequests($filter: String) {
          searchRequests(state: ["pending", "hold"], filter: $filter) {
            rows {
              value: id
              label: title
            }
          }
        }
      `}
    />
  )
}
