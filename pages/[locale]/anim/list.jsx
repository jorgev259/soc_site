import { Fragment } from 'react'
import { gql } from '@apollo/client'
import { Row, Col, Button } from 'react-bootstrap'

import { initializeApollo } from '@/components/ApolloClient'
import { AlbumBoxList } from '@/components/AlbumBoxes'
import classname from 'classnames'
import Sidebar from '@/components/Sidebar'
import style from '@/styles/letter.module.scss'

export async function getServerSideProps () {
  const client = initializeApollo()
  const { data } = await client.query({
    query: gql`
      query {
        animations {
            id
            title
            subTitle
            placeholder
        }
      }`
  })

  const animations = {}
  data.animations.forEach(animation => {
    const letter = animation.title[0].toUpperCase()
    if (!animations[letter]) animations[letter] = [animation]
    else animations[letter].push(animation)

    if (animation.subTitle) {
      const letter2 = animation.subTitle[0].toUpperCase()
      if (letter !== letter2) {
        if (!animations[letter2]) animations[letter2] = [animation]
        else animations[letter2].push(animation)
      }
    }
  })

  const letters = Object.keys(animations).sort()

  return { props: { letters, animations }/*, revalidate: 60 */ }
}

export default function Content ({ letters, animations }) {
  return (
    <Row className='blackbg h-100 px-0'>
      <Col className='p-3'>
        <Row>
          <Col>
            {letters.map(letter => <Button variant='secondary' key={letter} md='auto' className={classname(style.letter, 'p-2 m-1')} href={`#${letter}`}><h2>{letter}</h2></Button>)}
          </Col>
        </Row>
        {letters.map(letter => (
          <Fragment key={letter}>
            <Row className='mt-3'>
              <Col xs={12}>
                <div className='divider' />
                <h2 ID={letter} className='animationLetter py-2 m-0'>{letter.toUpperCase()}</h2>
                <div className='divider' />
              </Col>
            </Row>

            <Row className='links-list justify-content-center py-2'>
              <AlbumBoxList type='anim' height={150} width={100} colProps={{ md: 2, xs: 6 }} items={animations[letter].map(({ id, title, subTitle, placeholder }) => ({ id, title: title[0].toUpperCase() === letter ? title : subTitle, placeholder }))}/>
            </Row>
          </Fragment>
        ))}
      </Col>

      <Sidebar />
    </Row>
  )
}
