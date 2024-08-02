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
        games {
          slug
          name
        }
      }
    `
  })

  const games = {}
  data.games.forEach((game) => {
    const letter = game.name[0].toUpperCase()
    if (!games[letter]) games[letter] = [game]
    else games[letter].push(game)
  })

  const letters = Object.keys(games).sort()

  return { props: { letters, games } /*, revalidate: 60 */ }
}

export default function GameList({ letters, games }) {
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
              {games[letter].map(({ slug, name }) => (
                <div key={slug} className='col-4 d-flex flex-column'>
                  <Link href={`/game/${slug}`} className='listItem mt-2 link'>
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
