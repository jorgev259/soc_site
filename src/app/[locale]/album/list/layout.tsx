import type { ReactNode } from 'react'

import Sidebar from '@/next/components/common/Sidebar'

export default function ALbumListLayout({ children }: { children: ReactNode }) {
  return (
    <div className='row px-0'>
      {children}
      <Sidebar />
    </div>
  )
}
