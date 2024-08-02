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
        studios {
          slug
          name
        }
      }
    `
  })

  const studios = {}
  data.studios.forEach((studio) => {
    const letter = studio.name[0].toUpperCase()
    if (!studios[letter]) studios[letter] = [studio]
    else studios[letter].push(studio)
  })

  const letters = Object.keys(studios).sort()

  return { props: { letters, studios } /*, revalidate: 60 */ }
}

export default function GameList({ letters, studios }) {
  return (
    <div className='row blackbg h-100 px-0'>
      <div className='col p-2'>
        <div className='row mt-2'>
          <div className='col'>
            {letters.map((letter) => (
              <a
                key={letter}
                className={classname(style.letter, 'm-1 p-2 btn btn-secondary')}
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
              {studios[letter].map(({ slug, name }) => (
                <div key={slug} className='col-4 d-flex flex-column'>
                  <Link href={`/studio/${slug}`} className='listItem mt-2 link'>
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
