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

function HiddenInputs (props) {
  const { isSingle = false, value = [], required = false, name } = props

  return isSingle
    ? (
      <input value={value[0] ? value[0].value : ''} name={name} required={required} hidden readOnly />
    )
    : (
      value.map(s => <input key={s.value} value={s.value} name={name ? `${name}[]` : undefined} hidden readOnly />)
    )
}

export function BaseSelector (props) {
  const { startQuery, changeQuery, rowsFn, options: selectorOptions = {} } = props
  const { defaultValue, isSingle = false, required = false, loading: loadingProp = false, name, onChange } = selectorOptions

  const client = useApolloClient()
  const stubElement = useRef(null)
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState(defaultValue || [])

  const filterOptions = async (_, filter) => {
    setLoading(true)
    const { data } = await client.query({ query: filter.length === 0 && startQuery ? startQuery : changeQuery, variables: { filter, limit } })
    setOptions(getOptions(data))
    setLoading(false)

    return _
  }
  const getOptions = data => data ? (rowsFn ? rowsFn(data[Object.keys(data)[0]]) : data[Object.keys(data)[0]]) : []
  const onChangeFn = (items = []) => {
    const result = isSingle ? items.slice(-1) : items

    if (onChange) onChange(isSingle ? result[0] : result)
    setValue(result)
  }

  useEffect(() => {
    const form = stubElement.current.closest('form')
    form?.addEventListener('reset', () => setValue(defaultValue || []))
  }, [])

  useEffect(() => {
    if (startQuery) {
      setLoading(true)
      client.query({ query: startQuery, variables: { limit } })
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
        value={value} options={options}
      />
      <HiddenInputs isSingle={isSingle} required={required} value={value} name={name} />
    </>
  )
}

export function SimpleSelector (props) {
  const { isSingle = false, defaultValue = isSingle ? undefined : [], required = false, name = '', onChange } = props

  const stubElement = useRef(null)
  const [value, setValue] = useState(defaultValue || [])

  useEffect(() => {
    const form = stubElement.current.closest('form')
    form?.addEventListener('reset', () => setValue(defaultValue))
  }, [])

  const onChangeFn = (items = []) => {
    const result = isSingle ? items.slice(-1) : items

    if (onChange) onChange(isSingle ? result[0] : result)
    setValue(result)
  }

  useEffect(() => {
    if (defaultValue) setValue(isSingle ? [defaultValue] : defaultValue)
  }, [defaultValue, isSingle])

  return (
    <>
      <div ref={stubElement} style={{ display: 'none' }} />
      <MultiSelect
        valueRenderer={valueRenderer}
        hasSelectAll={!isSingle}
        {...props}
        onChange={onChangeFn}
        value={value}
      />
      <HiddenInputs isSingle={isSingle} required={required} value={value} name={name} />
    </>
  )
}

export function AlbumSelector (props) {
  return (
    <BaseSelector
      {...props}
      rowsFn={data => data.rows}
      startQuery={gql`
        query ($limit: Int){
          searchAlbum(limit: $limit, status: ["show", "hidden", "coming"]) {
            rows {
              value: id
              label: title
            }
          }
        }
      `}
      changeQuery={gql`
        query ($filter: String){
          searchAlbum(title: $filter, status: ["show", "hidden", "coming"]) {
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

export function StudioSelector (props) {
  return (
    <BaseSelector
      {...props}
      rowsFn={data => data.rows}
      startQuery={gql`
        query ($limit: Int){
          searchStudio(limit: $limit) {
            rows {
              value: slug
              label: name
            }
          }
        }
      `}
      changeQuery={gql`
        query ($filter: String){
          searchStudio(name: $filter) {
            rows {
              value: slug
              label: name
            }
          }
        }
      `}
    />
  )
}

export function GameSelector (props) {
  return (
    <BaseSelector
      {...props}
      rowsFn={data => data.rows}
      startQuery={gql`
        query ($limit: Int){
          searchGame (limit: $limit) {
            rows{
              value: slug
              label: name
            }
          }
        }
      `}
      changeQuery={gql`
        query ($filter: String){
          searchGame(name: $filter) {
            rows {
              value: slug
              label: name
            }
          }
        }
      `}
    />
  )
}

export function AnimSelector (props) {
  return (
    <BaseSelector
      {...props}
      rowsFn={data => data.rows}
      startQuery={gql`
        query ($limit: Int!){
          searchAnimation(limit: $limit, order: "createdAt", mode: "DESC") {
            rows{
              value: id
              label: title
            }
          }
        }
      `}
      changeQuery={gql`
        query ($filter: String){
          searchAnimation(title: $filter) {
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

export function SeriesSelector (props) {
  return (
    <BaseSelector
      {...props}
      startQuery={gql`
        query ($limit: Int!){
          recentSeries(limit: $limit) {
            value: slug
            label: name
          }
        }
      `}
      changeQuery={gql`
        query ($filter: String){
          searchSeriesByName(name: $filter) {
            value: slug
            label: name
          }
        }
      `}
    />
  )
}

export function PublisherSelector (props) {
  return (
    <BaseSelector
      {...props}
      startQuery={gql`
        query ($limit: Int!){
          recentPublishers(limit: $limit) {
            value: id
            label: name
          }
        }`
      }
      changeQuery={gql`
        query ($filter: String){
          searchPublishersByName(name: $filter) {
            value: id
            label: name
          }
        }`
      }
    />
  )
}

export function PlatformSelector (props) {
  const { categories = [] } = props
  const mapCategories = `[${categories.map(c => `"${c}"`).join(',')}]`

  return (
    <BaseSelector
      {...props}
      changeQuery={gql`
        query ($filter: String) {
          searchPlatformsByName(name: $filter, categories: ${mapCategories}) {
            value: id
            label: name
          }
        }
      `}
    />
  )
}

export function RequestSelector (props) {
  return (
    <BaseSelector
      {...props}
      rowsFn={data => data.rows}
      startQuery={gql`
        query {
          searchRequests (state: ["pending"], donator: [false]) {
            rows {
              value: id
              label: title
            }
          }
        }`
      }
      changeQuery={gql`
        query ($filter: String) {
          searchRequests (state: ["pending", "hold"], filter: $filter) {
            rows {
              value: id
              label: title
            }
          }
        }`
      }
    />
  )
}
