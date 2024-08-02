import { gql } from '@apollo/client'
import moment from 'moment'
import Head from 'next/head'
import Image from 'next/legacy/image'
import { Link } from '@/next/utils/navigation'
import clsx from 'clsx'

import { initializeApollo } from '@/next/utils/ApolloClient'
import { getImageUrl } from '@/server/utils/getCDN'

import AlbumBoxStyles from '@/styles/AlbumBoxes.module.scss'

const query = gql`
  query seriesOne($slug: String) {
    seriesOne(slug: $slug) {
      name
      placeholder
      headerColor
      games {
        slug
        name
        releaseDate
        albums {
          id
          title
          placeholder
          games {
            slug
            name
            releaseDate
          }
        }
      }
    }
  }
`

export const getServerSideProps = async ({ params, req }) => {
  const { slug } = params
  const client = initializeApollo()
  const { data } = await client.query({ query, variables: { slug } })
  const { seriesOne } = data

  if (seriesOne === null)
    return { redirect: { destination: '/404', permanent: false } }

  return {
    props: {
      seriesOne,
      slug,
      imageUrl: fullImage(slug, 50)
    } /*, revalidate: 60 */
  }
}

function AlbumBox(props) {
  const { id, title, coming = false, placeholder } = props
  return (
    <div className='col-12 col-md-6 py-0 px-2 mb-3'>
      <div
        className={clsx(AlbumBoxStyles.albumBox, 'd-flex m-0 w-100 h-100')}
        style={{
          whiteSpace: 'nowrap',
          textAlign: 'center',
          flexFlow: 'column',
          backgroundColor: '#222222',
          padding: '2px'
        }}
      >
        <Link href={coming ? '' : `/album/${id}`}>
          <div className='row'>
            <div className='col-3'>
              <div className='position-relative w-100 h-100'>
                <Image
                  layout='responsive'
                  height={150}
                  width={150}
                  placeholder='blur'
                  blurDataURL={placeholder}
                  alt={title}
                  src={getImageUrl(id, 'album')}
                />
              </div>
            </div>
            <div className='col'>
              <div className='text-wrap my-auto px-1 py-2'>
                {coming ? 'Coming Soon' : title}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

const fullImage = (id, quality = 75) =>
  `/_next/image?w=3840&q=${quality}&url=${getImageUrl(id, 'series')}`

export default function SeriesDetail(props) {
  const { slug, seriesOne, imageUrl } = props
  const { headerColor } = seriesOne
  const gameList = [...seriesOne.games]
  const various = []
  const games = {}

  gameList
    .map((game) => game.albums)
    .flat()
    .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i)
    .forEach((album) => {
      if (album.games.length > 1) various.push(album)
      else {
        const game = album.games[0]
        if (!games[game.slug]) {
          games[game.slug] = {
            name: game.name,
            releaseDate: game.releaseDate,
            albums: []
          }
        }

        games[game.slug].albums.push(album)
      }
    })

  return (
    <div className='container'>
      <Head>
        <title>{seriesOne.name}</title>
        <meta key='url' property='og:url' content={`/series/${slug}`} />
        <meta key='color' name='theme-color' content={headerColor}></meta>
        <meta key='title' property='og:title' content={seriesOne.name} />
        <meta key='image' property='og:image' content={imageUrl} />
      </Head>

      <div className='row mt-3'>
        <div className='col-12 col-md-4'>
          <div
            className='logoBox blackblock p-2 position-relative w-100'
            style={{ height: '150px' }}
          >
            <div className='position-relative w-100 h-100'>
              <Image
                layout='fill'
                objectFit={'contain'}
                placeholder='blur'
                blurDataURL={seriesOne.placeholder}
                alt={seriesOne.name}
                src={getImageUrl(slug, 'series')}
              />
            </div>
          </div>
        </div>
        <div className='col-md-8 mt-3 mt-md-0 my-0 d-flex justify-content-center flex-column'>
          <div className='blackblock'>
            <div className='row'>
              <div className='col-md-12'>
                <h1 className='text-center album-title'>{seriesOne.name}</h1>
              </div>
            </div>
            <div className='row my-1'>
              <div className='col d-flex justify-content-center'>
                <span className='fw-bold me-2'>First Release:</span>
                <span>
                  {' '}
                  {gameList[0].releaseDate} -{' '}
                  <a
                    className='btn btn-link p-0 link'
                    href={`/game/${gameList[0].slug}`}
                  >
                    {gameList[0].name}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className='style2 style-white' />
      {various && various.length > 0 ? (
        <AlbumList albums={various} name='Various Games' />
      ) : null}
      {games &&
        Object.entries(games)
          .sort((a, b) =>
            moment(a[1].releaseDate).year() < moment(b[1].releaseDate).year()
              ? 1
              : -1
          )
          .map(([slug, { name, albums, releaseDate }]) => (
            <AlbumList
              key={slug}
              slug={slug}
              albums={albums}
              name={name}
              year={moment(releaseDate).year()}
            />
          ))}
    </div>
  )
}

function AlbumList(props) {
  const { year, name, albums, slug } = props
  return (
    <>
      <div className='blackblock justify-content-center m-2'>
        <div className='row'>
          {year ? (
            <div className='col-md-2'>
              <h3 className='text-center album-title'>{year}</h3>
            </div>
          ) : null}

          <div className='col-md-9'>
            <h3 className='album-title'>
              {slug ? (
                <a href={`/game/${slug}`}>{name}</a>
              ) : (
                <span className='ms-2'>{name}</span>
              )}
            </h3>
          </div>
        </div>
      </div>

      <div className='w-100 d-flex flex-wrap justify-content-center'>
        {albums
          .sort((a, b) => a.title > b.title)
          .map(({ id, title, placeholder }) => (
            <AlbumBox
              key={id}
              id={id}
              title={title}
              placeholder={placeholder}
              md={6}
              xs={12}
            />
          ))}
      </div>
    </>
  )
}
