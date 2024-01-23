'use client'
import { useApolloClient, gql, useQuery } from '@apollo/client'
import { toast } from 'react-toastify'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'

import styles from './StarCounter.module.scss'

const mutationRating = gql`
  mutation ($id: ID!, $score: Int!){
    rateAlbum(albumId: $id, score: $score)
  }
`

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

export default function StarCounter (props) {
  const { albumId, isFAU } = props
  const { data, refetch } = useQuery(getScore, { variables: { id: albumId } })
  const [scoreHover, setHover] = useState(0)

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
      {keys.map(i => (
        <Star className={starStyles(i)} key={i} position={i} albumId={albumId} refetch={refetch} isFAU={isFAU} />)
      )}
      <span className='ms-1'>({score} by {users} users)</span> {/* Missing translation */}
    </div>
  )
}

function Star (props) {
  const { className, position, albumId, refetch, isFAU } = props

  const t = useTranslations('')
  const client = useApolloClient()

  function saveRating () {
    client.mutate({ mutation: mutationRating, variables: { id: albumId, score: position + 1 } })
      .then(() => {
        toast.success(t('Rating saved!'))
        refetch()
      })
      .catch(err => {
        console.log(err)
        toast.error(t('Failed to save rating'))
      })
  }

  return isFAU
    ? <span className={className} onClick={saveRating} />
    : <span className={className} />
}
