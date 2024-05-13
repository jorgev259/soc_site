import { DateTime } from 'luxon'
import clsx from 'clsx'
import { Fragment } from 'react'

import { Link } from '@/next/utils/navigation'
import { getClient } from '@/next/utils/ApolloSSRClient'
import { gql } from '@/next/__generated__'

import style from '@/styles/letter.module.scss'

const query = gql(`
  query AlbumList {
    albums {
      id
      title
      releaseDate
      categories {
        name
      }
    }
  }
`)

export default async function AlbumList() {
  const client = await getClient()
  const { data } = await client.query({ query })
  const { albums } = data

  const sorted: { [key: string]: typeof albums } = {}

  albums.forEach((album) => {
    const letter = album.title[0].toUpperCase()
    if (!sorted[letter]) sorted[letter] = [album]
    else sorted[letter].push(album)
  })

  const letters = Object.keys(sorted).sort()

  return (
    <div className='bg-dark col p-3'>
      <div className='row mb-4'>
        <div className='col'>
          {letters.map((letter) => (
            <Link
              key={letter}
              className={clsx(style.letter, 'btn btn-secondary p-2 m-1')}
              href={`#${letter}`}
            >
              <h2>{letter}</h2>
            </Link>
          ))}
        </div>
      </div>
      {letters.map((letter) => (
        <Fragment key={letter}>
          <div className='divider' />
          <div className='row'>
            <div className='col'>
              <h1 className='text-center text-capitalize m-0' id={letter}>
                {letter}
              </h1>
            </div>
          </div>
          <div className='divider' />
          <div className='row my-4 d-flex flex-column'>
            <div className='col'>
              {sorted[letter]
                .sort((a, b) => +(a.title < b.title))
                .map(({ id, title, releaseDate, categories }) => (
                  <div className='row' key={id}>
                    <Link href={`/album/${id}`} className='mt-2 link'>
                      {title}({DateTime.fromISO(releaseDate).year}) (
                      {categories.map((c) => c?.name).join(' / ')})
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  )
}
