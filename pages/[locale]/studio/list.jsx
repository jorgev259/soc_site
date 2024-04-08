import { gql } from '@apollo/client'
import { Row, Col, Button } from 'react-bootstrap'
import classname from 'classnames'
import { Link } from '@/next/utils/navigation'

import { initializeApollo } from '@/next/utils/ApolloClient'
import style from '@/styles/letter.module.scss'

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
    <Row className='blackbg h-100 px-0'>
      <Col className='p-2'>
        <Row className='mt-2'>
          <Col>
            {letters.map((letter) => (
              <Button
                key={letter}
                variant='secondary'
                md='auto'
                className={classname(style.letter, ' m-1 p-2')}
                href={`#${letter}`}
              >
                <h2>{letter}</h2>
              </Button>
            ))}
          </Col>
        </Row>
        {letters.map((letter) => (
          <div ID={letter} key={letter}>
            <hr className='style2 style-white' />
            <h2 className='text-center album-title text-capitalize'>
              {letter.toUpperCase()}
            </h2>

            <Row className='pb-3 pl-2'>
              {studios[letter].map(({ slug, name }) => (
                <Col key={slug} xs={4} className='d-flex flex-column'>
                  <Link href={`/studio/${slug}`} className='listItem mt-2 link'>
                    {name}
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Col>
    </Row>
  )
}
