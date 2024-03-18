'use client'
import { gql, useApolloClient } from '@apollo/client'
import { useState } from 'react'
import clsx from 'clsx'
import { toast } from 'react-toastify'

import styles from './StarCounter.module.scss'

import { useQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import useRefresh from '@/next/lib/useRefresh'

const mutationRating = gql`
  mutation ($albumId: ID!, $score: Int!) {
    rateAlbum(albumId: $albumId, score: $score)
  }
`
const getSelfScore = gql`
  query SelfScore($albumId: ID!) {
    album(id: $albumId) {
      selfScore
      avgRating {
        score
        users
      }
    }
  }
`

export default function StarCounter(props) {
  const { albumId, score, users, t } = props

  const [scoreHover, setHover] = useState(0)
  const { data } = useQuery(getSelfScore, { variables: { albumId } })
  const selfScore = data?.album?.selfScore || 0

  const starProps = { albumId, score, scoreHover, selfScore, setHover, t }
  const stars = [...Array(5).keys()].map((i) => (
    <Star key={i} position={i} {...starProps} />
  ))

  return (
    <>
      {stars}
      <span className='ms-1'>
        ({score} by {users} users)
      </span>{' '}
      {/* Missing translation */}
    </>
  )
}

function Star(props) {
  const { albumId, position, score, scoreHover, selfScore, setHover, t } = props

  const client = useApolloClient()
  const refresh = useRefresh()

  const maxScore = Math.max(score, scoreHover, selfScore)
  const goldScore = scoreHover > 0 ? scoreHover : selfScore

  const isSolid = maxScore >= position + 1
  const isHalf = !isSolid && maxScore >= position + 0.5

  const fill = isSolid
    ? 'fas fa-star'
    : isHalf
      ? 'fas fa-star-half-alt'
      : 'far fa-star'

  function saveRating() {
    client
      .mutate({
        mutation: mutationRating,
        variables: { albumId, score: position + 1 }
      })
      .then(() => {
        toast.success(t['Rating saved!'])
        refresh()
      })
      .catch((err) => {
        console.log(err)
        toast.error(t['Failed to save rating'])
      })
  }

  const className = clsx(styles.star, fill, 'pe-1', {
    [styles.gold]: goldScore > position
  })

  return (
    <span
      className={className}
      onMouseOver={() => setHover(position + 1)}
      onMouseOut={() => setHover(0)}
      onClick={saveRating}
    />
  )
}
