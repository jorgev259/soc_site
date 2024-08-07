import { YouTubeEmbed } from '@next/third-parties/google'

export default function NotFound() {
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
            <YouTubeEmbed width={560} height={315} videoid='vHyGBWFOU-0' />
          </div>
        </div>
      </div>
    </div>
  )
}
