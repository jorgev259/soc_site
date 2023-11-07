'use client'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
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

export default function useUser (props) {
  const [queryLogin, loginResult] = useLazyQuery(loginQuery, { fetchPolicy })
  const [queryLogout, logoutResult] = useLazyQuery(logoutQuery, { fetchPolicy })
  const router = useRouter()

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

      // throw TypeError(message)
    } else {
      router.refresh()
    }
  }

  function logout () {
    return queryLogout()
      .then(res => {
        router.refresh()
      })
      .catch(error => console.error('An unexpected error happened:', error))
  }

  return {
    // user: userData,
    login: [login, loginResult],
    logout: [logout, logoutResult]
  }
}
