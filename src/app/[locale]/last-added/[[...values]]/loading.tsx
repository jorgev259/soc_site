import { AlbumFallback } from '@/next/components/common/AlbumBox'

export default function Loading() {
  return (
    <div className='row justify-content-center px-2 mx-0 px-md-5 mx-md-5'>
      <AlbumFallback className='col-6 col-md-3 px-0' count={52} />
    </div>
  )
}
