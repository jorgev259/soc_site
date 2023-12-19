import { useApolloClient } from '@apollo/client'
import { useRouter } from '@/next/lib/navigation'

export default function useRefresh () {
  const router = useRouter()
  const client = useApolloClient()

  function refresh () {
    client.resetStore()
    router.refresh()
  }

  return refresh
}
