import { ToastContainer } from 'react-toastify'

import { ApolloWrapper } from '@/components/ApolloClient'
import Header from '@/components/Header'

import '@/styles/layout.scss'
import UserContextProvider from '@/components/useUser'

function Layout (props) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ToastContainer newestOnTop />
        <ApolloWrapper>
          <UserContextProvider>
            <Header />
            {children}
          </UserContextProvider>
        </ApolloWrapper>
      </body>
    </html>
  )
}

export default Layout
