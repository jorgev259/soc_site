import { gql } from '@apollo/client'
import { Row, Col, Button } from 'react-bootstrap'
import Sidebar from '@/components/Sidebar'
import { DateTime } from 'luxon'
import classname from 'classnames'
import { Link } from '@/next/lib/navigation'
import { initializeApollo } from '@/components/ApolloClient'

import style from '@/styles/letter.module.scss'

export async function getServerSideProps () {
  const albums = {}
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
      query {
        albums {
          id
          title
          releaseDate
          categories {
            name
          }
        }
      }
    `
  })

  data.albums.forEach(album => {
    const letter = album.title[0].toUpperCase()
    if (!albums[letter]) albums[letter] = [album]
    else albums[letter].push(album)
  })

  return { props: { albums, letters: Object.keys(albums).sort() }/*, revalidate: 60 */ }
}

export default function AlbumList ({ albums, letters }) {
  return (
    <Row className='blackbg h-100 px-0'>
      <Col className='p-3'>
        <Row>
          <Col>
            {letters.map(letter => <Button variant='secondary' key={letter} md='auto' className={classname(style.letter, 'p-2 m-1')} href={`#${letter}`}><h2>{letter}</h2></Button>)}
          </Col>
        </Row>
        <div>
          {letters.map(letter => (
            <div key={letter} className='mt-4'>
              <div className='divider' />
              <h1 className='text-center text-capitalize m-0' id={letter}>{letter}</h1>
              <div className='divider' />
              <Row className='my-4 d-flex flex-column'>
                {albums[letter]
                  .sort((a, b) => a.title > b.title)
                  .map(({ id, title, releaseDate, categories }) =>
                    <Col key={id}>
                      <Link href={`/album/${id}`} className='text-center mt-2 link'>
                        {title}({DateTime.fromISO(releaseDate).year}) ({categories.map(c => c.name).join(' / ')})
                      </Link>
                    </Col>
                  )}
              </Row>
            </div>
          ))}
        </div>
      </Col>
      <Sidebar />
    </Row>
  )
}
