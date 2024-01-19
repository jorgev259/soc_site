'use client'
import { Row, Col } from 'react-bootstrap'

export default function Custom500 () {
  /*
     ReactGA.exception({
    description: 'An error ocurred',
    fatal: true
  })
    */
  return (
    <Row className='h-100' style={{ backgroundColor: 'rgba(17,17,17,.7)' }}>
      <Col className='h-100'>
        <Row className='pt-5'>
          <Col className='d-flex justify-content-center text-center'><span>Something went wrong, but there&#39;s only going up from here!</span></Col>
        </Row>
        <Row className='mt-4'>
          <Col className='d-flex justify-content-center'>
            <iframe width='560' height='315' title='AJR- Bummerland' src='https://www.youtube-nocookie.com/embed/k4V3Mo61fJM' frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
