import { useApollo } from '@/components/ApolloClient'
import Header from '@/components/Header'

import '@/styles/layout.scss'
import { ApolloProvider } from '@apollo/client'
import { ToastContainer } from 'react-toastify'

export default function Layout (props) {
  const { children } = props

  const client = useApollo

  return (
    <html lang="en">
      <body>
        <ToastContainer newestOnTop />
        <ApolloProvider clien={client}>
          <Header />
          {children}
        </ApolloProvider>
      </body>
    </html>
  )
}
