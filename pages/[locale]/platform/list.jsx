import { gql } from '@apollo/client'
import classname from 'classnames'
import { Link } from '@/next/utils/navigation'

import { initializeApollo } from '@/next/utils/ApolloClient'

import style from '@/styles/LetterList.module.scss'

export async function getServerSideProps() {
  const client = initializeApollo()

  const { data } = await client.query({
    query: gql`
      query {
        platforms: searchPlatformsByName(name: "", categories: ["Game"]) {
          id
          name
        }
      }
    `
  })

  const platforms = {}
  data.platforms.forEach((platform) => {
    const letter = platform.name[0].toUpperCase()
    if (!platforms[letter]) platforms[letter] = [platform]
    else platforms[letter].push(platform)
  })

  const letters = Object.keys(platforms).sort()

  return { props: { letters, platforms } }
}

export default function PlatformList({ letters, platforms }) {
  return (
    <div className='row blackbg h-100 px-0'>
      <div className='col p-2'>
        <div className='row mt-2'>
          <div className='col'>
            {letters.map((letter) => (
              <a
                key={letter}
                className={classname(style.letter, 'btn btn-secondary m-1 p-2')}
                href={`#${letter}`}
              >
                <h2>{letter}</h2>
              </a>
            ))}
          </div>
        </div>
        {letters.map((letter) => (
          <div id={letter} key={letter}>
            <hr className='style2 style-white' />
            <h2 className='text-center album-title text-capitalize'>
              {letter.toUpperCase()}
            </h2>
            <div className='row pb-3 pl-2'>
              {platforms[letter]
                .sort((a, b) => a.name > b.name)
                .map(({ id, name }) => (
                  <div key={id} className='col-3 d-flex flex-column'>
                    <Link
                      href={`/platform/${id}`}
                      className='listItem mt-2 link'
                    >
                      {name}
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
