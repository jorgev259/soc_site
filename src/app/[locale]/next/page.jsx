// eslint-disable-next-line camelcase
import { unstable_setRequestLocale } from 'next-intl/server'

export default function Home (props) {
  const { params: { locale } } = props
  unstable_setRequestLocale(locale)

  return (
    'Nothing to see here yet'
  )
}
