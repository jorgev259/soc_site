export default function Custom404() {
  return (
    <div className='row h-100' style={{ backgroundColor: 'rgba(17,17,17,.7)' }}>
      <div className='col h-100'>
        <div className='row pt-4'>
          <div className='col d-flex justify-content-center text-center'>
            <span>
              Can you hear the bells ding dong..... because I can&#39;t
            </span>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col d-flex justify-content-center'>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/vHyGBWFOU-0'
              title="Perfection Can't Please Me"
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
