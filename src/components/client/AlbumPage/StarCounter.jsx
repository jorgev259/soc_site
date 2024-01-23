import { gql } from '@apollo/client'
import classNames from 'classnames'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import styles from './StarCounter.module.scss'

import Star from './Star'
import { getClient } from '@/next/lib/ApolloSSRClient'
import getSessionInfo from '@/next/lib/getSession'
import { getMessageObject } from '@/next/lib/transl'

const getScore = gql`
  query AlbumScore ($id: ID!) {
    album(id: $id){
      id
      selfScore
      avgRating {
        score
        users
      }
    }
  }
`

const keys = [...Array(5).keys()]

export default async function StarCounter (props) {
  const { albumId } = props

  const { isFAU } = await getSessionInfo()
  const { data } = await getClient().query({ query: getScore, variables: { id: albumId } })
  const t = await getTranslations('albumPage.rating')

  const { album = {} } = data ?? {}
  const { avgRating = {}, selfScore = 0 } = album ?? {}
  const { score = 0, users = 0 } = avgRating

  const solidScore = Math.max(selfScore, score)

  const starStyles = i => classNames(
    styles.star, 'pe-1',
    { [styles.gold]: isFAU && selfScore > i },
    solidScore > i ? 'fas' : 'far',
    solidScore > i && i + 0.5 === solidScore ? 'fa-star-half-alt' : 'fa-star'
  )

  return (
    <div className={classNames(styles.container, { [styles.active]: isFAU })}>
      <NextIntlClientProvider messages={getMessageObject(t, ['Rating saved!', 'Failed to save rating'])}>
        {keys.map(i => <Star className={starStyles(i)} key={i} position={i} albumId={albumId} isFAU={isFAU} />)}
      </NextIntlClientProvider>
      <span className='ms-1'>({score} by {users} users)</span> {/* Missing translation */}
    </div>
  )
}
