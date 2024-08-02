import { gql } from '@apollo/client'
import classname from 'classnames'
import Image from 'next/image'
import { Link } from '@/next/utils/navigation'

import { initializeApollo } from '@/next/utils/ApolloClient'
import { getImageUrl } from '@/server/utils/getCDN'

import style from '@/styles/LetterList.module.scss'

export async function getServerSideProps() {
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
      query {
        series {
          slug
          name
          placeholder
        }
      }
    `
  })

  const series = {}
  data.series.forEach((serie) => {
    const letter = serie.name[0].toUpperCase()
    if (!series[letter]) series[letter] = [serie]
    else series[letter].push(serie)
  })

  const letters = Object.keys(series).sort()

  return {
    props: { letters, series, seriesList: data.series } /*, revalidate: 60 */
  }
}

export default function SeriesList({ series, letters, seriesList }) {
  return (
    <div className='row blackbg h-100 px-0'>
      <div className='col p-2'>
        <div className='row my-2'>
          <div className='col'>
            {letters.map((letter) => (
              <a
                key={letter}
                className={classname(style.letter, 'btn btn-secondary p-2 m-1')}
                href={`#${letter}`}
              >
                <h2>{letter}</h2>
              </a>
            ))}
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col-auto px-4'>
            {letters.map((letter) => (
              <div id={letter} key={letter} className='mt-4 d-flex flex-column'>
                <h2 className='text-center album-title text-capitalize'>
                  {letter.toUpperCase()}
                </h2>
                {series[letter].map(({ slug, name }) => (
                  <Link
                    href={`/series/${slug}`}
                    key={slug}
                    className='text-center mt-2 link'
                  >
                    {name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className='col px-4'>
            <div className='row'>
              {seriesList.map(({ slug, placeholder }) => (
                <div
                  key={slug}
                  className='position-relative col-4'
                  style={{ height: '150px' }}
                >
                  <Link
                    href={`/series/${slug}`}
                    className='d-block w-100 h-100'
                  >
                    <Image
                      className='w-100 h-100'
                      alt={slug}
                      src={getImageUrl(slug, 'series')}
                      style={{ objectFit: 'contain', objectPosition: 'center' }}
                      width={300}
                      height={100}
                      placeholder='blur'
                      blurDataURL={placeholder}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
