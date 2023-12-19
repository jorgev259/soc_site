import { gql } from '@apollo/client'
import { Row, Col, Button } from 'react-bootstrap'
import classname from 'classnames'
import { Link } from '@/next/lib/navigation'

import { initializeApollo } from '@/components/ApolloClient'
import style from '@/styles/letter.module.scss'

export async function getServerSideProps () {
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
      query {
        publishers {
          id
          name
        }
      }`

  })

  const publishers = {}
  data.publishers.forEach(publisher => {
    if (!publisher.name) return
    const letter = publisher.name[0].toUpperCase()
    if (!publishers[letter]) publishers[letter] = [publisher]
    else publishers[letter].push(publisher)
  })

  const letters = Object.keys(publishers).sort()

  return { props: { letters, publishers }/*, revalidate: 60 */ }
}

export default function PublisherList ({ letters, publishers }) {
  return (
    <Row className='blackbg h-100 px-0'>
      <Col className='p-2'>
        <Row className='mt-2'>
          <Col>
            {letters.map(letter => <Button key={letter} md='auto' className={classname(style.letter, 'm-1 p-2')} href={`#${letter}`}><h2>{letter}</h2></Button>)}
          </Col>
        </Row>
        {letters.map(letter => (
          <div ID={letter} key={letter}>
            <hr className='style2 style-white' />
            <h2 className='text-center album-title text-capitalize'>{letter.toUpperCase()}</h2>
            <Row className='pb-3 pl-2'>
              {publishers[letter].map(({ id, name }) =>
                <Col key={id} xs={3} className='d-flex flex-column'>
                  <Link href={`/publisher/${id}`} className='listItem mt-2 link'>
                    {name}
                  </Link>
                </Col>
              )}
            </Row>
          </div>
        ))}
      </Col>
    </Row>
  )
}
