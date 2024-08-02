import { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import clsx from 'clsx'
import Image from 'next/legacy/image'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import styles from '@/styles/Search.module.scss'

import { Link } from '@/next/utils/navigation'
import { getImageUrl } from '@/server/utils/getCDN'
import Loader from '@/components/Loader'

const limit = 30
const queryHeader = 'query Search($title: String!, $limit: Int!, $page: Int!)'

export default function Search() {
  const t = useTranslations('common')
  const searchParams = useSearchParams()

  const search = searchParams.get('q')
  const categories = {
    byTitle: {
      query:
        'searchAlbum(title: $title, limit: $limit, page: $page){ count, items: rows { id, title, categories { name }, releaseDate, placeholder } }',
      title: t('Albums'),
      type: 'album'
    },
    byArtist: {
      query:
        'searchAlbumByArtist(name: $title, limit: $limit, page: $page){ count, items: rows { id, title, categories { name }, releaseDate, placeholder } }',
      title: `${t('Albums')} (${'by artists'})`,
      type: 'album'
    },
    games: {
      query:
        'searchGame(name: $title, limit: $limit, page: $page){ count, items: rows { id: slug, title: name, releaseDate, placeholder } }',
      title: t('Games'),
      type: 'game'
    },
    studios: {
      query:
        'searchStudio(name: $title, limit: $limit, page: $page){ count, items: rows { id: slug, title: name } }',
      title: t('Studios')
    },
    anims: {
      query:
        'searchAnimation(title: $title, limit: $limit, page: $page){ count, items: rows { id, title, releaseDate, placeholder } }',
      title: t('Animations'),
      type: 'anim'
    },
    series: {
      query:
        'searchSeries(name: $title, limit: $limit, page: $page){ count, items: rows { id: slug, title: name, placeholder } }',
      title: t('Series'),
      type: 'series'
    }
  }

  const initialState = {}
  Object.keys(categories).forEach((name) => {
    initialState[name] = false
  })

  const query = gql`
  ${queryHeader}{
    byTitle: ${categories.byTitle.query}
    byArtist: ${categories.byArtist.query}
    games: ${categories.games.query}
    studios: ${categories.studios.query}
    anims: ${categories.anims.query}
    series: ${categories.series.query}
  }
  `

  const [getInitial, { data, loading: initialLoad }] = useLazyQuery(query, {
    variables: { title: search, limit, page: 0 }
  })
  const [loadingState, setLoadingState] = useState(initialState)
  const setLoading = (name, value) =>
    setLoadingState({ ...loadingState, [name]: value })

  const loading =
    initialLoad || Object.values(loadingState).some((c) => c.loading)

  useEffect(() => {
    if (search) getInitial()
  }, [search, getInitial])

  if (!search) return null

  return (
    <div className='row h-100 bg-dark'>
      <div className='col'>
        <div className='container'>
          <div className='row'>
            <div
              className='col-md-12 my-1 px-4 py-3'
              style={{ backgroundColor: '#33353e' }}
            >
              <h2 className='searchTitle'>
                {t('Search Results for')}: {search}
              </h2>
            </div>
          </div>
          {loading && (
            <div className='row'>
              <div className='col'>
                <Loader className='mx-auto my-2' />
              </div>
            </div>
          )}

          {data &&
            Object.entries(categories).map(
              ([name, value]) =>
                categories[name] && (
                  <SearchSection
                    key={name}
                    search={search}
                    category={name}
                    {...value}
                    {...data[name]}
                    setLoading={setLoading}
                  />
                )
            )}
        </div>
      </div>
    </div>
  )
}

function SearchSection(props) {
  const {
    count: initialCount,
    title,
    items: initialItems,
    type,
    search,
    category,
    query,
    setLoading
  } = props
  const [initialized, setInit] = useState(false)
  const [items, setItems] = useState(initialItems)
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(initialCount)
  const [getInfo] = useLazyQuery(
    gql`
      ${queryHeader}{
        result: ${query}
      }
    `,
    {
      onCompleted: (data) => {
        setLoading(category, false)
        setItems(data.result.items)
      },
      onError: (err) => {
        console.log(err)
        toast.error('Failed to fetch some results')
        setCount(0)
      }
    }
  )

  const start = page * limit
  const calculatedEnd = start + limit
  const end = count < calculatedEnd ? count : calculatedEnd

  useEffect(() => {
    if (initialized) {
      setLoading(category, true)
      getInfo({ variables: { title: search, limit, page } })
    } else setInit(true)
  }, [page])

  return count > 0 ? (
    <>
      <div className='row mb-1 mt-4'>
        <div className='col-md-auto'>
          <h2>
            {title} ({count > limit ? `${start + 1} - ${end}` : count})
          </h2>
        </div>
        {count > limit && (
          <div className='col-md-auto'>
            <nav>
              {Array.from(Array(Math.ceil(count / limit)), (x, i) => (
                <a
                  disabled={page === i}
                  key={i}
                  onClick={() => setPage(i)}
                  className='nav-link py-0 px-2'
                >
                  <h2>{i + 1}</h2>
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
      <div className='row'>
        {items.map((item) => (
          <div key={item.id} className='col-md-6'>
            <Link href={`/${type}/${item.id}`} className={styles.a}>
              <div
                className={clsx(styles.result, 'row mx-1 d-flex flex-row mb-3')}
              >
                {type && (
                  <div className={clsx(styles.cover, 'col-md-auto px-0')}>
                    <Image
                      objectFit='contain'
                      alt={item.title}
                      src={getImageUrl(item.id, type)}
                      width={180}
                      height={180}
                      placeholder={'blur'}
                      blurDataURL={item.placeholder}
                    />
                  </div>
                )}
                <div className='col p-2 px-4 my-auto'>
                  <h2>{item.title}</h2>
                  {item.releaseDate && (
                    <p className='card-text mt-2'>{item.releaseDate}</p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  ) : null
}
