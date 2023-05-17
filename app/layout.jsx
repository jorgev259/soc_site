import { ToastContainer } from 'react-toastify'

import { ApolloWrapper } from '@/components/ApolloClient'
import Header from '@/components/Header'

import '@/styles/layout.scss'

export default function Layout (props) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ToastContainer newestOnTop />
        <ApolloWrapper>
          <Header />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
