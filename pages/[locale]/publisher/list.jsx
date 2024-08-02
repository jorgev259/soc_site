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
        publishers {
          id
          name
        }
      }
    `
  })

  const publishers = {}
  data.publishers.forEach((publisher) => {
    if (!publisher.name) return
    const letter = publisher.name[0].toUpperCase()
    if (!publishers[letter]) publishers[letter] = [publisher]
    else publishers[letter].push(publisher)
  })

  const letters = Object.keys(publishers).sort()

  return { props: { letters, publishers } /*, revalidate: 60 */ }
}

export default function PublisherList({ letters, publishers }) {
  return (
    <div className='row blackbg h-100 px-0'>
      <div className='col p-2'>
        <div className='row mt-2'>
          <div className='col'>
            {letters.map((letter) => (
              <a
                key={letter}
                className={classname(style.letter, 'm-1 p-2')}
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
              {publishers[letter].map(({ id, name }) => (
                <div key={id} className='col-3 d-flex flex-column'>
                  <Link
                    href={`/publisher/${id}`}
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
