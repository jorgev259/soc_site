import { gql } from '@apollo/client'
import { Row, Col, Button } from 'react-bootstrap'
import classname from 'classnames'
import Image from 'next/image'
import { Link } from '@/next/lib/navigation'

import { initializeApollo } from '@/components/ApolloClient'
import { getImageUrl } from '@/components/utils'
import style from '@/styles/letter.module.scss'

export async function getServerSideProps () {
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
  data.series.forEach(serie => {
    const letter = serie.name[0].toUpperCase()
    if (!series[letter]) series[letter] = [serie]
    else series[letter].push(serie)
  })

  const letters = Object.keys(series).sort()

  return { props: { letters, series, seriesList: data.series }/*, revalidate: 60 */ }
}

export default function SeriesList ({ series, letters, seriesList }) {
  return (
    <Row className='blackbg h-100 px-0'>
      <Col className='p-2'>
        <Row className='my-2'>
          <Col>
            {letters.map(letter => <Button key={letter} variant='secondary' md='auto' className={classname(style.letter, 'p-2 m-1')} href={`#${letter}`}><h2>{letter}</h2></Button>)}
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col xs='auto' className='px-4'>
            {letters.map(letter => (
              <div id={letter} key={letter} className='mt-4 d-flex flex-column'>
                <h2 className='text-center album-title text-capitalize'>{letter.toUpperCase()}</h2>
                {series[letter].map(({ slug, name }) => <Link href={`/series/${slug}`} key={slug} className='text-center mt-2 link'>{name}</Link>)}
              </div>
            ))}
          </Col>
          <Col className='px-4'>
            <Row>
              {seriesList.map(({ slug, placeholder }) => (
                <Col key={slug} className='position-relative' xs={4} style={{ height: '150px' }}>
                  <Link href={`/series/${slug}`} className="d-block w-100 h-100">
                    <Image className="w-100 h-100" alt={slug} src={getImageUrl(slug, 'series')} style={{ objectFit: 'contain', objectPosition: 'center' }} width={300} height={100} placeholder='blur' blurDataURL={placeholder} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
