import getSession from '@/next/lib/getSession'

export default async function Ad (props) {
  const { children } = props
  const { permissions = [] } = await getSession()

  return permissions.includes('SKIP_ADS') ? null : children
}
