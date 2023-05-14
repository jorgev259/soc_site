import Header from '@/components/Header'

import '@/styles/layout.scss'

export default function Layout (props) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
