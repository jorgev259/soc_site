'use client'
import classNames from 'classnames'
import styles from './MultiSelect.module.scss'
import Loading from '../Loading'
import { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { showModal } from '@/next/components/common/Modal'

function Arrow(props) {
  const { showSecondary } = props

  return (
    <div
      className={classNames(styles.icon, styles.arrow, {
        [styles.open]: showSecondary
      })}
    >
      <svg>
        <path d='M6 9L12 15 18 9'></path>
      </svg>
    </div>
  )
}

function Cross(props) {
  const { setSelected } = props

  function handleClick(ev) {
    ev.stopPropagation()
    setSelected([])
  }

  return (
    <div
      className={classNames(styles.icon, styles.cross)}
      onClick={handleClick}
    >
      <svg>
        <line x1='18' y1='6' x2='6' y2='18'></line>
        <line x1='6' y1='6' x2='18' y2='18'></line>
      </svg>
    </div>
  )
}

function LoadingWrapper(props) {
  const { loading } = props

  return (
    <div className={classNames(styles.icon, styles.loading, 'mx-2 my-auto')}>
      <Loading loading={loading} />
    </div>
  )
}

function CreateItem(props) {
  const { name, addId, setItem } = props

  function handleClick() {
    setItem(name)
    showModal(addId)
  }

  return (
    <div
      className={classNames(styles.item, 'px-2 py-2')}
      data-bs-theme='light'
      onClick={handleClick}
    >
      Create &quot;{name}&quot;
    </div>
  )
}

function OptionItem(props) {
  const { option, setSelected, editId, setItem } = props
  const { value, label, checked = false } = option

  function handleClick() {
    setSelected((selected) =>
      checked
        ? selected.filter((s) => s.value !== value)
        : [...selected, { value, label }]
    )
  }

  function handleEditClick(ev) {
    ev.stopPropagation()
    setItem(option)
    showModal(editId)
  }

  return (
    <>
      <div
        className={classNames(styles.item, 'px-2')}
        data-bs-theme='light'
        onClick={handleClick}
      >
        <div className={classNames(styles.label, 'py-2')}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='15'
            height='15'
            fill={checked ? 'blue' : 'black'}
            className=''
            viewBox='0 0 16 16'
          >
            {checked ? (
              <path d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z' />
            ) : (
              <path d='M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z' />
            )}
          </svg>
          <span className='ms-1'>{label}</span>
        </div>
        {editId ? (
          <div
            className={classNames(styles.edit, 'px-2')}
            onClick={handleEditClick}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              className='my-auto'
              viewBox='0 0 16 16'
            >
              <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
              <path
                fillRule='evenodd'
                d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z'
              />
            </svg>
          </div>
        ) : null}
      </div>
    </>
  )
}

function AllItem(props) {
  const { setSelected, searchOptions } = props

  function handleClick() {
    setSelected((selected) => [...selected, ...searchOptions])
  }

  return (
    <div
      className={classNames(styles.item, styles.all, 'px-2 py-2')}
      data-bs-theme='light'
      onClick={handleClick}
    >
      <div className={styles.label}>Select All</div>
    </div>
  )
}

const selectText = 'Select...'

function BaseSelect(props) {
  const {
    name,
    filter = '',
    setFilter,
    selected = [],
    setSelected, // base options
    searchOptions = [],
    required = false,
    search = true, // base options
    query = false,
    loading = false,
    addId,
    editId,
    setItem // query options
  } = props

  const [showSecondary, setSecondary] = useState(false)

  const isNoSelected = selected.length === 0
  const options = [
    ...selected.map((s) => ({ ...s, checked: true })),
    ...searchOptions
  ]
  const isFilter = filter.length > 0

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.main, styles.box, 'px-2')}
        onClick={() => setSecondary(!showSecondary)}
      >
        <div className='h-100 d-flex'>
          <div
            className={classNames(styles.label, {
              [styles.empty]: isNoSelected
            })}
          >
            {isNoSelected
              ? selectText
              : selected.map((o) => o.label).join(', ')}
          </div>
          {!isNoSelected ? <Cross setSelected={setSelected} /> : null}
          <Arrow showSecondary={showSecondary} />
        </div>
      </div>
      <div
        className={classNames(
          styles.secondary,
          styles.box,
          { [styles.show]: showSecondary },
          'mt-1'
        )}
      >
        {query || search ? (
          <div className={classNames(styles.search, 'py-2 px-2')}>
            <input
              type='text'
              placeholder={selectText}
              onChange={(ev) => setFilter(ev.target.value)}
            />
            <LoadingWrapper loading={loading} />
          </div>
        ) : null}
        <div className={classNames(styles.options)}>
          {query && isFilter ? (
            <CreateItem name={filter} addId={addId} setItem={setItem} />
          ) : null}
          {searchOptions.length > 0 ? (
            <AllItem
              isFilter={isFilter}
              setSelected={setSelected}
              searchOptions={searchOptions}
            />
          ) : null}
          {options.map((o) => (
            <OptionItem
              key={o.value}
              setSelected={setSelected}
              option={o}
              editId={editId}
              setItem={setItem}
            />
          ))}
          {selected.map((s) => (
            <input
              key={s.value}
              name={`${name}[]`}
              hidden
              readOnly
              value={s.value}
              required={required}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SimpleMultiSelect(props) {
  const {
    name,
    defaultValue = [],
    options: optionList = [],
    required = false,
    search = true
  } = props

  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(defaultValue)
  const searchOptions = optionList.filter(
    (o) =>
      !selected.find((s) => s.value === o.value) &&
      (filter.length === 0 || o.value.toLowerCase().includes(filter))
  )

  return (
    <BaseSelect
      name={name}
      filter={filter}
      setFilter={setFilter}
      selected={selected}
      setSelected={setSelected}
      searchOptions={searchOptions}
      required={required}
      search={search}
      query={false}
    />
  )
}

export default function MultiSelect(props) {
  const {
    name,
    startQuery,
    changeQuery,
    defaultValue = [],
    addId,
    editId,
    setItem,
    required = false
  } = props

  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(defaultValue)

  const { data: startData, loading: startLoading } = useQuery(startQuery)
  const [getData, { data: searchData, loading: searchLoading }] = useLazyQuery(
    changeQuery,
    { variables: { filter } }
  )

  const data = searchData || startData || {}
  const loading = searchLoading || startLoading

  const operation = Object.values(data)[0]
  const searchOptions = (operation?.rows || operation || []).filter(
    (o) => !selected.find((s) => s.value === o.value)
  )
  const isFilter = filter.length > 0

  useEffect(() => {
    if (isFilter) getData()
  }, [isFilter, filter, getData])

  return (
    <BaseSelect
      name={name}
      filter={filter}
      setFilter={setFilter}
      selected={selected}
      setSelected={setSelected}
      searchOptions={searchOptions}
      required={required}
      query={true}
      loading={loading}
      addId={addId}
      editId={editId}
      setItem={setItem}
    />
  )
}
