import getSessionInfo from '@/next/lib/getSession'

export default async function Ad (props) {
  const { children } = props
  const { session } = await getSessionInfo()
  const { permissions = [] } = session

  return permissions.includes('SKIP_ADS') ? null : children
}
