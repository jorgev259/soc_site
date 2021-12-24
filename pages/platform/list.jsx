import { gql } from '@apollo/client'
import { Row, Col, Button } from 'react-bootstrap'
import classname from 'classnames'
import Link from 'next/link'

import client from '../../lib/ApolloClient'
import style from '../../styles/letter.module.scss'

export async function /* getStaticProps */ getServerSideProps () {
  const { data } = await client.query({
    query: gql`
        query {
            platforms: searchPlatformsByName(name:"", type:"Game") {
                id
                name
            }
        }`,
    
  })

  const platforms = {}
  data.platforms.forEach(platform => {
    const letter = platform.name[0].toUpperCase()
    if (!platforms[letter]) platforms[letter] = [platform]
    else platforms[letter].push(platform)
  })

  const letters = Object.keys(platforms).sort()

  return { props: { letters, platforms }/*, revalidate: 60 */ }
}

export default function PlatformList ({ letters, platforms }) {
  return (
    <Col className='blackbg p-2 pb-5'>
      <Row className='mt-2'>
        <Col>
          {letters.map(letter => <Button key={letter} md='auto' className={classname(style.letter, 'm-1 p-2')} href={`#${letter}`}><h2>{letter}</h2></Button>)}
        </Col>
      </Row>
      {letters.map(letter => (
        <div ID={letter} key={letter}>
          <hr className='style2 style-white' />
          <h2 className='text-center ost-title text-capitalize'>{letter.toUpperCase()}</h2>
          <Row className='pb-3 pl-2'>
            {platforms[letter].sort((a, b) => a.name > b.name).map(({ id, name }) =>
              <Col key={id} xs={3} className='d-flex flex-column'>
                <Link href={`/platform/${id}`}>
                  <a className='listItem mt-2 link'>{name}</a>
                </Link>
              </Col>
            )}
          </Row>
        </div>
      ))}
    </Col>
  )
}
