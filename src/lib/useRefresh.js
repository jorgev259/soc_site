import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client'

export default function useRefresh () {
  const router = useRouter()
  const client = useApolloClient()

  function refresh () {
    client.resetStore()
    router.refresh()
  }

  return refresh
}
