import { getLocale, getTranslations } from 'next-intl/server'
import { Fragment } from 'react'

import styles from './InfoTable.module.scss'

import StarCounter from '@/next/components/AlbumPage/StarCounter'

export async function InfoTable (props) {
  const { album } = props

  const locale = await getLocale()
  const tCommon = await getTranslations('common')
  const tPage = await getTranslations('albumPage')
  const tRating = await getTranslations('albumPage.rating')

  const date = new Date(album.releaseDate)
  const releaseDate = new Intl.DateTimeFormat([locale], {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'UTC'
  }).format(date)

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th className='width-row'>{tCommon('Release Date')}</th>
          <td>{releaseDate}</td>
        </tr>

        {album.artists.length > 0 && (
          <tr>
            <th>{tCommon('Artists')}</th>
            <td>
              {album.artists.map(({ id, name }) => name).join(', ')}
            </td>
          </tr>
        )}

        <tr>
          <th>{tCommon('Classification')}</th>
          <td>
            {[
              album.categories.map(({ name }) => tPage(`${name} Soundtrack`)).join(' & '),
              album.classifications.map(({ name }) => name).join(', ')
            ].filter(f => f !== '').join(' - ')}
          </td>
        </tr>
        {album.label && (
          <tr>
            <th>{tPage('Published by')}</th>
            <td><a className='btn btn-link p-0' href={`/publisher/${album.label}`}>{album.label}</a></td>
          </tr>
        )}
        {album.platforms.length > 0 && (
          <tr>
            <th>{tCommon('Platforms')}</th>
            <td>
              {album.platforms.map(({ id, name }, i) => (
                <Fragment key={id}>
                  {id === '29'
                    ? <span className='btn p-0' style={{ color: 'white' }}>{name}</span>
                    : <a className='btn btn-link p-0' href={`/platform/${id}`}>{name}</a>
                  }
                  {i !== album.platforms.length - 1 && ', '}
                </Fragment>
              ))}
            </td>
          </tr>
        )}

        {album.games.length > 0 && (
          <tr>
            <th>{tCommon('Games')}</th>
            <td>
              {album.games.map(({ slug, name }, i) => (
                <Fragment key={slug}>
                  <a className='btn btn-link p-0' href={`/game/${slug}`}>{name}</a>
                  {i !== album.games.length - 1 && ', '}
                </Fragment>
              ))}
            </td>
          </tr>
        )}

        {album.animations.length > 0 && (
          <tr>
            <th>{tCommon('Animations')}</th>
            <td>
              {album.animations.map(({ id, title }, i) => (
                <Fragment key={id}>
                  <a className='btn btn-link p-0' href={`/anim/${id}`}>{title}</a>
                  {i !== album.animations.length - 1 && ', '}
                </Fragment>
              ))}
            </td>
          </tr>
        )}

        <tr>
          <th>{tRating('Avg Rating')}: </th>
          <td>
            <StarCounter albumId={album.id} />
          </td>
        </tr>
      </tbody>
    </table>
  )
}
