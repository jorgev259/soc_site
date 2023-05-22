'use client'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { createContext, useEffect, useState } from 'react'

export const UserContext = createContext(null)

const loginQuery = gql`
  query Login($username: String!, $password: String!){
    login(username: $username, password: $password)
  }
`

const logoutQuery = gql`
  query {
    logout
  }
`

const userQuery = gql`
  query {
    me {
      username
      roles {
        name
      }
      email
      permissions
      pages {
        url
      }
    }
  }
`

/*
  null -> non initialized
  'NAU' -> Not authenticated
  'FAU' -> Fully authenticated
  'PAU' -> Partially authenticated
*/

const fetchPolicy = 'network-only'

export default function UserContextProvider (props) {
  const { children } = props

  const { data: userData, refetch: fetchUser } = useQuery(userQuery, { fetchPolicy })
  const [queryLogin, loginResult] = useLazyQuery(loginQuery, { fetchPolicy })
  const [queryLogout, logoutResult] = useLazyQuery(logoutQuery, { fetchPolicy })

  const [status, setStatus] = useState(null)

  const user = userData?.me
  const isFAU = status === 'FAU'
  const isPAU = status === 'PAU'
  const isNAU = status === null || status === 'NAU'

  useEffect(() => {
    if (user === undefined) return

    if (!user) setStatus('NAU')
    else setStatus(status === null ? 'PAU' : 'FAU')
  }, [user])

  async function login (variables) {
    const res = await queryLogin({ variables })
      .catch(error => console.error('An unexpected error happened:', error))

    const { error } = res
    if (error) {
      const { graphQLErrors } = error
      let message = 'Unknown error'

      if (graphQLErrors && graphQLErrors.length > 0) {
        const { code } = graphQLErrors[0].extensions
        if (code === 'BAD_USER_INPUT') message = 'Invalid_Login'
      }

      throw TypeError(message)
    } else {
      fetchUser()
    }
  }

  function logout () {
    return queryLogout()
      .then(res => {
        fetchUser()
      })
      .catch(error => console.error('An unexpected error happened:', error))
  }

  const value = {
    user,
    status,
    isNAU,
    isFAU,
    isPAU,
    isAU: isFAU || isPAU,
    login: [login, loginResult],
    logout: [logout, logoutResult],
    fetchUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
