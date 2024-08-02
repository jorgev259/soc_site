import { Fragment } from 'react'
import Head from 'next/head'
import { gql } from '@apollo/client'
import { DateTime } from 'luxon'
import Image from 'next/legacy/image'

import { AlbumBoxList } from '@/components/AlbumBoxes'
import { initializeApollo } from '@/next/utils/ApolloClient'
import { getImageUrl } from '@/server/utils/getCDN'

const query = gql`
  query game($slug: String) {
    game(slug: $slug) {
      slug
      name
      releaseDate
      placeholder
      headerColor
      publishers {
        id
        name
      }
      platforms {
        id
        name
      }
      series {
        slug
        name
      }
      albums(order: ["title"]) {
        id
        title
        releaseDate
        createdAt
        placeholder
        games {
          slug
        }
      }
    }
  }
`

export async function getServerSideProps({ params, locale }) {
  const { slug } = params
  const client = initializeApollo()
  const { data } = await client.query({ query, variables: { slug } })
  const { game } = data

  if (game === null)
    return { redirect: { destination: '/404', permanent: false } }

  return { props: { game, imageUrl: fullImage(slug, 50) } }
}

const fullImage = (id, quality = 75) =>
  `/_next/image?w=3840&q=${quality}&url=${getImageUrl(id, 'game')}`

export default function GameDetail(props) {
  const { game, imageUrl } = props
  const {
    slug,
    name,
    releaseDate,
    publishers,
    platforms,
    series,
    placeholder,
    headerColor
  } = game
  const albums = [[], [], []]

  game.albums.forEach((album) => {
    const { length } = album.games
    const index = length === 1 ? 0 : length === 2 ? 1 : 2

    albums[index].push(album)
  })

  return (
    <div className='container'>
      <Head>
        <title>{name}</title>
        <meta key='url' property='og:url' content={`/game/${slug}`} />
        <meta key='color' name='theme-color' content={headerColor}></meta>
        <meta key='title' property='og:title' content={name} />
        <meta
          key='desc'
          property='og:description'
          content={`${series.map(({ name }) => name).join(' - ')}${series.length > 0 ? ' / ' : ''}${publishers.map(({ name }) => name).join(' - ')}`}
        />
        <meta key='image' property='og:image' content={imageUrl} />
      </Head>

      <div className='row mt-3'>
        <div className='col-12 col-md-4'>
          <div
            className='logoBox blackblock p-3 position-relative w-100'
            style={{ height: '250px' }}
          >
            <div className='position-relative w-100 h-100'>
              <Image
                layout='fill'
                objectFit={'contain'}
                placeholder='blur'
                blurDataURL={placeholder}
                alt={name}
                src={getImageUrl(slug, 'game')}
              />
            </div>
          </div>
        </div>
        <div className='col-md-8 mt-3 mt-md-0 my-0 d-flex justify-content-center flex-column'>
          <div className='blackblock'>
            <div className='row'>
              <div className='col-md-12'>
                <h1 className='text-center album-title'>{name}</h1>
              </div>
            </div>
            <div className='row my-1'>
              <div className='col d-flex justify-content-center'>
                <span className='fw-bold me-2'>Release Date:</span>
                <span>
                  {DateTime.fromISO(releaseDate)
                    .setLocale('en-us')
                    .toLocaleString({
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                </span>
              </div>
            </div>
            <div className='row my-1'>
              <div className='col d-flex justify-content-center'>
                <span className='fw-bold me-2'>Publishers:</span>
                <span>
                  {publishers.map(({ id, name }, i) => (
                    <Fragment key={id}>
                      <a
                        className='btn btn-link p-0 link'
                        href={`/publisher/${id}`}
                      >
                        {name}
                      </a>
                      {i !== publishers.length - 1 && ', '}
                    </Fragment>
                  ))}
                </span>
              </div>
            </div>
            <div className='row my-1'>
              <div className='col d-flex justify-content-center'>
                <span className='fw-bold me-2'>Platforms:</span>
                <span>
                  {platforms.map(({ id, name }, i) => (
                    <Fragment key={id}>
                      <a
                        className='btn btn-link p-0 link'
                        href={`/platform/${id}`}
                      >
                        {name}
                      </a>
                      {i !== platforms.length - 1 && ', '}
                    </Fragment>
                  ))}
                </span>
              </div>
            </div>
            <div className='row my-1'>
              <div className='col d-flex justify-content-center'>
                <span className='fw-bold me-2'>Series:</span>
                <span>
                  {series.map(({ slug, name }, i) => (
                    <Fragment key={slug}>
                      <a
                        className='btn btn-link p-0 link'
                        key={slug}
                        href={`/series/${slug}`}
                      >
                        {name}
                      </a>
                      {i !== series.length - 1 && ', '}
                    </Fragment>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className='style2 style-white' />
      {albums.map((items, i) => (
        <div key={i} className='row justify-content-center'>
          <AlbumBoxList colProps={{ md: 3, xs: 6 }} items={items} />
        </div>
      ))}
    </div>
  )
}
