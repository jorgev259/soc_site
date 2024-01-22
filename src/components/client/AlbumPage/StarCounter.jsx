'use client'
import { useApolloClient, gql, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
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

export default function StarCounter (props) {
  const { albumId, isFAU } = props
  const { data, refetch } = useQuery(getScore, { variables: { id: albumId } })
  const [scoreHover, setHover] = useState(0)

  const { album = {} } = data ?? {}
  const { avgRating = {} } = album
  const { score = 0, users = 0 } = avgRating

  useEffect(() => {
    if (!isFAU) setHover(0)
  }, [isFAU])

  const starProps = { scoreHover, setHover, refetch, ...props, ...album }
  const stars = [...Array(5).keys()]
    .map(i => <Star key={i} position={i} {...starProps} />)

  return (
    <>
      {stars}
      <span className='ms-1'>({score} by {users} users)</span> {/* Missing translation */}
    </>
  )
}

function Star (props) {
  const { id, position, scoreHover = 0, selfScore = 0, setHover, refetch, avgRating = {}, isFAU } = props
  const { score = 0 } = avgRating

  const t = useTranslations('')
  const client = useApolloClient()

  const maxScore = Math.max(score, scoreHover, selfScore)
  const goldScore = scoreHover > 0 ? scoreHover : selfScore

  const isSolid = maxScore >= position + 1
  const isHalf = !isSolid && maxScore >= position + 0.5

  const fill = isSolid ? 'fas fa-star' : (isHalf ? 'fas fa-star-half-alt' : 'far fa-star')

  function saveRating () {
    client.mutate({ mutation: mutationRating, variables: { id, score: position + 1 } })
      .then(() => {
        toast.success(t['Rating saved!'])
        refetch()
      })
      .catch(err => {
        console.log(err)
        toast.error(t['Failed to save rating'])
      })
  }

  const className = classNames(styles.star, fill, 'pe-1', { [styles.gold]: goldScore > position, [styles.active]: isFAU })

  return isFAU
    ? (
      <span
        className={className}
        onMouseOver={() => setHover(position + 1)}
        onMouseOut={() => setHover(0)}
        onClick={saveRating}
      />
    )
    : (
      <span className={className} />
    )
}
