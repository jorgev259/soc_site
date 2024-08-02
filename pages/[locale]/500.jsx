export default function Custom500() {
  /*
     ReactGA.exception({
    description: 'An error ocurred',
    fatal: true
  })
  */
  return (
    <div className='row h-100' style={{ backgroundColor: 'rgba(17,17,17,.7)' }}>
      <div className='col h-100'>
        <div className='row pt-5'>
          <div className='col d-flex justify-content-center text-center'>
            <span>
              Something went wrong, but there&#39;s only going up from here!
            </span>
          </div>
        </div>
        <div className='row mt-4'>
          <div className='col d-flex justify-content-center'>
            <iframe
              width='560'
              height='315'
              title='AJR- Bummerland'
              src='https://www.youtube-nocookie.com/embed/k4V3Mo61fJM'
              frameBorder='0'
              allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  )
}
