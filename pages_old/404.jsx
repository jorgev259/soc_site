import { Row, Col } from 'react-bootstrap'

export default function Custom404 () {
  return (
    <Row className='h-100' style={{ backgroundColor: 'rgba(17,17,17,.7)' }}>
      <Col className='h-100'>
        <Row className='pt-4'>
          <Col className='d-flex justify-content-center text-center'><span>Can you hear the bells ding dong..... because I can&#39;t</span></Col>
        </Row>
        <Row className='mt-4'>
          <Col className='d-flex justify-content-center'>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/vHyGBWFOU-0" title="Perfection Can't Please Me" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
