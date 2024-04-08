import { gql, useMutation } from '@apollo/client'
import { useCallback } from 'react'

import useRefresh from './useRefresh'

const logoutMutation = gql`
    mutation Logout {
      logout
    }
  `

export default function useLogout () {
  const [logoutMutate, { loading }] = useMutation(logoutMutation)
  const refresh = useRefresh()

  const handleLogout = useCallback(ev => {
    ev.preventDefault()

    logoutMutate()
      .then(() => {
        refresh()
      })
      .catch(err => {
        console.log(err)
      })
  }, [logoutMutate, refresh])

  return { handleLogout, loading }
}
